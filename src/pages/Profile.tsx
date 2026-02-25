import React, { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Camera, Loader2
} from 'lucide-react';

import { toast } from 'sonner';
import { trackProfileUpdate, logUserActivity } from '@/services/activityTracker';

const Profile: React.FC = () => {
    const { user, userProfile, updateUserProfile, changePassword } = useAuth();
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passLoading, setPassLoading] = useState(false);

    // Password Change State
    const [showPassModal, setShowPassModal] = useState(false);
    const [passwords, setPasswords] = useState({ new: '', confirm: '' });

    // Form State
    const [formData, setFormData] = useState({
        displayName: '',
        phoneNumber: '',
        location: '',
        bio: '',
        photoURL: '',
        gender: 'male',
        birthDate: ''
    });

    useEffect(() => {
        if (userProfile) {
            setFormData({
                displayName: userProfile.displayName || user?.displayName || '',
                phoneNumber: userProfile.phoneNumber || '',
                location: userProfile.location || '',
                bio: userProfile.bio || '',
                photoURL: userProfile.photoURL || user?.photoURL || '',
                gender: (userProfile.gender || 'male').toLowerCase(),
                birthDate: userProfile.birthDate || ''
            });
        }
    }, [userProfile, user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!user) return;

            // Update in Firestore via Context
            await updateUserProfile({
                displayName: formData.displayName,
                phoneNumber: formData.phoneNumber,
                location: formData.location,
                bio: formData.bio,
                photoURL: formData.photoURL,
                gender: formData.gender as any,
                birthDate: formData.birthDate
            });

            toast.success(isRTL ? 'تم حفظ التغييرات بنجاح' : 'Changes saved successfully');
            setIsEditing(false);

            // Track profile update
            const changed = Object.keys(formData).filter(k => (formData as any)[k] !== ((userProfile as any)?.[k] || ''));
            trackProfileUpdate(changed);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(isRTL ? 'حدث خطأ أثناء الحفظ' : 'Error saving changes');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            toast.error(isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
            return;
        }
        if (passwords.new.length < 6) {
            toast.error(isRTL ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
            return;
        }

        setPassLoading(true);
        try {
            await changePassword(passwords.new);
            toast.success(isRTL ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully');
            logUserActivity({ action: 'password_change', category: 'profile', details: 'تم تغيير كلمة المرور' });
            setShowPassModal(false);
            setPasswords({ new: '', confirm: '' });
        } catch (error: any) {
            if (error.code === 'auth/requires-recent-login') {
                toast.error(isRTL ? 'يجب تسجيل الدخول مرة أخرى لتغيير كلمة المرور' : 'Please log in again to change password');
            } else {
                toast.error(isRTL ? 'فشل تغيير كلمة المرور' : 'Failed to change password');
            }
        } finally {
            setPassLoading(false);
        }
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.displayName || 'User')}&background=random`;
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12 pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden transition-colors duration-200"
                >
                    {/* Header Cover */}
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-cyan-500 relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    {/* Profile Content */}
                    <div className="relative px-8 pb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 mb-8 gap-6">
                            {/* Avatar */}
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-white dark:bg-gray-800">
                                    <img
                                        src={formData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.displayName || 'User')}&background=random`}
                                        alt="Profile"
                                        onError={handleImageError}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const url = prompt(isRTL ? 'أدخل رابط الصورة الجديد:' : 'Enter new image URL:');
                                            if (url) setFormData({ ...formData, photoURL: url });
                                        }}
                                        className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Camera className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Header Info */}
                            <div className="flex-1 text-center md:text-start pb-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                    {formData.displayName || (isRTL ? 'مستخدم جديد' : 'New User')}
                                </h1>
                                <div className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300 gap-2 mb-4">
                                    <Mail className="w-4 h-4" />
                                    <span>{user.email}</span>
                                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full mx-2">
                                        {userProfile?.role?.toUpperCase() || 'USER'}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mb-4 flex gap-2">
                                {!isEditing ? (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            {isRTL ? 'تعديل الملف' : 'Edit Profile'}
                                        </button>
                                        <button
                                            onClick={() => setShowPassModal(true)}
                                            className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 font-medium"
                                        >
                                            {isRTL ? 'تغيير كلمة المرور' : 'Change Password'}
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800"
                                        >
                                            <X className="w-4 h-4" />
                                            {isRTL ? 'إلغاء' : 'Cancel'}
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Save className="w-4 h-4" />
                                            )}
                                            {isRTL ? 'حفظ' : 'Save'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isEditing ? 'opacity-100' : 'opacity-90'}`}>

                            {/* Personal Info Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-2 flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    {isRTL ? 'المعلومات الشخصية' : 'Personal Information'}
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {isRTL ? 'الاسم الكامل' : 'Full Name'}
                                        </label>
                                        <input
                                            name="displayName"
                                            value={formData.displayName}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                            <input
                                                value={user.email || ''}
                                                disabled
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 cursor-not-allowed text-left dir-ltr"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                            <input
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                dir="ltr"
                                                placeholder="+20 123 456 7890"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all text-right"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                {isRTL ? 'الجنس' : 'Gender'}
                                            </label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all"
                                            >
                                                <option value="male">{isRTL ? 'ذكر' : 'Male'}</option>
                                                <option value="female">{isRTL ? 'أنثى' : 'Female'}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                {isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}
                                            </label>
                                            <input
                                                type="date"
                                                name="birthDate"
                                                value={formData.birthDate}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-2 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    {isRTL ? 'تفاصيل إضافية' : 'Additional Details'}
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {isRTL ? 'الموقع / العنوان' : 'Location'}
                                        </label>
                                        <input
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder={isRTL ? 'أدخل مدينتك أو عنوانك' : 'Enter your city or address'}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {isRTL ? 'نبذة عني' : 'Bio'}
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            rows={4}
                                            placeholder={isRTL ? 'اكتب نبذة مختصرة عن نفسك...' : 'Write a short bio about yourself...'}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all resize-none"
                                        />
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                        <div className="text-sm text-blue-800 dark:text-blue-200">
                                            <span className="font-semibold block">{isRTL ? 'تاريخ الانضمام' : 'Joined Date'}</span>
                                            {userProfile?.createdAt?.toDate ? userProfile.createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Change Password Modal */}
            {showPassModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 text-center"
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{isRTL ? 'تغيير كلمة المرور' : 'Change Password'}</h3>

                        <div className="space-y-4 mb-6">
                            <input
                                type="password"
                                placeholder={isRTL ? 'كلمة المرور الجديدة' : 'New Password'}
                                value={passwords.new}
                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <input
                                type="password"
                                placeholder={isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setShowPassModal(false)}
                                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                {isRTL ? 'إلغاء' : 'Cancel'}
                            </button>
                            <button
                                onClick={handlePasswordChange}
                                disabled={passLoading}
                                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                            >
                                {passLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isRTL ? 'تغيير' : 'Change'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Profile;

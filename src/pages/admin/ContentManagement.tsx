import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Eye,
  Shield,
  Image,
  Video,
  BookOpen,
  Settings,
  Upload
} from 'lucide-react';
import { motion } from 'framer-motion';
import MediaPreview from '@/components/admin/MediaPreview';

interface Article {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  content: {
    ar: string;
    en: string;
  };
  category: {
    ar: string;
    en: string;
  };
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: any;
  updatedAt: any;
  views: number;
  featuredImage?: string;
  gallery?: string[];
  videoUrl?: string;
  tags: {
    ar: string[];
    en: string[];
  };
}

const ContentManagement: React.FC = () => {
  const { i18n } = useTranslation();
  const { userProfile } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('articles');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: {
      ar: '',
      en: ''
    },
    content: {
      ar: '',
      en: ''
    },
    category: {
      ar: '',
      en: ''
    },
    status: 'draft' as 'draft' | 'published' | 'archived',
    featuredImage: '',
    gallery: [] as string[],
    videoUrl: '',
    tags: {
      ar: [] as string[],
      en: [] as string[]
    }
  });
  const [activeLanguage, setActiveLanguage] = useState<'ar' | 'en'>('ar');
  const [uploadingMedia, setUploadingMedia] = useState(false);
  
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (userProfile?.role === 'admin') {
      fetchArticles();
    }
  }, [userProfile]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const articlesQuery = query(
        collection(db, 'articles'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(articlesQuery);
      const fetchedArticles: Article[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedArticles.push({
          id: doc.id,
          ...data
        } as Article);
      });
      
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveArticle = async () => {
    if (!formData.title.ar.trim() || !formData.title.en.trim() || 
        !formData.content.ar.trim() || !formData.content.en.trim()) {
      alert(isRTL ? 'يرجى ملء جميع الحقول المطلوبة بالعربية والإنجليزية' : 'Please fill all required fields in both Arabic and English');
      return;
    }

    try {
      const articleData = {
        ...formData,
        author: userProfile?.displayName || 'مدير النظام',
        updatedAt: serverTimestamp()
      };

      if (editingArticle) {
        // Update existing article
        const articleRef = doc(db, 'articles', editingArticle.id);
        await updateDoc(articleRef, articleData);
        
        setArticles(prev => prev.map(article => 
          article.id === editingArticle.id 
            ? { ...article, ...articleData }
            : article
        ));
        
        alert(isRTL ? 'تم تحديث المقال بنجاح' : 'Article updated successfully');
      } else {
        // Create new article
        const docRef = await addDoc(collection(db, 'articles'), {
          ...articleData,
          createdAt: serverTimestamp(),
          views: 0
        });
        
        setArticles(prev => [{
          id: docRef.id,
          ...articleData,
          createdAt: new Date(),
          views: 0
        } as Article, ...prev]);
        
        alert(isRTL ? 'تم إنشاء المقال بنجاح' : 'Article created successfully');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving article:', error);
      alert(isRTL ? 'حدث خطأ أثناء الحفظ' : 'Error occurred while saving');
    }
  };

  const deleteArticle = async (articleId: string) => {
    if (!confirm(isRTL ? 'هل أنت متأكد من حذف هذا المقال؟' : 'Are you sure you want to delete this article?')) {
      return;
    }

    try {
      const articleRef = doc(db, 'articles', articleId);
      await deleteDoc(articleRef);
      
      setArticles(prev => prev.filter(article => article.id !== articleId));
      alert(isRTL ? 'تم حذف المقال' : 'Article deleted');
    } catch (error) {
      console.error('Error deleting article:', error);
      alert(isRTL ? 'حدث خطأ أثناء الحذف' : 'Error occurred while deleting');
    }
  };

  const editArticle = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      status: article.status,
      featuredImage: article.featuredImage || '',
      gallery: article.gallery || [],
      videoUrl: article.videoUrl || '',
      tags: article.tags || { ar: [], en: [] }
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingArticle(null);
    setFormData({
      title: {
        ar: '',
        en: ''
      },
      content: {
        ar: '',
        en: ''
      },
      category: {
        ar: '',
        en: ''
      },
      status: 'draft',
      featuredImage: '',
      gallery: [],
      videoUrl: '',
      tags: {
        ar: [],
        en: []
      }
    });
    setShowForm(false);
  };

  const handleImageUpload = async (file: File, type: 'featured' | 'gallery') => {
    setUploadingMedia(true);
    try {
      // Mock upload - في التطبيق الحقيقي، ستستخدم Firebase Storage أو خدمة أخرى
      const mockUrl = URL.createObjectURL(file);
      
      if (type === 'featured') {
        setFormData(prev => ({ ...prev, featuredImage: mockUrl }));
      } else {
        setFormData(prev => ({ 
          ...prev, 
          gallery: [...prev.gallery, mockUrl] 
        }));
      }
      
      alert(isRTL ? 'تم رفع الصورة بنجاح' : 'Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(isRTL ? 'حدث خطأ أثناء رفع الصورة' : 'Error uploading image');
    } finally {
      setUploadingMedia(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const addTag = (lang: 'ar' | 'en', tag: string) => {
    if (tag.trim() && !formData.tags[lang].includes(tag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: {
          ...prev.tags,
          [lang]: [...prev.tags[lang], tag.trim()]
        }
      }));
    }
  };

  const removeTag = (lang: 'ar' | 'en', index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: {
        ...prev.tags,
        [lang]: prev.tags[lang].filter((_, i) => i !== index)
      }
    }));
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      draft: { label: isRTL ? 'مسودة' : 'Draft', variant: 'secondary' as const },
      published: { label: isRTL ? 'منشور' : 'Published', variant: 'default' as const },
      archived: { label: isRTL ? 'مؤرشف' : 'Archived', variant: 'outline' as const }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  if (userProfile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2">
              {isRTL ? 'غير مصرح' : 'Unauthorized'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? 'هذه الصفحة مخصصة لمديري النظام فقط' : 'This page is for administrators only'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen gradient-bg ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold gradient-text">
                {isRTL ? 'إدارة المحتوى' : 'Content Management'}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {isRTL ? 'إدارة وتحرير محتوى الموقع والمقالات' : 'Manage and edit website content and articles'}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="card-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      {isRTL ? 'إجمالي المقالات' : 'Total Articles'}
                    </p>
                    <p className="text-2xl font-bold text-white">{articles.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-secondary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      {isRTL ? 'منشور' : 'Published'}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {articles.filter(a => a.status === 'published').length}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-accent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      {isRTL ? 'مسودات' : 'Drafts'}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {articles.filter(a => a.status === 'draft').length}
                    </p>
                  </div>
                  <Edit className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-info">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      {isRTL ? 'إجمالي المشاهدات' : 'Total Views'}
                    </p>
                    <p className="text-2xl font-bold">
                      {articles.reduce((sum, article) => sum + (article.views || 0), 0)}
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="articles">
                {isRTL ? 'المقالات' : 'Articles'} ({articles.length})
              </TabsTrigger>
              <TabsTrigger value="media">
                {isRTL ? 'الوسائط' : 'Media'}
              </TabsTrigger>
              <TabsTrigger value="settings">
                {isRTL ? 'الإعدادات' : 'Settings'}
              </TabsTrigger>
            </TabsList>

            {/* Articles Tab */}
            <TabsContent value="articles" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{isRTL ? 'إدارة المقالات' : 'Article Management'}</h2>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  {isRTL ? 'مقال جديد' : 'New Article'}
                </Button>
              </div>

              {/* Article Form */}
              {showForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {editingArticle 
                        ? (isRTL ? 'تحرير المقال' : 'Edit Article')
                        : (isRTL ? 'مقال جديد' : 'New Article')
                      }
                    </CardTitle>
                    <CardDescription>
                      {isRTL ? 'يرجى ملء المعلومات بالعربية والإنجليزية' : 'Please fill information in both Arabic and English'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Language Tabs */}
                    <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setActiveLanguage('ar')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          activeLanguage === 'ar'
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        العربية
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveLanguage('en')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          activeLanguage === 'en'
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        English
                      </button>
                    </div>

                    {/* Title */}
                    <div>
                      <Label htmlFor="title">
                        {activeLanguage === 'ar' ? 'العنوان (عربي)' : 'Title (English)'}
                      </Label>
                      <Input
                        id="title"
                        value={formData.title[activeLanguage]}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          title: { ...prev.title, [activeLanguage]: e.target.value }
                        }))}
                        placeholder={activeLanguage === 'ar' ? 'عنوان المقال بالعربية' : 'Article title in English'}
                        dir={activeLanguage === 'ar' ? 'rtl' : 'ltr'}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <Label htmlFor="category">
                        {activeLanguage === 'ar' ? 'التصنيف (عربي)' : 'Category (English)'}
                      </Label>
                      <Input
                        id="category"
                        value={formData.category[activeLanguage]}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          category: { ...prev.category, [activeLanguage]: e.target.value }
                        }))}
                        placeholder={activeLanguage === 'ar' ? 'تصنيف المقال بالعربية' : 'Article category in English'}
                        dir={activeLanguage === 'ar' ? 'rtl' : 'ltr'}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <Label htmlFor="content">
                        {activeLanguage === 'ar' ? 'المحتوى (عربي)' : 'Content (English)'}
                      </Label>
                      <Textarea
                        id="content"
                        value={formData.content[activeLanguage]}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          content: { ...prev.content, [activeLanguage]: e.target.value }
                        }))}
                        placeholder={activeLanguage === 'ar' ? 'محتوى المقال بالعربية' : 'Article content in English'}
                        rows={10}
                        className="resize-none"
                        dir={activeLanguage === 'ar' ? 'rtl' : 'ltr'}
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <Label>
                        {activeLanguage === 'ar' ? 'الكلمات المفتاحية (عربي)' : 'Tags (English)'}
                      </Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.tags[activeLanguage].map((tag, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(activeLanguage, index)}
                              className="ml-1 hover:text-destructive"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <Input
                        placeholder={activeLanguage === 'ar' ? 'اضغط Enter لإضافة كلمة مفتاحية' : 'Press Enter to add tag'}
                        dir={activeLanguage === 'ar' ? 'rtl' : 'ltr'}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(activeLanguage, e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>

                    {/* Media Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{isRTL ? 'الوسائط' : 'Media'}</h3>
                      
                      {/* Media Preview */}
                      <MediaPreview
                        featuredImage={formData.featuredImage}
                        gallery={formData.gallery}
                        videoUrl={formData.videoUrl}
                        onRemoveFeaturedImage={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                        onRemoveGalleryImage={removeGalleryImage}
                        onRemoveVideo={() => setFormData(prev => ({ ...prev, videoUrl: '' }))}
                        isRTL={isRTL}
                      />
                      
                      {/* Featured Image */}
                      <div>
                        <Label>{isRTL ? 'الصورة الرئيسية' : 'Featured Image'}</Label>
                        <div className="mt-2">
                          {!formData.featuredImage && (
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                              <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                              <p className="text-muted-foreground mb-4">
                                {isRTL ? 'اختر صورة رئيسية للمقال' : 'Choose a featured image for the article'}
                              </p>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageUpload(file, 'featured');
                                }}
                                className="hidden"
                                id="featured-image"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById('featured-image')?.click()}
                                disabled={uploadingMedia}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                {uploadingMedia ? (isRTL ? 'جاري الرفع...' : 'Uploading...') : (isRTL ? 'رفع صورة' : 'Upload Image')}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Gallery */}
                      <div>
                        <Label>{isRTL ? 'معرض الصور' : 'Image Gallery'}</Label>
                        <div className="mt-2">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              files.forEach(file => handleImageUpload(file, 'gallery'));
                            }}
                            className="hidden"
                            id="gallery-images"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('gallery-images')?.click()}
                            disabled={uploadingMedia}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            {isRTL ? 'إضافة صور' : 'Add Images'}
                          </Button>
                        </div>
                      </div>

                      {/* Video URL */}
                      <div>
                        <Label htmlFor="videoUrl">{isRTL ? 'رابط الفيديو (اختياري)' : 'Video URL (Optional)'}</Label>
                        <Input
                          id="videoUrl"
                          value={formData.videoUrl}
                          onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                          placeholder="https://youtube.com/watch?v=..."
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <Label htmlFor="status">{isRTL ? 'الحالة' : 'Status'}</Label>
                      <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="draft">{isRTL ? 'مسودة' : 'Draft'}</option>
                        <option value="published">{isRTL ? 'منشور' : 'Published'}</option>
                        <option value="archived">{isRTL ? 'مؤرشف' : 'Archived'}</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={saveArticle} disabled={uploadingMedia}>
                        <Save className="h-4 w-4 mr-2" />
                        {isRTL ? 'حفظ' : 'Save'}
                      </Button>
                      <Button variant="outline" onClick={resetForm}>
                        {isRTL ? 'إلغاء' : 'Cancel'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Articles List */}
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      {isRTL ? 'جاري تحميل المقالات...' : 'Loading articles...'}
                    </p>
                  </div>
                ) : articles.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {isRTL ? 'لا توجد مقالات' : 'No Articles'}
                      </h3>
                      <p className="text-muted-foreground">
                        {isRTL ? 'ابدأ بإنشاء مقال جديد' : 'Start by creating a new article'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  articles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="card-medical shadow-medical-lg">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="font-semibold">
                                  {isRTL ? article.title.ar : article.title.en}
                                </span>
                                {getStatusBadge(article.status)}
                              </div>
                              <CardDescription>
                                {isRTL ? 'التصنيف:' : 'Category:'} {isRTL ? article.category.ar : article.category.en} • 
                                {isRTL ? 'المشاهدات:' : 'Views:'} {article.views || 0} • 
                                {isRTL ? 'الكاتب:' : 'Author:'} {article.author}
                              </CardDescription>
                              {/* Tags */}
                              {article.tags && article.tags[isRTL ? 'ar' : 'en'].length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {article.tags[isRTL ? 'ar' : 'en'].slice(0, 3).map((tag, tagIndex) => (
                                    <Badge key={tagIndex} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {article.tags[isRTL ? 'ar' : 'en'].length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{article.tags[isRTL ? 'ar' : 'en'].length - 3}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                            {/* Featured Image Preview */}
                            {article.featuredImage && (
                              <div className="ml-4">
                                <img 
                                  src={article.featuredImage} 
                                  alt="Featured" 
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {(isRTL ? article.content.ar : article.content.en).substring(0, 200)}...
                          </p>
                          
                          {/* Media indicators */}
                          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                            {article.featuredImage && (
                              <div className="flex items-center gap-1">
                                <Image className="h-3 w-3" />
                                <span>{isRTL ? 'صورة رئيسية' : 'Featured Image'}</span>
                              </div>
                            )}
                            {article.gallery && article.gallery.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Image className="h-3 w-3" />
                                <span>{article.gallery.length} {isRTL ? 'صور' : 'images'}</span>
                              </div>
                            )}
                            {article.videoUrl && (
                              <div className="flex items-center gap-1">
                                <Video className="h-3 w-3" />
                                <span>{isRTL ? 'فيديو' : 'Video'}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => editArticle(article)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              {isRTL ? 'تحرير' : 'Edit'}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteArticle(article.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              {isRTL ? 'حذف' : 'Delete'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardContent className="p-12 text-center">
                  <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {isRTL ? 'إدارة الوسائط' : 'Media Management'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL ? 'قريباً - إدارة الصور والفيديوهات' : 'Coming Soon - Image and video management'}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardContent className="p-12 text-center">
                  <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {isRTL ? 'إعدادات المحتوى' : 'Content Settings'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL ? 'قريباً - إعدادات إدارة المحتوى' : 'Coming Soon - Content management settings'}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentManagement;
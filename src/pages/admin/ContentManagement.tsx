import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { collection, query, orderBy, getDocs, doc, setDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { articles as staticArticles } from '@/data/articles'; // Import static data
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// Define the full Article Schema matching static data + admin needs
interface Article {
  id: string;
  title: { ar: string; en: string };
  excerpt: { ar: string; en: string };
  content: { ar: string; en: string };
  category: 'undernutrition' | 'overnutrition' | 'foodSafety';
  ageGroup: 'children' | 'adults' | 'all';
  keyTakeaways: { ar: string[]; en: string[] };
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: any;
  updatedAt: any;
  views: number;
  featuredImage?: string;
  videoUrl?: string;
  tags?: { ar: string[]; en: string[] }; // Optional, keeping for future
}

// --- QUILL MODULES ---
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean'],
    [{ 'direction': 'rtl' }]
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link', 'image',
  'direction'
];


const ContentManagement: React.FC = () => {
  const { i18n } = useTranslation();
  const { userProfile } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<'ar' | 'en'>('ar');
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    title: { ar: '', en: '' },
    excerpt: { ar: '', en: '' },
    content: { ar: '', en: '' },
    category: 'undernutrition' as Article['category'],
    ageGroup: 'all' as Article['ageGroup'],
    keyTakeaways: { ar: [] as string[], en: [] as string[] },
    status: 'draft' as 'draft' | 'published' | 'archived',
    featuredImage: '',
    videoUrl: '',
  });

  useEffect(() => {
    if (userProfile?.role === 'admin') {
      fetchArticles();
    }
  }, [userProfile]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const articlesQuery = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(articlesQuery);
      const fetchedArticles: Article[] = [];
      querySnapshot.forEach((doc) => {
        fetchedArticles.push({ id: doc.id, ...doc.data() } as Article);
      });
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- MIGRATION LOGIC ---
  const importStaticArticles = async () => {
    if (!confirm('This will import all static articles from articles.ts to Firestore. Continue?')) return;
    try {
      setLoading(true);
      for (const staticArticle of staticArticles) {
        const articleRef = doc(db, 'articles', staticArticle.id);
        const articleData = {
          ...staticArticle,
          status: 'published',
          author: 'System Admin',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          views: 0,
          // Ensure structure matches
          featuredImage: staticArticle.imageUrl,
          tags: { en: [], ar: [] }
          // category, ageGroup, keyTakeaways map directly
        };
        // Use setDoc to overwrite/create with specific ID
        await setDoc(articleRef, articleData, { merge: true });
      }
      await fetchArticles();
      alert('Articles migrated successfully!');
    } catch (error) {
      console.error('Migration failed:', error);
      alert('Migration failed. Check console.');
    } finally {
      setLoading(false);
    }
  };

  const saveArticle = async () => {
    // Basic validation
    if (!formData.title.ar || !formData.title.en) {
      alert(isRTL ? 'العنوان مطلوب' : 'Title is required');
      return;
    }

    try {
      const articleData = {
        ...formData,
        author: userProfile?.displayName || 'Admin',
        updatedAt: serverTimestamp()
      };

      if (editingArticle) {
        const articleRef = doc(db, 'articles', editingArticle.id);
        await updateDoc(articleRef, articleData);
        setArticles(prev => prev.map(a => a.id === editingArticle.id ? { ...a, ...articleData, id: a.id } as Article : a));
        alert(isRTL ? 'تم التحديث' : 'Updated successfully');
      } else {
        const newRef = doc(collection(db, 'articles'));
        await setDoc(newRef, { ...articleData, createdAt: serverTimestamp(), views: 0 });
        setArticles(prev => [{ id: newRef.id, ...articleData, createdAt: new Date(), views: 0 } as Article, ...prev]);
        alert(isRTL ? 'تم الإنشاء' : 'Created successfully');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving:', error);
      alert(isRTL ? 'خطأ في الحفظ' : 'Error saving');
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm(isRTL ? 'تأكيد الحذف؟' : 'Confirm delete?')) return;
    try {
      await deleteDoc(doc(db, 'articles', id));
      setArticles(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editArticle = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt || { ar: '', en: '' },
      content: article.content,
      category: article.category,
      ageGroup: article.ageGroup || 'all',
      keyTakeaways: article.keyTakeaways || { ar: [], en: [] },
      status: article.status,
      featuredImage: article.featuredImage || '',
      videoUrl: article.videoUrl || '',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingArticle(null);
    setFormData({
      title: { ar: '', en: '' },
      excerpt: { ar: '', en: '' },
      content: { ar: '', en: '' },
      category: 'undernutrition',
      ageGroup: 'all',
      keyTakeaways: { ar: [], en: [] },
      status: 'draft',
      featuredImage: '',
      videoUrl: '',
    });
    setShowForm(false);
  };



  // --- KEY TAKEAWAYS HANDLERS ---
  const addTakeaway = (val: string) => {
    if (!val.trim()) return;
    setFormData(prev => ({
      ...prev,
      keyTakeaways: {
        ...prev.keyTakeaways,
        [activeLanguage]: [...prev.keyTakeaways[activeLanguage], val]
      }
    }));
  };

  const removeTakeaway = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      keyTakeaways: {
        ...prev.keyTakeaways,
        [activeLanguage]: prev.keyTakeaways[activeLanguage].filter((_, i) => i !== idx)
      }
    }));
  };

  if (userProfile?.role !== 'admin') {
     return <div className="p-8 text-center">Unauthorized</div>;
  }

  return (
    <div className={`min-h-screen gradient-bg ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
             <div>
                <h1 className="text-3xl font-bold gradient-text">{isRTL ? 'إدارة المحتوى' : 'Content Management'}</h1>
                <p className="text-muted-foreground">{isRTL ? 'إدارة مقالات ومحتوى مركز المعرفة' : 'Manage Knowledge Center articles and content'}</p>
             </div>
             {!showForm && (
                 <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <Button variant="outline" onClick={importStaticArticles} className="flex-1 md:flex-none">
                        <Download className="h-4 w-4 mr-2" />
                        {isRTL ? 'استيراد المقالات الحالية' : 'Import Static Articles'}
                    </Button>
                    <Button onClick={() => setShowForm(true)} className="flex-1 md:flex-none">
                        <Plus className="h-4 w-4 mr-2" />
                        {isRTL ? 'مقال جديد' : 'New Article'}
                    </Button>
                 </div>
             )}
          </div>

          {!showForm ? (
            loading ? (
                <div className="flex justify-center py-12">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : (
            // LIST VIEW
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <Card key={article.id} className="hover:shadow-lg transition-all card-medical shadow-medical-sm">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                                    {article.status}
                                </Badge>
                                <Badge variant="outline">{article.category}</Badge>
                            </div>
                            <CardTitle className="line-clamp-1 mt-2">{isRTL ? article.title.ar : article.title.en}</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {isRTL ? article.excerpt?.ar : article.excerpt?.en}
                             </p>
                             <div className="flex gap-2 justify-end">
                                 <Button variant="ghost" size="sm" onClick={() => editArticle(article)}><Edit className="h-4 w-4" /></Button>
                                 <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteArticle(article.id)}><Trash2 className="h-4 w-4" /></Button>
                             </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
          )) : (
            // EDITOR FORM
            <Card className="border-none shadow-xl">
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <CardTitle>{editingArticle ? (isRTL ? 'تعديل مقال' : 'Edit Article') : (isRTL ? 'مقال جديد' : 'New Article')}</CardTitle>
                        <Tabs value={activeLanguage} onValueChange={(v: any) => setActiveLanguage(v)} className="w-full md:w-[200px]">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="ar">العربية</TabsTrigger>
                                <TabsTrigger value="en">English</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Common Fields (Metadata) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-lg">
                        <div className="space-y-2">
                             <Label>{isRTL ? 'الصورة الرئيسية (رابط)' : 'Featured Image (URL)'}</Label>
                             <Input 
                                value={formData.featuredImage} 
                                onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                                placeholder="https://..." 
                             />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                                <Label>{isRTL ? 'التصنيف' : 'Category'}</Label>
                                <select 
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    value={formData.category}
                                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                                >
                                    <option value="undernutrition">Undernutrition</option>
                                    <option value="overnutrition">Overnutrition</option>
                                    <option value="foodSafety">Food Safety</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>{isRTL ? 'الفئة العمرية' : 'Age Group'}</Label>
                                <select 
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    value={formData.ageGroup}
                                    onChange={(e) => setFormData(prev => ({ ...prev, ageGroup: e.target.value as any }))}
                                >
                                    <option value="all">All</option>
                                    <option value="children">Children</option>
                                    <option value="adults">Adults</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Translatable Fields */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>{isRTL ? 'العنوان' : 'Title'} ({activeLanguage.toUpperCase()})</Label>
                            <Input 
                                value={formData.title[activeLanguage]} 
                                onChange={(e) => setFormData(prev => ({ ...prev, title: { ...prev.title, [activeLanguage]: e.target.value } }))}
                                dir={activeLanguage === 'ar' ? 'rtl' : 'ltr'}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>{isRTL ? 'مقتطف (ملخص)' : 'Excerpt'} ({activeLanguage.toUpperCase()})</Label>
                            <Textarea 
                                value={formData.excerpt[activeLanguage]} 
                                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: { ...prev.excerpt, [activeLanguage]: e.target.value } }))}
                                dir={activeLanguage === 'ar' ? 'rtl' : 'ltr'}
                                rows={2}
                            />
                        </div>

                        {/* Rich Text Editor (React Quill) */}
                        <div className="space-y-2">
                            <Label>{isRTL ? 'المحتوى' : 'Content'} ({activeLanguage.toUpperCase()})</Label>
                            <div className="bg-background" dir="ltr"> {/* Force LTR for toolbar, but content adjusts */}
                                <ReactQuill 
                                    theme="snow"
                                    value={formData.content[activeLanguage]}
                                    onChange={(value) => setFormData(prev => ({ ...prev, content: { ...prev.content, [activeLanguage]: value } }))}
                                    modules={modules}
                                    formats={formats}
                                    className="h-[300px] mb-12" // Add margin for toolbar/footer overlap protection
                                />
                            </div>
                        </div>

                         {/* Dynamic Key Takeaways */}
                         <div className="space-y-2">
                            <Label>{isRTL ? 'النقاط الرئيسية' : 'Key Takeaways'} ({activeLanguage.toUpperCase()})</Label>
                            {formData.keyTakeaways[activeLanguage].map((val, idx) => (
                                <div key={idx} className="flex gap-2">
                                     <div className="flex-1 p-2 bg-muted/50 rounded text-sm">{val}</div>
                                     <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => removeTakeaway(idx)}>X</Button>
                                </div>
                            ))}
                            <Input 
                                placeholder={isRTL ? 'اضغط Enter لإضافة نقطة' : 'Press Enter to add point'}
                                dir={activeLanguage === 'ar' ? 'rtl' : 'ltr'}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter') {
                                        e.preventDefault();
                                        addTakeaway(e.currentTarget.value);
                                        e.currentTarget.value = '';
                                    }
                                }}
                            />
                         </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end pt-6 border-t">
                        <Button variant="outline" onClick={resetForm}>{isRTL ? 'إلغاء' : 'Cancel'}</Button>
                        <select 
                            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.status}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                        <Button onClick={saveArticle} className="btn-gradient">
                            <Save className="h-4 w-4 mr-2" />
                            {isRTL ? 'حفظ المقال' : 'Save Article'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default ContentManagement;
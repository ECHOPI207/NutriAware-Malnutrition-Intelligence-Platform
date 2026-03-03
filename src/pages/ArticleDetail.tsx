import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Lightbulb, ExternalLink, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { doc, getDoc, getDocs, collection, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { interventionArticles } from '@/data/interventionArticles';
import { articles as awarenessArticles } from '@/data/articles';

interface Article {
  id: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  content: { en: string; ar: string };
  category: string;
  imageUrl: string;
  featuredImage?: string;
  keyTakeaways?: { en: string[]; ar: string[] };
  slug?: string;
  isStatic?: boolean;
  tags?: { en: string[]; ar: string[] };
  practicalTips?: {
    en: string;
    ar: string;
    items: { en: string; ar: string }[];
  };
  sources?: { title_en: string; title_ar: string; url: string }[];
}

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const fetchArticle = async (slugOrId: string) => {
    try {
      setLoading(true);

      // 1. Check static articles first (intervention articles)
      const staticIntervention = interventionArticles.find(a => a.slug_en === slugOrId || a.slug_ar === slugOrId);

      if (staticIntervention) {
        let standardCategory = 'foodSafety';
        if (staticIntervention.axis === 2) standardCategory = 'balancedNutrition';
        if (staticIntervention.axis === 3) standardCategory = 'micronutrients';

        const safeSlug = staticIntervention.slug_en || '';
        const mockImageId = (staticIntervention.axis * 10) + parseInt(safeSlug.replace(/\D/g, '') || '0');
        const excerptEn = staticIntervention.quick_summary_en?.length > 0 ? staticIntervention.quick_summary_en[0] : '';
        const excerptAr = staticIntervention.quick_summary_ar?.length > 0 ? staticIntervention.quick_summary_ar[0] : '';

        const practicalTipsEn = staticIntervention.practical_tips_en || [];
        const practicalTipsAr = staticIntervention.practical_tips_ar || [];

        const mappedStatic: Article = {
          id: safeSlug,
          title: { en: staticIntervention.title_en, ar: staticIntervention.title_ar },
          excerpt: { en: excerptEn, ar: excerptAr },
          content: { en: staticIntervention.content_en, ar: staticIntervention.content_ar },
          category: standardCategory,
          imageUrl: staticIntervention.imageUrl || `https://picsum.photos/seed/nutri${mockImageId}/800/600`,
          slug: safeSlug,
          isStatic: true,
          tags: { en: staticIntervention.tags_en || [], ar: staticIntervention.tags_ar || [] },
          practicalTips: practicalTipsEn.length > 0 ? {
            en: 'Practical Tips',
            ar: 'نصائح عملية',
            items: practicalTipsEn.map((tip, i) => ({
              en: tip,
              ar: practicalTipsAr[i] || tip
            }))
          } : undefined,
          sources: (staticIntervention.sources_en || []).map((sourceUrl) => ({
            title_en: 'Source',
            title_ar: 'المصدر',
            url: sourceUrl
          }))
        };

        setArticle(mappedStatic);
        fetchRelated(standardCategory, mappedStatic.id);
        setLoading(false);
        return;
      }

      // 1b. Check awareness articles
      const staticAwareness = awarenessArticles.find(a => a.id === slugOrId || a.title.en === slugOrId || a.title.ar === slugOrId);
      if (staticAwareness) {
        const mappedAwareness: Article = {
          id: staticAwareness.id,
          title: staticAwareness.title,
          excerpt: staticAwareness.excerpt,
          content: staticAwareness.content,
          category: staticAwareness.category,
          imageUrl: staticAwareness.imageUrl || `https://picsum.photos/seed/nutri-aware-${staticAwareness.id}/800/600`,
          slug: staticAwareness.id,
          isStatic: true,
          tags: { en: [], ar: [] } // awareness articles in articles.ts don't have tags in the seen snippet
        };

        setArticle(mappedAwareness);
        fetchRelated(staticAwareness.category, mappedAwareness.id);
        setLoading(false);
        return;
      }

      // 2. Fetch from Firestore
      let articleData: Article | null = null;
      let articleId = slugOrId;

      const q = query(collection(db, 'articles'), where('slug', '==', slugOrId));
      const slugSnapshot = await getDocs(q);

      if (!slugSnapshot.empty) {
        const docSnap = slugSnapshot.docs[0];
        articleData = { ...docSnap.data(), id: docSnap.id } as Article;
        articleId = docSnap.id;
      } else {
        const docRef = doc(db, 'articles', slugOrId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          articleData = { ...docSnap.data(), id: docSnap.id } as Article;
        }
      }

      if (articleData) {
        setArticle(articleData);
        fetchRelated(articleData.category, articleId);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async (category: string, currentId: string) => {
    try {
      // Fetch from Firestore
      const q = query(
        collection(db, 'articles'),
        where('category', '==', category),
        where('status', '==', 'published'),
        limit(4)
      );
      const snapshot = await getDocs(q);
      const firestoreRelated = snapshot.docs
        .map(d => ({ id: d.id, ...d.data() } as Article));

      // Get static related (interventions)
      const staticInterventionRelated = interventionArticles
        .filter(a => {
          let cat = 'foodSafety';
          if (a.axis === 2) cat = 'balancedNutrition';
          if (a.axis === 3) cat = 'micronutrients';
          return cat === category;
        })
        .map(a => {
          const safeSlug = a.slug_en || '';
          const mockImageId = (a.axis * 10) + parseInt(safeSlug.replace(/\D/g, '') || '0');
          const excerptEn = a.quick_summary_en?.length > 0 ? a.quick_summary_en[0] : '';
          const excerptAr = a.quick_summary_ar?.length > 0 ? a.quick_summary_ar[0] : '';

          return {
            id: safeSlug,
            slug: safeSlug,
            title: { en: a.title_en, ar: a.title_ar },
            excerpt: { en: excerptEn, ar: excerptAr },
            category: category,
            imageUrl: a.imageUrl || `https://picsum.photos/seed/nutri${mockImageId}/800/600`,
            content: { en: '', ar: '' }
          } as Article;
        });

      // Get static related (awareness)
      const staticAwarenessRelated = awarenessArticles
        .filter(a => a.category === category)
        .map(a => ({
          id: a.id,
          slug: a.id,
          title: a.title,
          excerpt: a.excerpt,
          category: a.category,
          imageUrl: a.imageUrl || `https://picsum.photos/seed/nutri-aware-${a.id}/800/600`,
          content: a.content
        }) as Article);

      const allRelated = [...firestoreRelated, ...staticInterventionRelated, ...staticAwarenessRelated]
        .filter(a => a.id !== currentId && a.slug !== currentId)
        .slice(0, 3);

      setRelatedArticles(allRelated);
    } catch (error) {
      console.error('Error fetching related:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t('common.notFound') || 'Article not found'}</h2>
          <Button asChild>
            <Link to="/knowledge">
              <ArrowLeft className="h-4 w-4 me-2" />
              {t('common.back')}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'undernutrition':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      case 'overnutrition':
        return 'bg-secondary/10 text-secondary';
      case 'foodSafety':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'balancedNutrition':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'micronutrients':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const getLocalizedContent = (content: { en: string; ar: string } | undefined) => {
    if (!content) return '';
    const lang = language as 'en' | 'ar';
    return content[lang] || content[lang === 'en' ? 'ar' : 'en'] || '';
  };

  const localizedTags = article.tags?.[language as 'en' | 'ar'] || [];

  return (
    <div className={`min-h-screen py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/knowledge">
            {isRTL ? <ArrowLeft className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
            {t('common.back')}
          </Link>
        </Button>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-video bg-muted rounded-2xl overflow-hidden mb-8 shadow-sm">
                <img
                  src={article.featuredImage || article.imageUrl}
                  alt={getLocalizedContent(article.title)}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={`${getCategoryColor(article.category)}`}>
                  {t(`categories.${article.category}`)}
                </Badge>
                {article.isStatic && (
                  <Badge variant="outline" className="border-primary/50 text-foreground">
                    {isRTL ? 'مقال أساسي' : 'Core Module'}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl xl:text-4xl font-bold mb-6 text-foreground leading-tight">
                {getLocalizedContent(article.title)}
              </h1>

              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:leading-relaxed prose-p:text-foreground/90 prose-ul:list-none prose-ul:space-y-2 prose-li:pl-0 prose-strong:text-foreground/95 prose-a:text-primary mb-12"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    p: ({ children }) => <p className="mb-5">{children}</p>,
                    h2: ({ children }) => <h2 className="text-2xl mt-10 mb-4 text-primary">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl mt-8 mb-3 text-foreground">{children}</h3>,
                    ul: ({ children }) => <ul className="space-y-3 my-6">{children}</ul>,
                    li: ({ children }) => (
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-1.5">•</span>
                        <span className="flex-1">{children}</span>
                      </li>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-8 border rounded-xl shadow-sm">
                        <table className="w-full text-sm text-left rtl:text-right">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => <th className="bg-muted px-6 py-4 font-bold border-b">{children}</th>,
                    td: ({ children }) => <td className="px-6 py-4 border-b last:border-0">{children}</td>,
                  }}
                >
                  {getLocalizedContent(article.content)}
                </ReactMarkdown>
              </div>

              {/* Tags Section */}
              {localizedTags.length > 0 && (
                <div className="mb-10 pt-6 border-t">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                    {isRTL ? 'مواضيع ذات صلة' : 'Related Topics'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {localizedTags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="hover:bg-secondary/80 transition-colors cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources Section */}
              {article.sources && article.sources.length > 0 && (
                <div className="mb-10 pt-6 border-t">
                  <h3 className="text-lg font-bold mb-4 text-muted-foreground flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    {isRTL ? 'المصادر والمراجع' : 'Sources & References'}
                  </h3>
                  <ul className="space-y-3">
                    {article.sources.map((source, idx) => (
                      <li key={idx}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors flex items-start gap-2 max-w-2xl"
                        >
                          <span className="mt-0.5">•</span>
                          {isRTL ? source.title_ar : source.title_en}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.article>
          </div>

          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24 space-y-6"
            >
              {/* Firestore Article Key Takeaways */}
              {article.keyTakeaways && article.keyTakeaways[language as 'en' | 'ar']?.length > 0 && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                      {t('articles.keyTakeaways')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {article.keyTakeaways[language as 'en' | 'ar'].map((takeaway, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary/70 flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium leading-relaxed">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Static Article Practical Tips */}
              {article.practicalTips && (
                <Card className="border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/20">
                  <CardHeader className="pb-3 border-b border-amber-100 dark:border-amber-900/50">
                    <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-500">
                      <Lightbulb className="h-5 w-5" />
                      {isRTL ? article.practicalTips.ar : article.practicalTips.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-3">
                      {article.practicalTips.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium leading-relaxed text-amber-900 dark:text-amber-100">
                            {isRTL ? item.ar : item.en}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>{t('articles.relatedArticles')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedArticles.length > 0 ? (
                      relatedArticles.map(relatedArticle => (
                        <Link
                          key={relatedArticle.id}
                          to={`/knowledge/${relatedArticle.slug || relatedArticle.id}`}
                          className="group block p-3 -mx-3 rounded-xl hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex gap-3">
                            <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={relatedArticle.featuredImage || relatedArticle.imageUrl}
                                alt=""
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                {getLocalizedContent(relatedArticle.title)}
                              </h4>
                              <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4">
                                {t(`categories.${relatedArticle.category}`)}
                              </Badge>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">{t('common.noRelated') || 'No related articles'}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;

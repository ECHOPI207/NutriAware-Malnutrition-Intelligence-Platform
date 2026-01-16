import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { doc, getDoc, getDocs, collection, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Article {
  id: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  content: { en: string; ar: string };
  category: string;
  imageUrl: string;
  featuredImage?: string;
  keyTakeaways: { en: string[]; ar: string[] };
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
        fetchArticle(id);
    }
  }, [id]);

  const fetchArticle = async (articleId: string) => {
    try {
        setLoading(true);
        const docRef = doc(db, 'articles', articleId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data() as Article;
            setArticle({ id: docSnap.id, ...data });
            fetchRelated(data.category, docSnap.id);
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
        const q = query(
            collection(db, 'articles'), 
            where('category', '==', category),
            where('status', '==', 'published'), // Only published
            limit(4) // Fetch slightly more to filter out current
        );
        const snapshot = await getDocs(q);
        const articles = snapshot.docs
            .map(d => ({ id: d.id, ...d.data() } as Article))
            .filter(a => a.id !== currentId)
            .slice(0, 3);
        setRelatedArticles(articles);
    } catch (error) {
        console.error('Error fetching related:', error);
    }
  };

  const dedent = (str: string) => {
    if (!str) return '';
    return str;
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
        return 'bg-accent/10 text-accent';
      case 'overnutrition':
        return 'bg-secondary/10 text-secondary';
      case 'foodSafety':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/knowledge">
            <ArrowLeft className="h-4 w-4 me-2" />
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
              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
                <img
                  src={article.featuredImage || article.imageUrl}
                  alt={article.title[language as 'en' | 'ar']}
                  className="w-full h-full object-cover"
                />
              </div>

              <Badge className={`${getCategoryColor(article.category)} mb-4`}>
                {t(`categories.${article.category}`)}
              </Badge>

              <h1 className="text-3xl xl:text-4xl font-bold mb-4">
                {article.title[language as 'en' | 'ar']}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {article.excerpt ? article.excerpt[language as 'en' | 'ar'] : ''}
              </p>

              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-p:leading-relaxed prose-ul:list-none prose-ul:space-y-2 prose-li:pl-0 prose-strong:text-foreground"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p className="mb-4 text-foreground leading-relaxed">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
                    ul: ({ children }) => <ul className="space-y-2 my-4">{children}</ul>,
                    li: ({ children }) => (
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span className="flex-1">{children}</span>
                      </li>
                    ),
                  }}
                >
                  {dedent(article.content[language as 'en' | 'ar'])}
                </ReactMarkdown>
              </div>
            </motion.article>
          </div>

          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              {article.keyTakeaways && article.keyTakeaways[language as 'en' | 'ar']?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        {t('articles.keyTakeaways')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {article.keyTakeaways[language as 'en' | 'ar'].map((takeaway, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
              )}

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{t('articles.relatedArticles')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedArticles.length > 0 ? (
                        relatedArticles.map(relatedArticle => (
                            <Link
                              key={relatedArticle.id}
                              to={`/knowledge/${relatedArticle.id}`}
                              className="block p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                              <h4 className="font-medium text-sm mb-1">
                                {relatedArticle.title[language as 'en' | 'ar']}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {relatedArticle.excerpt[language as 'en' | 'ar']}
                              </p>
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

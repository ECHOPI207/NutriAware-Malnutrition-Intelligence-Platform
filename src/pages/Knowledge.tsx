import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Article {
  id: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  category: string;
  imageUrl: string;
  featuredImage?: string; // Admin might use this name
}

const Knowledge: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'undernutrition', 'overnutrition', 'foodSafety'];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      // Fetch only published articles
      const q = query(collection(db, 'articles'), where('status', '==', 'published'));
      // Note: Ideally we add orderBy here but it requires a composite index with 'status'.
      // For now client-side sort or simplistic fetch is fine.
      
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Article[];
      
      setArticles(fetched);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    if (selectedCategory === 'all') return true;
    return article.category === selectedCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'undernutrition':
        return 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700';
      case 'overnutrition':
        return 'bg-secondary/10 text-secondary hover:bg-secondary/20';
      case 'foodSafety':
        return 'bg-primary/10 text-primary hover:bg-primary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('articles.title')}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('articles.subtitle')}
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="gap-2 font-bold"
            >
              <Filter className="h-4 w-4" />
              {t(`categories.${category}`)}
            </Button>
          ))}
        </div>

        {loading ? (
             <div className="flex justify-center py-20">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
                <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                    <div className="aspect-video bg-muted overflow-hidden">
                    <Link to={`/knowledge/${article.id}`}>
                        <img
                        src={article.featuredImage || article.imageUrl}
                        alt={article.title[language as 'en' | 'ar']}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </Link>
                    </div>
                    <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge className={getCategoryColor(article.category)}>
                        {t(`categories.${article.category}`)}
                        </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        <Link to={`/knowledge/${article.id}`}>
                        {article.title[language as 'en' | 'ar']}
                        </Link>
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.excerpt[language as 'en' | 'ar']}
                    </p>
                    <Link to={`/knowledge/${article.id}`} className="w-full">
                        <Button className="w-full btn-gradient group/btn shadow-md">
                        {t('articles.readMore')}
                        {language === 'ar' ? (
                            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover/btn:-translate-x-1" />
                        ) : (
                            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        )}
                        </Button>
                    </Link>
                    </CardContent>
                </Card>
                </motion.div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Knowledge;

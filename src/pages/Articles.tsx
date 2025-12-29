import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, query, where, orderBy, getDocs, limit, startAfter, DocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  BookOpen, 
  TrendingUp,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import ArticleCard from '@/components/articles/ArticleCard';

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

const Articles: React.FC = () => {
  const { i18n } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  const isRTL = i18n.language === 'ar';
  const currentLang = isRTL ? 'ar' : 'en';

  useEffect(() => {
    fetchArticles();
    fetchFeaturedArticles();
  }, []);

  const fetchArticles = async (loadMore = false) => {
    try {
      setLoading(!loadMore);
      
      let articlesQuery = query(
        collection(db, 'articles'),
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc'),
        limit(9)
      );

      if (loadMore && lastDoc) {
        articlesQuery = query(
          collection(db, 'articles'),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(9)
        );
      }

      const querySnapshot = await getDocs(articlesQuery);
      const fetchedArticles: Article[] = [];
      const uniqueCategories = new Set<string>();

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Article;
        const articleData = {
          ...data,
          id: doc.id
        };
        fetchedArticles.push(articleData);
        
        // Collect categories
        if (data.category) {
          uniqueCategories.add(data.category[currentLang]);
        }
      });

      if (loadMore) {
        setArticles(prev => [...prev, ...fetchedArticles]);
      } else {
        setArticles(fetchedArticles);
        setCategories(Array.from(uniqueCategories));
      }

      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
      setHasMore(querySnapshot.docs.length === 9);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedArticles = async () => {
    try {
      // Get most viewed articles as featured
      const featuredQuery = query(
        collection(db, 'articles'),
        where('status', '==', 'published'),
        orderBy('views', 'desc'),
        limit(3)
      );

      const querySnapshot = await getDocs(featuredQuery);
      const featured: Article[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Article;
        const articleData = {
          ...data,
          id: doc.id
        };
        featured.push(articleData);
      });

      setFeaturedArticles(featured);
    } catch (error) {
      console.error('Error fetching featured articles:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchArticles();
      return;
    }

    try {
      setLoading(true);
      
      // Simple search implementation - in production, you'd use a search service
      const searchQuery = query(
        collection(db, 'articles'),
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(searchQuery);
      const searchResults: Article[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Article;
        const articleData = {
          ...data,
          id: doc.id
        };
        
        // Simple text search in title and content
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = articleData.title[currentLang].toLowerCase().includes(searchLower);
        const contentMatch = articleData.content[currentLang].toLowerCase().includes(searchLower);
        const categoryMatch = articleData.category[currentLang].toLowerCase().includes(searchLower);
        const tagsMatch = articleData.tags[currentLang].some(tag => 
          tag.toLowerCase().includes(searchLower)
        );

        if (titleMatch || contentMatch || categoryMatch || tagsMatch) {
          searchResults.push(articleData);
        }
      });

      setArticles(searchResults);
      setHasMore(false);
    } catch (error) {
      console.error('Error searching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category: string) => {
    setSelectedCategory(category);
    
    if (!category) {
      fetchArticles();
      return;
    }

    try {
      setLoading(true);
      
      const categoryQuery = query(
        collection(db, 'articles'),
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(categoryQuery);
      const filteredArticles: Article[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Article;
        const articleData = {
          ...data,
          id: doc.id
        };
        
        if (articleData.category[currentLang] === category) {
          filteredArticles.push(articleData);
        }
      });

      setArticles(filteredArticles);
      setHasMore(false);
    } catch (error) {
      console.error('Error filtering articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = (article: Article) => {
    // Navigate to article detail page
    // This would typically use React Router
    console.log('Navigate to article:', article.id);
  };

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
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold gradient-text">
                {isRTL ? 'المقالات' : 'Articles'}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {isRTL ? 'اكتشف أحدث المقالات والمحتوى التعليمي' : 'Discover the latest articles and educational content'}
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={isRTL ? 'ابحث في المقالات...' : 'Search articles...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-10"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                </div>
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  {isRTL ? 'بحث' : 'Search'}
                </Button>
              </div>

              {/* Categories Filter */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">{isRTL ? 'التصنيفات:' : 'Categories:'}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedCategory === '' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => filterByCategory('')}
                  >
                    {isRTL ? 'الكل' : 'All'}
                  </Badge>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => filterByCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">{isRTL ? 'المقالات المميزة' : 'Featured Articles'}</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {featuredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ArticleCard
                      article={article}
                      variant="featured"
                      onReadMore={handleReadMore}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Articles Grid */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">{isRTL ? 'أحدث المقالات' : 'Latest Articles'}</h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <div className="h-48 bg-muted rounded-t-lg" />
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-2" />
                      <div className="h-4 bg-muted rounded mb-4 w-3/4" />
                      <div className="h-3 bg-muted rounded mb-2" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {isRTL ? 'لا توجد مقالات' : 'No Articles Found'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL ? 'لم يتم العثور على مقالات تطابق البحث' : 'No articles match your search criteria'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ArticleCard
                      article={article}
                      onReadMore={handleReadMore}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && articles.length > 0 && (
              <div className="text-center mt-8">
                <Button 
                  onClick={() => fetchArticles(true)}
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? (isRTL ? 'جاري التحميل...' : 'Loading...') : (isRTL ? 'تحميل المزيد' : 'Load More')}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Articles;
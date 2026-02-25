import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Search, BookOpen, Sparkles, ChevronRight,
  Wheat, ShieldCheck, Microscope, TrendingDown, TrendingUp, LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SurveyCTA } from '@/components/common/SurveyCTA';
import { interventionArticles } from '@/data/interventionArticles';

// Unified Article Interface handling both Firestore and Static data
export interface UnifiedArticle {
  id: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  category: string;
  imageUrl: string;
  featuredImage?: string;
  slug?: string;
  isStatic?: boolean;
  week?: number;
}

const CATEGORY_CONFIG: Record<string, {
  icon: React.ElementType;
  gradient: string;
  badgeCls: string;
  pillActive: string;
  pillHover: string;
  accentColor: string;
}> = {
  all: {
    icon: LayoutGrid,
    gradient: 'from-primary/20 via-blue-500/10 to-violet-500/20',
    badgeCls: 'bg-primary/10 text-primary',
    pillActive: 'bg-primary text-white shadow-lg shadow-primary/30',
    pillHover: 'hover:bg-primary/10 hover:text-primary',
    accentColor: '#3b82f6',
  },
  foodSafety: {
    icon: ShieldCheck,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    badgeCls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    pillActive: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30',
    pillHover: 'hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400',
    accentColor: '#10b981',
  },
  balancedNutrition: {
    icon: Wheat,
    gradient: 'from-blue-500/20 via-indigo-500/10 to-sky-500/20',
    badgeCls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    pillActive: 'bg-blue-500 text-white shadow-lg shadow-blue-500/30',
    pillHover: 'hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400',
    accentColor: '#3b82f6',
  },
  micronutrients: {
    icon: Microscope,
    gradient: 'from-purple-500/20 via-violet-500/10 to-fuchsia-500/20',
    badgeCls: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    pillActive: 'bg-purple-500 text-white shadow-lg shadow-purple-500/30',
    pillHover: 'hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-400',
    accentColor: '#8b5cf6',
  },
  undernutrition: {
    icon: TrendingDown,
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    badgeCls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    pillActive: 'bg-amber-500 text-white shadow-lg shadow-amber-500/30',
    pillHover: 'hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-900/20 dark:hover:text-amber-400',
    accentColor: '#f59e0b',
  },
  overnutrition: {
    icon: TrendingUp,
    gradient: 'from-rose-500/20 via-red-500/10 to-pink-500/20',
    badgeCls: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    pillActive: 'bg-rose-500 text-white shadow-lg shadow-rose-500/30',
    pillHover: 'hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-900/20 dark:hover:text-rose-400',
    accentColor: '#f43f5e',
  },
};

const Knowledge: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [firestoreArticles, setFirestoreArticles] = useState<UnifiedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'foodSafety', 'balancedNutrition', 'micronutrients', 'undernutrition', 'overnutrition'];

  useEffect(() => { fetchFirestoreArticles(); }, []);

  const fetchFirestoreArticles = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'articles'), where('status', '==', 'published'));
      const snapshot = await getDocs(q);
      setFirestoreArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as UnifiedArticle[]);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const mappedStaticArticles: UnifiedArticle[] = useMemo(() => {
    return interventionArticles.map(article => {
      const safeSlug = article.slug_en || '';
      const mockImageId = (article.axis * 10) + parseInt(safeSlug.replace(/\D/g, '') || '0');
      let standardCategory = 'foodSafety';
      if (article.axis === 2) standardCategory = 'balancedNutrition';
      if (article.axis === 3) standardCategory = 'micronutrients';
      const excerptEn = article.quick_summary_en?.length > 0 ? article.quick_summary_en[0] : article.content_en.substring(0, 100) + '...';
      const excerptAr = article.quick_summary_ar?.length > 0 ? article.quick_summary_ar[0] : article.content_ar.substring(0, 100) + '...';
      return {
        id: safeSlug,
        title: { en: article.title_en, ar: article.title_ar },
        excerpt: { en: excerptEn, ar: excerptAr },
        category: standardCategory,
        imageUrl: `https://picsum.photos/seed/nutri${mockImageId}/800/600`,
        slug: safeSlug,
        isStatic: true,
        week: article.axis === 1 ? Math.ceil(parseInt(safeSlug.replace(/\D/g, '') || '0') / 3) : undefined,
      };
    });
  }, []);

  const allArticles = useMemo(() => [...firestoreArticles, ...mappedStaticArticles], [firestoreArticles, mappedStaticArticles]);

  const filteredArticles = useMemo(() => {
    return allArticles.filter(article => {
      if (selectedCategory !== 'all' && article.category !== selectedCategory) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matches = [article.title?.en, article.title?.ar, article.excerpt?.en, article.excerpt?.ar]
          .some(s => s?.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [allArticles, selectedCategory, searchTerm]);

  const getLocalizedContent = (content: { en: string; ar: string } | undefined) => {
    if (!content) return '';
    const lang = language as 'en' | 'ar';
    return content[lang] || content[lang === 'en' ? 'ar' : 'en'] || '';
  };

  const catConfig = CATEGORY_CONFIG[selectedCategory] || CATEGORY_CONFIG.all;

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: (i: number) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] } }),
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ─── Hero Section ─── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-32">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -start-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50" />
          <div className="absolute -bottom-40 -end-40 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[120px] opacity-50" />
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] opacity-60" />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              {isRTL ? 'محتوى علمي موثوق' : 'Science-backed content'}
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-none">
              {isRTL ? (
                <>
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">مركز </span>
                  <span>المعرفة</span>
                </>
              ) : (
                <>
                  <span>Knowledge </span>
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Hub</span>
                </>
              )}
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              {isRTL
                ? 'اكتشف مقالات ودراسات معتمدة علمياً حول تغذية الأطفال، سوء التغذية، والصحة الغذائية'
                : 'Explore peer-reviewed articles and guides on child nutrition, malnutrition, and dietary health'}
            </p>
          </motion.div>

          {/* Stats ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-white/70 text-sm"
          >
            {[
              { num: allArticles.length, label: isRTL ? 'مقالة متاحة' : 'Articles' },
              { num: categories.length - 1, label: isRTL ? 'تخصصات' : 'Specialties' },
              { num: '100%', label: isRTL ? 'مجاني' : 'Free Access' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-white font-bold text-base">{s.num}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ─── Filter + Search floating bar ─── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="-mt-16 z-10 relative bg-background/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl shadow-black/10 p-4 sm:p-5"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 flex-1 justify-center sm:justify-start">
              {categories.map((cat) => {
                const cfg = CATEGORY_CONFIG[cat];
                const Icon = cfg.icon;
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border
                      ${isActive
                        ? cfg.pillActive + ' border-transparent scale-105'
                        : 'border-border/50 text-muted-foreground ' + cfg.pillHover
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {t(`categories.${cat}`)}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                type="text"
                placeholder={isRTL ? 'ابحث في المقالات...' : 'Search articles...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${isRTL ? 'pr-9' : 'pl-9'} rounded-full h-10 bg-muted/50 border-border/50 focus:bg-background`}
              />
            </div>
          </div>
        </motion.div>

        {/* ─── Results area ─── */}
        <div className="mt-10 mb-20">
          {/* Result count */}
          <motion.div
            key={selectedCategory + searchTerm}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-6 flex-wrap gap-3"
          >
            <p className="text-muted-foreground text-sm">
              {isRTL
                ? `عرض ${filteredArticles.length} ${filteredArticles.length === 1 ? 'مقالة' : 'مقالات'}`
                : `Showing ${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''}`}
              {selectedCategory !== 'all' && (
                <span className="ms-2 font-medium text-foreground">· {t(`categories.${selectedCategory}`)}</span>
              )}
            </p>
            {(selectedCategory !== 'all' || searchTerm) && (
              <button
                onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                {isRTL ? 'مسح الفلاتر' : 'Clear filters'}
              </button>
            )}
          </motion.div>

          {/* Loading skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-muted/50 animate-pulse">
                  <div className="aspect-[16/10] bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-20 bg-muted rounded-full" />
                    <div className="h-4 w-full bg-muted rounded-full" />
                    <div className="h-4 w-3/4 bg-muted rounded-full" />
                    <div className="h-3 w-full bg-muted rounded-full mt-4" />
                    <div className="h-3 w-2/3 bg-muted rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchTerm}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredArticles.map((article, index) => {
                  const cfg = CATEGORY_CONFIG[article.category] || CATEGORY_CONFIG.all;
                  return (
                    <motion.article
                      key={article.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
                    >
                      {/* Image */}
                      <Link to={`/knowledge/${article.slug || article.id}`} className="block relative overflow-hidden aspect-[16/10] bg-muted shrink-0">
                        <img
                          src={article.featuredImage || article.imageUrl}
                          alt={getLocalizedContent(article.title)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
                        {/* Category icon badge */}
                        <div className="absolute top-3 start-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md bg-white/20 text-white border border-white/30`}>
                            {(() => { const I = cfg.icon; return <I className="w-3 h-3" />; })()}
                            {t(`categories.${article.category}`)}
                          </span>
                        </div>
                        {/* Core module badge */}
                        {article.isStatic && (
                          <div className="absolute bottom-3 end-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/40 text-white/90 backdrop-blur-sm border border-white/10">
                              <BookOpen className="w-3 h-3" />
                              {isRTL ? 'أساسي' : 'Core'}
                            </span>
                          </div>
                        )}
                      </Link>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5">
                        <Link to={`/knowledge/${article.slug || article.id}`}>
                          <h3 className="font-bold text-base leading-snug mb-2 text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                            {getLocalizedContent(article.title)}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                          {getLocalizedContent(article.excerpt)}
                        </p>

                        {/* CTA */}
                        <Link
                          to={`/knowledge/${article.slug || article.id}`}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200"
                        >
                          {isRTL ? 'اقرأ المقال' : 'Read article'}
                          {isRTL
                            ? <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            : <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          }
                        </Link>
                      </div>

                      {/* Bottom accent line that slides in on hover */}
                      <div
                        className="absolute bottom-0 start-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${cfg.accentColor}, transparent)` }}
                      />
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-28 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center mb-5">
                <Search className="w-9 h-9 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {isRTL ? 'لم يتم العثور على مقالات' : 'No articles found'}
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                {isRTL
                  ? 'جرب البحث بكلمات أخرى أو اختر فئة مختلفة.'
                  : 'Try adjusting your search or selecting a different category.'}
              </p>
              <Button
                variant="outline"
                className="mt-6 rounded-full"
                onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}
              >
                {isRTL ? 'عرض الكل' : 'Show all'}
                <ChevronRight className="w-4 h-4 ms-1" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      <SurveyCTA />
    </div>
  );
};

export default Knowledge;

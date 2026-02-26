// ============================================================
// NutriAware Intervention Articles — 18 Bilingual Articles
// Organized by 3 Axes across 6 Weeks
// ============================================================

export interface ArticleMeta {
    meta_title_ar: string;
    meta_title_en: string;
    meta_description_ar: string;
    meta_description_en: string;
    reading_time_minutes: number;
    og_title_ar: string;
    og_title_en: string;
    og_description_ar: string;
    og_description_en: string;
}

export interface InterventionArticle {
    id: number;
    axis: number;
    axis_ar: string;
    axis_en: string;
    week_range: string;
    title_ar: string;
    title_en: string;
    slug_ar: string;
    slug_en: string;
    quick_summary_ar: string[];
    quick_summary_en: string[];
    content_ar: string;
    content_en: string;
    practical_tips_ar?: string[];
    practical_tips_en?: string[];
    sources_ar: string[];
    sources_en: string[];
    tags_ar: string[];
    tags_en: string[];
    meta: ArticleMeta;
    imageUrl?: string;
    category?: string;
}

export interface AxisDefinition {
    id: number;
    title_ar: string;
    title_en: string;
    description_ar: string;
    description_en: string;
    week_range: string;
    article_count: number;
    color: string;
    icon: string;
}

export const AXES: AxisDefinition[] = [
    {
        id: 1,
        title_ar: 'سلامة الغذاء',
        title_en: 'Food Safety',
        description_ar: 'المفاتيح الخمسة لغذاء آمن، نظام HACCP، التلوث المتبادل، الأمراض المنقولة بالغذاء، وغسل اليدين',
        description_en: 'Five keys to safer food, HACCP system, cross-contamination, foodborne diseases, and handwashing',
        week_range: '1-2',
        article_count: 5,
        color: '#10B981',
        icon: 'Shield',
    },
    {
        id: 2,
        title_ar: 'التغذية المتوازنة والمغذيات الكبرى',
        title_en: 'Balanced Nutrition & Macronutrients',
        description_ar: 'الطبق المتوازن، المغذيات الكبرى، الإفطار والسناكس، قراءة البطاقة الغذائية، وسمنة الأطفال',
        description_en: 'Balanced plate, macronutrients, breakfast & snacks, reading nutrition labels, and childhood obesity',
        week_range: '3-4',
        article_count: 5,
        color: '#F59E0B',
        icon: 'Utensils',
    },
    {
        id: 3,
        title_ar: 'المغذيات الدقيقة والتنوع الغذائي',
        title_en: 'Micronutrients & Dietary Diversity',
        description_ar: 'الحديد، فيتامين أ، الزنك، الكالسيوم، فيتامين د، اليود، التنوع الغذائي، والتغذية حسب العمر',
        description_en: 'Iron, Vitamin A, Zinc, Calcium, Vitamin D, Iodine, dietary diversity, and age-based nutrition',
        week_range: '5-6',
        article_count: 8,
        color: '#8B5CF6',
        icon: 'Sparkles',
    },
];

// Helper functions
export function getArticlesByAxis(axis: number): InterventionArticle[] {
    return interventionArticles.filter(a => a.axis === axis);
}

export function getArticleBySlug(slug: string): InterventionArticle | undefined {
    return interventionArticles.find(a => a.slug_ar === slug || a.slug_en === slug);
}

export function getArticleById(id: number): InterventionArticle | undefined {
    return interventionArticles.find(a => a.id === id);
}

export function getAllTags(lang: 'ar' | 'en'): string[] {
    const tagSet = new Set<string>();
    interventionArticles.forEach(a => {
        const tags = lang === 'ar' ? a.tags_ar : a.tags_en;
        tags.forEach(t => tagSet.add(t));
    });
    return Array.from(tagSet);
}

export function getArticlesByTag(tag: string, lang: 'ar' | 'en'): InterventionArticle[] {
    return interventionArticles.filter(a => {
        const tags = lang === 'ar' ? a.tags_ar : a.tags_en;
        return tags.includes(tag);
    });
}

export function getArticlesByWeek(weekRange: string): InterventionArticle[] {
    return interventionArticles.filter(a => a.week_range === weekRange);
}

// ============================================================
// ARTICLES DATA — imported from separate axis files
// ============================================================
import { axis1Articles } from './articles/axis1';
import { axis2Articles } from './articles/axis2';
import { axis3Articles } from './articles/axis3';

export const interventionArticles: InterventionArticle[] = [
    ...axis1Articles,
    ...axis2Articles,
    ...axis3Articles,
];

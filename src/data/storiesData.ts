export interface StoryItem {
    id: string;
    slug_en: string;
    slug_ar: string;
    title_ar: string;
    title_en: string;
    description_ar: string;
    description_en: string;
    age_range: string;
    reading_time_minutes: number;
    pdf_filename: string;
    week: number;
    axis: number;
    cover_color: string;
    cover_image?: string;
}

export const stories: StoryItem[] = [
    {
        id: 'story-1',
        slug_en: 'beautiful-morning',
        slug_ar: 'في-صباح-يوم-جميل',
        title_ar: 'في صباح يومٍ جميل',
        title_en: 'On a Beautiful Morning',
        description_ar: 'قصة مصورة عن أهمية النظافة وغسل اليدين قبل تناول الطعام',
        description_en: 'An illustrated story about the importance of hygiene and handwashing before eating',
        age_range: '4-8',
        reading_time_minutes: 5,
        pdf_filename: 'story-1-beautiful-morning.pdf',
        week: 1,
        axis: 1,
        cover_color: '#10B981',
        cover_image: '/stories/cover-1.png',
    },
    {
        id: 'story-2',
        slug_en: 'mai-magic-lunchbox',
        slug_ar: 'مي-والانش-بوكس-السحري',
        title_ar: 'مي والانش بوكس السحري',
        title_en: 'Mai and the Magic Lunchbox',
        description_ar: 'قصة مصورة عن التغذية المتوازنة واختيار الطعام الصحي للأطفال',
        description_en: 'An illustrated story about balanced nutrition and choosing healthy food for children',
        age_range: '4-8',
        reading_time_minutes: 5,
        pdf_filename: 'story-2-mai-magic-lunchbox.pdf',
        week: 2,
        axis: 1,
        cover_color: '#F59E0B',
        cover_image: '/stories/cover-2.png',
    },
];

export function getStoryBySlug(slug: string): StoryItem | undefined {
    return stories.find(s => s.slug_ar === slug || s.slug_en === slug);
}

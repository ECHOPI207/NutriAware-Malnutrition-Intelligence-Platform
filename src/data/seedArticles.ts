import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { sampleArticles } from '@/data/sampleArticles';

/**
 * Seed the database with sample articles
 * This function should be called once to populate the database with test data
 */
export const seedArticles = async () => {
  try {
    for (const article of sampleArticles) {
      const articleData = {
        ...article,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'articles'), articleData);
      }
    
    return { success: true, message: 'Articles seeded successfully' };
  } catch (error) {
    console.error('Error seeding articles:', error);
    return { success: false, error };
  }
};

/**
 * Call this function from browser console to seed articles:
 * 
 * import { seedArticles } from './src/utils/seedArticles';
 * seedArticles();
 */

// Make it available globally for easy access in development
if (typeof window !== 'undefined') {
  (window as any).seedArticles = seedArticles;
}
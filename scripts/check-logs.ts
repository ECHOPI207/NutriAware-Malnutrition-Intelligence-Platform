
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkLogs() {
  console.log('Checking activity_logs collection...');
  try {
    const q = query(collection(db, 'activity_logs'), orderBy('timestamp', 'desc'), limit(5));
    const snapshot = await getDocs(q);
    
    console.log(`Found ${snapshot.size} documents.`);
    
    if (snapshot.empty) {
      console.log('Collection is empty.');
    } else {
      snapshot.forEach(doc => {
        const data = doc.data();
        console.log('Log ID:', doc.id);
        console.log('User:', data.userName, `(${data.userId})`);
        console.log('Role:', data.userRole);
        console.log('Type:', data.activityType);
        console.log('---');
      });
    }
  } catch (error) {
    console.error('Error fetching logs:', error);
  }
}

checkLogs();

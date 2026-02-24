const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, orderBy, limit, getDocs } = require('firebase/firestore');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testQuery() {
    try {
        console.log("Testing user count query...");
        const usersColl = collection(db, 'users');
        const usersQuery = query(usersColl, orderBy('createdAt', 'desc'), limit(5));
        const snap = await getDocs(usersQuery);
        console.log(`Success! Found ${snap.size} users.`);
    } catch (error) {
        console.error("Query Failed. This is the exact error:");
        console.error(error.message);
    }
}

testQuery();

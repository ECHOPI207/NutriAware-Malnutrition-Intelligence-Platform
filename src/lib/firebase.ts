// Firebase Configuration and Initialization
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate config to prevent crash
const isConfigValid = Object.values(firebaseConfig).every(value => value !== undefined && value !== '');

if (!isConfigValid) {
  console.error('Firebase configuration is missing or incomplete. Check your environment variables.');
}

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  if (!isConfigValid) {
    throw new Error('Missing Firebase configuration');
  }
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
  // Prevent app crash with mock objects
  app = null as unknown as FirebaseApp;
  auth = { 
    currentUser: null, 
    onAuthStateChanged: (cb: any) => { cb(null); return () => {}; },
    signInWithEmailAndPassword: async () => { throw new Error("Firebase not configured"); }
  } as unknown as Auth;
  db = {} as unknown as Firestore;
}

export { auth, db };

// Development emulator setup (optional)
if (import.meta.env.DEV && auth && !auth.emulatorConfig) {
  try {
    // Uncomment these lines if you want to use Firebase emulators in development
    // connectAuthEmulator(auth, 'http://localhost:9099');
    // connectFirestoreEmulator(db, 'localhost', 8080);
  } catch (error) {

  }
}

export default app;
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
  updatePassword
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

// Types
export type UserRole = 'user' | 'admin' | 'doctor' | 'nutritionist';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  location?: string;
  bio?: string;
  gender?: 'male' | 'female' | 'other';
  birthDate?: string;
  role: UserRole;
  createdAt: any;
  updatedAt: any;
}

interface AuthContextType {
  user: (User & { role?: UserRole }) | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  changePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<(User & { role?: UserRole }) | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Create or update user profile in Firestore
  const createUserProfile = async (user: User, additionalData: any = {}) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = serverTimestamp();

      // Determine role based on email (hardcoded for specific emails)
      let role: UserRole = 'user';
      if (email === 'admin@nutriaware.com') {
        role = 'admin';
      } else if (email === 'doctor@nutriaware.com') {
        role = 'doctor';
      }

      try {
        await setDoc(userRef, {
          displayName: displayName || additionalData.displayName || '',
          email,
          photoURL: photoURL || '',
          phoneNumber: user.phoneNumber || '',
          role,
          createdAt,
          updatedAt: createdAt,
          lastLogin: serverTimestamp(),
          loginCount: 1,
          authProvider: additionalData.authProvider || 'email',
          ...additionalData,
        });
      } catch (error) {
        // Silent error
      }
    } else {
      // User exists — update lastLogin and increment login count
      try {
        const existingData = userSnap.data();
        await setDoc(userRef, {
          lastLogin: serverTimestamp(),
          loginCount: (existingData?.loginCount || 0) + 1,
          updatedAt: serverTimestamp(),
          // Update photo if changed (e.g. Google profile pic)
          ...(user.photoURL ? { photoURL: user.photoURL } : {}),
          ...(additionalData || {}),
        }, { merge: true });
      } catch (error) {
        // Silent error
      }
    }

    // Fetch and set user profile
    const updatedUserSnap = await getDoc(userRef);
    if (updatedUserSnap.exists()) {
      const profileData = updatedUserSnap.data() as UserProfile;
      setUserProfile({
        ...profileData,
        uid: user.uid,
      });
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Fetch user profile from Firestore
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const profileData = userSnap.data() as UserProfile;

            // Set user with role information
            setUser({
              ...firebaseUser,
              role: profileData.role
            });

            setUserProfile({
              ...profileData,
              uid: firebaseUser.uid,
            });
          } else {
            // Create profile if it doesn't exist
            await createUserProfile(firebaseUser);
          }
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Session Timeout Logic
  useEffect(() => {
    // 4 hours in milliseconds
    const TIMEOUT_DURATION = 4 * 60 * 60 * 1000;

    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);

      if (user) {
        timeoutId = setTimeout(() => {
          // Auto logout
          console.log('Session timed out due to inactivity');
          logout();
          window.location.href = '/auth/login?reason=timeout';
        }, TIMEOUT_DURATION);
      }
    };

    // Events to listen for activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];

    const handleActivity = () => {
      resetTimer();
    };

    if (user) {
      // Setup listeners
      events.forEach(event => {
        window.addEventListener(event, handleActivity);
      });
      // Initial start
      resetTimer();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [user]);

  // Log user activity to Firestore
  const logActivity = async (userId: string, action: string, details?: string) => {
    try {
      await addDoc(collection(db, 'users', userId, 'activity_log'), {
        action,
        details: details || '',
        timestamp: serverTimestamp(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      });
    } catch (error) {
      // Non-blocking
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await createUserProfile(result.user, { authProvider: 'email' });
      await logActivity(result.user.uid, 'login', 'تسجيل دخول بالبريد الإلكتروني');
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Update the user's display name
      await updateProfile(user, { displayName });

      // Create user profile in Firestore
      await createUserProfile(user, { displayName });
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');

      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      // Extract all available Google profile data
      const additionalData: any = {
        authProvider: 'google',
        photoURL: googleUser.photoURL || '',
        phoneNumber: googleUser.phoneNumber || '',
        emailVerified: googleUser.emailVerified,
      };

      await createUserProfile(googleUser, additionalData);
      await logActivity(googleUser.uid, 'login', 'تسجيل دخول عبر Google');
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Sign in with Facebook
  const signInWithFacebook = async () => {
    setLoading(true);
    try {
      const provider = new FacebookAuthProvider();

      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user, { authProvider: 'facebook' });
      await logActivity(result.user.uid, 'login', 'تسجيل دخول عبر Facebook');
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      if (user) {
        await logActivity(user.uid, 'logout', 'تسجيل خروج');
      }
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    try {
      await setDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      // Update local state
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          ...data,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (password: string) => {
    if (!user) throw new Error('No user logged in');
    try {
      await updatePassword(user, password);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    logout,
    updateUserProfile,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
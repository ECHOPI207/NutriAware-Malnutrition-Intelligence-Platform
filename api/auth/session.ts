import { VercelRequest, VercelResponse } from '@vercel/node';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin (reusing existing initialization pattern)
if (!admin.apps.length) {
    try {
        if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                }),
            });
        } else {
            // Fallback for local dev
            const serviceAccount = require('../../../admin-sdk.json');
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        }
    } catch (error) {
        console.error('Firebase admin initialization error', error);
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS setup
    const origin = req.headers.origin || '';
    const allowedDomains = ['localhost', 'nutriaware', 'vercel.app', 'nutri-aware'];
    const isAllowedOrigin = (origin && allowedDomains.some(domain => origin.includes(domain))) || process.env.NODE_ENV === 'development';

    if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') return res.status(204).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { idToken, deviceInfo } = req.body;

        if (!idToken) {
            return res.status(401).json({ error: 'UNAUTHORIZED: idToken missing' });
        }

        // Set session expiration to 14 days
        const expiresIn = 1000 * 60 * 60 * 24 * 14;

        // Ensure idToken was issued recently (within 5 mins) before creating a session cookie
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time > 5 * 60) {
            return res.status(401).json({ error: 'Recent login required' });
        }

        // Create the session cookie
        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

        // Set the secure HttpOnly cookie
        const options = {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'strict',
        };

        const cookieValue = `__session=${sessionCookie}; Max-Age=${expiresIn / 1000}; HttpOnly; Secure=${options.secure}; Path=${options.path}; SameSite=${options.sameSite}`;
        res.setHeader('Set-Cookie', cookieValue);

        // --- Store active session in Firestore ---
        try {
            const uid = decodedIdToken.uid;

            // Extract some metadata
            const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
            const userAgent = req.headers['user-agent'] || 'unknown';

            // Decode the session cookie to get its strict issue time, or just use Firestore timestamp
            await admin.firestore().collection('users').doc(uid).collection('active_sessions').add({
                ip,
                userAgent,
                device: deviceInfo || 'Unknown Device',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                lastActive: admin.firestore.FieldValue.serverTimestamp(),
                status: 'active'
                // We won't store the actual cookie here, just metadata allowing the user to view devices
            });
        } catch (dbError) {
            console.error('Failed to log active session to Firestore:', dbError);
            // Non-blocking: we still return success to the user
        }

        return res.status(200).json({ success: true, message: 'Session created successfully' });

    } catch (error: any) {
        console.error('Session creation failed:', error);
        return res.status(401).json({ error: 'UNAUTHORIZED REQUEST!' });
    }
}

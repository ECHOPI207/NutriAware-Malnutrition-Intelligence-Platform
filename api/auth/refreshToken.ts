import { VercelRequest, VercelResponse } from '@vercel/node';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
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
    // CORS
    const origin = req.headers.origin || '';
    const allowedDomains = ['localhost', 'nutriaware', 'vercel.app', 'nutri-aware'];
    if (origin && allowedDomains.some(d => origin.includes(d)) || process.env.NODE_ENV === 'development') {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') return res.status(204).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Parse the __session cookie
        const cookieHeader = req.headers.cookie || '';
        const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
        const sessionCookie = cookies['__session'];

        if (!sessionCookie) {
            return res.status(401).json({ error: 'No session cookie found' });
        }

        // Verify the session cookie
        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);

        // Mint a custom token for the frontend to use in memory
        const customToken = await admin.auth().createCustomToken(decodedClaims.uid);

        return res.status(200).json({ customToken });

    } catch (error) {
        console.error('Session verification failed:', error);
        return res.status(401).json({ error: 'UNAUTHORIZED: Invalid or expired session' });
    }
}

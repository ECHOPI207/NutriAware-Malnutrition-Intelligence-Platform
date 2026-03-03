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
    // CORS setup
    const origin = req.headers.origin || '';
    if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') return res.status(204).end();

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        // Parse the __session cookie
        const cookieHeader = req.headers.cookie || '';
        const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
        const sessionCookie = cookies['__session'];

        if (!sessionCookie) return res.status(401).json({ error: 'No active session' });

        // Verify the session to ensure the requester is authenticated
        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
        const uid = decodedClaims.uid;

        // Revoke all refresh tokens for the user
        // This invalidates all existing session cookies and ID tokens
        await admin.auth().revokeRefreshTokens(uid);

        // Update the status of all sessions in Firestore to 'revoked'
        const sessionsRef = admin.firestore().collection('users').doc(uid).collection('active_sessions');
        const activeSessions = await sessionsRef.where('status', '==', 'active').get();

        const batch = admin.firestore().batch();
        activeSessions.docs.forEach(doc => {
            batch.update(doc.ref, { status: 'revoked', revokedAt: admin.firestore.FieldValue.serverTimestamp() });
        });
        await batch.commit();

        // Clear current session cookie
        const cookieValue = `__session=; Max-Age=0; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; Path=/; SameSite=strict`;
        res.setHeader('Set-Cookie', cookieValue);

        return res.status(200).json({ success: true, message: 'All sessions revoked successfully. You have been logged out.' });
    } catch (error) {
        console.error('Revoke All Failed:', error);
        return res.status(500).json({ error: 'Failed to revoke sessions' });
    }
}

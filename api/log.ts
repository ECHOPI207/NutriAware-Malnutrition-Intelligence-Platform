import { VercelRequest, VercelResponse } from '@vercel/node';
import * as admin from 'firebase-admin';
import crypto from 'crypto';

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
            const serviceAccount = require('../../../admin-sdk.json');
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        }
    } catch (error) {
        console.error('Firebase admin initialization error', error);
    }
}

// Helper to hash IPs for GDPR
const hashIp = (ip: string) => {
    if (!ip || ip === 'unknown') return 'unknown';
    // Salt with a daily rotating string or static env secret to prevent rainbow tables
    const salt = process.env.IP_HASH_SALT || 'nutriaware-salt';
    return crypto.createHash('sha256').update(ip + salt).digest('hex').substring(0, 16);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS setup
    const origin = req.headers.origin || '';
    if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(204).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Enforce authorization via the HttpOnly Session Cookie or Bearer Token
        const cookieHeader = req.headers.cookie || '';
        const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
        const sessionCookie = cookies['__session'];

        let uid = 'anonymous';

        if (sessionCookie) {
            try {
                const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
                uid = decodedClaims.uid;
            } catch (authErr) {
                console.warn('Invalid session cookie in log request');
            }
        }

        const payload = req.body;

        if (!payload.event_type || !payload.event_category) {
            return res.status(400).json({ error: 'Missing required schema fields' });
        }

        // Vercel specific headers for geolocation and IP
        const rawIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket?.remoteAddress || 'unknown';
        const geoCountry = req.headers['x-vercel-ip-country'] || 'Unknown';
        const userAgent = req.headers['user-agent'] || 'unknown';

        const logEntry = {
            user_id: uid,
            session_id: hashIp(rawIp) + '-' + new Date().toISOString().split('T')[0], // Pseudo-session ID
            event_type: payload.event_type,
            event_category: payload.event_category,
            event_metadata: payload.event_metadata || {},
            ip_address: hashIp(rawIp), // Masked!
            user_agent: userAgent,
            device_type: payload.device_type || 'desktop', // Expected from frontend
            geo_country: geoCountry,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            duration_ms: payload.duration_ms || 0
        };

        // Write directly to the global activity_logs collection
        await admin.firestore().collection('activity_logs').add(logEntry);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Logger API Error:', error);
        // Fail silently from the client's perspective to not block main thread
        return res.status(200).json({ success: false, error: 'Internal Logging Error' });
    }
}

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
            // Fallback for local dev
            const serviceAccount = require('../../../../admin-sdk.json');
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        }
    } catch (error) {
        console.error('Firebase admin initialization error', error);
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers for local testing across different ports
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'PATCH') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Basic CSRF Protection: Check Origin or Referer
    const origin = req.headers.origin;
    const referer = req.headers.referer;

    // Allow vercel preview domains, localhost, and custom domain
    const allowedDomains = ['localhost', 'nutriaware', 'vercel.app', 'nutri-aware'];
    const isAllowedOrigin = allowedDomains.some(domain =>
        (origin && origin.includes(domain)) || (referer && referer.includes(domain))
    );

    if (!isAllowedOrigin && (origin || referer)) {
        console.warn(`[Avatar API] Possible CSRF attempt from origin: ${origin}, referer: ${referer}`);
        return res.status(403).json({ error: 'Forbidden: Invalid Origin' });
    }

    try {
        const { id } = req.query;
        const { photoURL } = req.body;

        console.log(`[Avatar API] Request received for user ID: ${id}`);
        console.log(`[Avatar API] Body photoURL length: ${photoURL?.length}`);

        // Enforce a strict 2MB limit on the base64 string
        // Base64 is roughly 33% larger than binary, so 2MB = ~2.66MB string length
        // We'll cap the string length at 2.8 million characters
        const MAX_BASE64_LENGTH = 2800000;
        if (photoURL.length > MAX_BASE64_LENGTH) {
            console.error('[Avatar API] Payload too large');
            return res.status(413).json({ error: 'Payload Too Large (Max 2MB)' });
        }

        if (!id || typeof id !== 'string') {
            console.error('[Avatar API] Missing or invalid user ID');
            return res.status(400).json({ error: 'Missing or invalid user ID' });
        }

        if (!photoURL || typeof photoURL !== 'string' || !photoURL.startsWith('data:image/')) {
            console.error('[Avatar API] Missing or invalid photoURL');
            return res.status(400).json({ error: 'Missing or invalid photoURL (must be base64 data URI)' });
        }

        // Verify authentication
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            console.error('[Avatar API] Unauthorized: Missing Bearer token');
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.split('Bearer ')[1];
        let decodedToken;
        try {
            decodedToken = await admin.auth().verifyIdToken(token);
            console.log(`[Avatar API] Token verified for UID: ${decodedToken.uid}`);
        } catch (error) {
            console.error('[Avatar API] Error verifying token:', error);
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Check if requester is an admin in Firestore
        const requesterDoc = await admin.firestore().collection('users').doc(decodedToken.uid).get();
        if (!requesterDoc.exists || requesterDoc.data()?.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Admin access required' });
        }

        // Update User Auth Profile
        console.log(`[Avatar API] Updating Auth Profile for ${id}`);
        await admin.auth().updateUser(id, {
            photoURL: photoURL
        });

        // Update Firestore User Document
        console.log(`[Avatar API] Updating Firestore User Document for ${id}`);
        await admin.firestore().collection('users').doc(id).update({
            photoURL: photoURL,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // Log the action (we will create this in the activity_logs collection directly)
        console.log(`[Avatar API] Logging activity`);
        await admin.firestore().collection('activity_logs').add({
            actorId: decodedToken.uid,
            actorEmail: decodedToken.email || 'Unknown',
            action: 'ADMIN_AVATAR_UPDATE',
            targetUserId: id,
            details: `Admin updated avatar for user ${id}`,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            ipAddress: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
        });

        console.log(`[Avatar API] Success`);
        return res.status(200).json({ success: true, message: 'Avatar updated successfully', photoURL });
    } catch (error: any) {
        console.error('[Avatar API] Error updating avatar:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

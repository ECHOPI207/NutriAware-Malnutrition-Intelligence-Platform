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

/**
 * Verify if the user has admin permissions
 * @param userId - The user ID to check
 * @returns Promise<boolean> - True if user is admin, false otherwise
 */
async function verifyAdminPermissions(userId: string): Promise<boolean> {
    try {
        const userDoc = await admin.firestore().collection('users').doc(userId).get();
        if (!userDoc.exists) {
            return false;
        }
        const userData = userDoc.data();
        return userData?.role === 'admin' || userData?.isAdmin === true;
    } catch (error) {
        console.error('[verifyAdminPermissions] Error:', error);
        return false;
    }
}

/**
 * Log admin action to activity tracker
 * @param adminId - The admin user ID
 * @param adminEmail - The admin email
 * @param targetUserId - The target user ID
 * @param actionType - The type of action performed
 * @param metadata - Additional metadata
 */
async function logAdminAction(
    adminId: string,
    adminEmail: string,
    targetUserId: string,
    actionType: 'AVATAR_UPDATED' | 'AVATAR_DELETED',
    metadata: Record<string, any>
): Promise<void> {
    try {
        await admin.firestore().collection('activity_logs').add({
            actor_id: adminId,
            actor_email: adminEmail,
            target_user_id: targetUserId,
            action_type: `USER_${actionType}`,
            category: 'profile',
            details: `Admin (${adminEmail}) ${actionType === 'AVATAR_UPDATED' ? 'updated' : 'deleted'} avatar for user ${targetUserId}`,
            metadata: {
                ...metadata,
                timestamp: new Date().toISOString(),
            },
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`[logAdminAction] Logged ${actionType} for user ${targetUserId} by admin ${adminId}`);
    } catch (error) {
        console.error('[logAdminAction] Error logging admin action:', error);
        // Non-blocking - don't throw
    }
}

/**
 * Change user avatar (admin function)
 * @param adminId - The admin user ID
 * @param adminEmail - The admin email
 * @param targetUserId - The target user ID
 * @param photoURL - The new photo URL (base64 data URI)
 * @param requestMetadata - Request metadata (IP, user agent)
 * @returns Promise<string> - The new photo URL
 */
async function changeUserAvatar(
    adminId: string,
    adminEmail: string,
    targetUserId: string,
    photoURL: string,
    requestMetadata: { ip: string; userAgent: string }
): Promise<string> {
    console.log(`[changeUserAvatar] Admin ${adminId} changing avatar for user ${targetUserId}`);
    
    // Verify admin permissions
    const isAdmin = await verifyAdminPermissions(adminId);
    if (!isAdmin) {
        throw new Error('Forbidden: Admin access required');
    }

    // Get target user
    const userRef = admin.firestore().collection('users').doc(targetUserId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
        throw new Error('Target user not found');
    }
    
    const previousAvatar = userDoc.data()?.photoURL || null;

    // Update Auth Profile
    await admin.auth().updateUser(targetUserId, {
        photoURL: photoURL
    });

    // Update Firestore User Document
    const updateData = {
        photoURL: photoURL,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    await userRef.update(updateData);

    // Log admin action
    await logAdminAction(adminId, adminEmail, targetUserId, 'AVATAR_UPDATED', {
        previous_avatar: previousAvatar ? (previousAvatar.length > 100 ? 'data:image/...' : previousAvatar) : null,
        new_avatar: 'data:image/... (truncated)',
        ip: requestMetadata.ip,
        user_agent: requestMetadata.userAgent
    });

    console.log(`[changeUserAvatar] Successfully updated avatar for user ${targetUserId}`);
    return photoURL;
}

/**
 * Delete user avatar (admin function)
 * @param adminId - The admin user ID
 * @param adminEmail - The admin email
 * @param targetUserId - The target user ID
 * @param requestMetadata - Request metadata (IP, user agent)
 * @returns Promise<void>
 */
async function deleteUserAvatar(
    adminId: string,
    adminEmail: string,
    targetUserId: string,
    requestMetadata: { ip: string; userAgent: string }
): Promise<void> {
    console.log(`[deleteUserAvatar] Admin ${adminId} deleting avatar for user ${targetUserId}`);
    
    // Verify admin permissions
    const isAdmin = await verifyAdminPermissions(adminId);
    if (!isAdmin) {
        throw new Error('Forbidden: Admin access required');
    }

    // Get target user
    const userRef = admin.firestore().collection('users').doc(targetUserId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
        throw new Error('Target user not found');
    }
    
    const previousAvatar = userDoc.data()?.photoURL || null;
    
    // Determine default avatar based on user data
    const userData = userDoc.data();
    const defaultAvatar = userData?.gender === 'female' 
        ? '/images/avatar-female.jpg' 
        : '/images/avatar-male.jpg';

    // Update Auth Profile with default avatar
    await admin.auth().updateUser(targetUserId, {
        photoURL: defaultAvatar
    });

    // Update Firestore User Document with default avatar
    const updateData = {
        photoURL: defaultAvatar,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    await userRef.update(updateData);

    // Log admin action
    await logAdminAction(adminId, adminEmail, targetUserId, 'AVATAR_DELETED', {
        previous_avatar: previousAvatar ? (previousAvatar.length > 100 ? 'data:image/...' : previousAvatar) : null,
        default_avatar: defaultAvatar,
        ip: requestMetadata.ip,
        user_agent: requestMetadata.userAgent
    });

    console.log(`[deleteUserAvatar] Successfully deleted avatar for user ${targetUserId}`);
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const origin = req.headers.origin || '';
    const referer = req.headers.referer || '';
    const allowedDomains = ['localhost', 'nutriaware', 'vercel.app', 'nutri-aware'];
    
    const isAllowedOrigin = 
        (origin && allowedDomains.some(domain => origin.includes(domain))) ||
        (referer && allowedDomains.some(domain => referer.includes(domain))) ||
        process.env.NODE_ENV === 'development';

    // CORS headers
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (process.env.NODE_ENV === 'development') {
        res.setHeader('Access-Control-Allow-Origin', '*');
    } else {
        res.setHeader('Access-Control-Allow-Origin', 'https://nutriaware.vercel.app');
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    if (req.method !== 'PATCH' && req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Basic CSRF Protection
    if (!isAllowedOrigin && (origin || referer)) {
        console.warn(`[Avatar API] Possible CSRF attempt from origin: ${origin}, referer: ${referer}`);
        return res.status(403).json({ error: 'Forbidden: Invalid Origin' });
    }

    try {
        // --- AUTHENTICATION ---
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.split('Bearer ')[1];
        let decodedToken;
        try {
            decodedToken = await admin.auth().verifyIdToken(token);
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Request metadata
        const requestMetadata = {
            ip: (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || 'unknown',
            userAgent: (req.headers['user-agent'] as string) || 'unknown'
        };

        // Handle DELETE request (delete avatar)
        if (req.method === 'DELETE') {
            const { userId: targetUserId } = req.body;

            console.log(`[Avatar API DELETE] Request received for user ID: ${targetUserId}`);
            
            if (!targetUserId || typeof targetUserId !== 'string') {
                console.error('[Avatar API DELETE] Missing or invalid user ID');
                return res.status(400).json({ error: 'Missing or invalid user ID' });
            }

            await deleteUserAvatar(
                decodedToken.uid,
                decodedToken.email || 'Unknown',
                targetUserId,
                requestMetadata
            );

            return res.status(200).json({ 
                success: true, 
                message: 'Avatar deleted successfully'
            });
        }

        // Handle PATCH request (update avatar)
        const { userId: targetUserId, photoURL } = req.body;

        console.log(`[Avatar API PATCH] Request received for user ID: ${targetUserId}`);
        
        if (!targetUserId || typeof targetUserId !== 'string') {
            console.error('[Avatar API PATCH] Missing or invalid user ID');
            return res.status(400).json({ error: 'Missing or invalid user ID' });
        }

        if (!photoURL || typeof photoURL !== 'string' || !photoURL.startsWith('data:image/')) {
            console.error('[Avatar API PATCH] Missing or invalid photoURL');
            return res.status(400).json({ error: 'Missing or invalid photoURL (must be base64 data URI)' });
        }

        // --- SECURITY HARDENING: Validation ---
        // 1. Size check (2MB limit for base64)
        const MAX_BASE64_LENGTH = 2800000;
        if (photoURL.length > MAX_BASE64_LENGTH) {
            return res.status(413).json({ error: 'Payload Too Large (Max 2MB)' });
        }

        // 2. MIME type check (Strict)
        const mimeMatch = photoURL.match(/^data:(image\/[a-zA-Z]+);base64,/);
        const mimeType = mimeMatch ? mimeMatch[1] : null;
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!mimeType || !allowedMimes.includes(mimeType)) {
            return res.status(400).json({ error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' });
        }

        // 3. Reject SVG (XSS Protection)
        if (photoURL.includes('image/svg+xml') || photoURL.toLowerCase().includes('<svg')) {
            return res.status(400).json({ error: 'SVG files are prohibited for security reasons.' });
        }

        const newPhotoURL = await changeUserAvatar(
            decodedToken.uid,
            decodedToken.email || 'Unknown',
            targetUserId,
            photoURL,
            requestMetadata
        );

        return res.status(200).json({ 
            success: true, 
            message: 'Avatar updated successfully', 
            photoURL: newPhotoURL
        });
    } catch (error: any) {
        console.error('[Avatar API] Critical Error:', error);
        
        // Return appropriate error status
        if (error.message === 'Forbidden: Admin access required') {
            return res.status(403).json({ error: error.message });
        }
        if (error.message === 'Target user not found') {
            return res.status(404).json({ error: error.message });
        }
        
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

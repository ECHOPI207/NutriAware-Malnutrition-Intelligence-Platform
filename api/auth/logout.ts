import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS setup
    const origin = req.headers.origin || '';
    if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') return res.status(204).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Set cookie to expire immediately
    const cookieValue = `__session=; Max-Age=0; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; Path=/; SameSite=strict`;
    res.setHeader('Set-Cookie', cookieValue);

    return res.status(200).json({ success: true, message: 'Session revoked' });
}

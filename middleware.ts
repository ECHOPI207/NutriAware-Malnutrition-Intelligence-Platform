export const config = {
    matcher: [
        '/api/auth/login',
        '/api/auth/register',
        '/api/auth/session',
        '/api/:path*',
    ],
};

export default function middleware(request: Request) {
    const url = new URL(request.url);

    // Rate limits configuration (Conceptual implementation)
    const rateLimits = {
        '/api/auth/login': { max: 5, windowMs: 15 * 60 * 1000 },
        '/api/auth/register': { max: 10, windowMs: 60 * 60 * 1000 },
        '/api/geo': { max: 100, windowMs: 60 * 1000 },
    };

    // Clone the response to inject headers
    const response = new Response(null, {
        headers: {
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' https://apis.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://firestore.googleapis.com"
        }
    });

    // Pass through original request or handle logic
    response.headers.set('x-middleware-next', '1');

    return response;
}

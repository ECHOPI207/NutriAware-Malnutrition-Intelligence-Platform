import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel Serverless Function: /api/geo
 * 
 * Returns the visitor's geographic location using Vercel's built-in
 * geo headers. No external API needed — 100% reliable, no CORS issues.
 * 
 * Vercel automatically injects these headers on every request:
 *   x-vercel-ip-city, x-vercel-ip-country, x-vercel-ip-country-region
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
    const city = (req.headers['x-vercel-ip-city'] as string) || 'Unknown';
    const country = (req.headers['x-vercel-ip-country'] as string) || 'Unknown';
    const region = (req.headers['x-vercel-ip-country-region'] as string) || '';

    // Decode URI-encoded city names (Vercel encodes them)
    const decodedCity = decodeURIComponent(city);

    // Map country codes to Arabic-friendly names
    const countryNames: Record<string, string> = {
        'EG': 'Egypt',
        'SA': 'Saudi Arabia',
        'AE': 'United Arab Emirates',
        'JO': 'Jordan',
        'KW': 'Kuwait',
        'QA': 'Qatar',
        'BH': 'Bahrain',
        'OM': 'Oman',
        'IQ': 'Iraq',
        'LB': 'Lebanon',
        'PS': 'Palestine',
        'SY': 'Syria',
        'YE': 'Yemen',
        'LY': 'Libya',
        'TN': 'Tunisia',
        'DZ': 'Algeria',
        'MA': 'Morocco',
        'SD': 'Sudan',
        'US': 'United States',
        'GB': 'United Kingdom',
        'DE': 'Germany',
        'FR': 'France',
        'TR': 'Turkey',
    };

    const countryName = countryNames[country] || country;

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
        city: decodedCity,
        country: countryName,
        countryCode: country,
        region,
    });
}

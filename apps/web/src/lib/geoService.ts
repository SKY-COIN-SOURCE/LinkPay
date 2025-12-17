import { supabase } from './supabaseClient';

// ========================================
// GEO SERVICE - IP-BASED GEOLOCATION
// Works with private browsing since it's IP-based
// ========================================

export interface GeoData {
    country: string;
    countryCode: string;
    city: string;
    device: string;
    browser: string;
    ip: string;
}

// Cache geo data to avoid multiple API calls in same session
let cachedGeoData: GeoData | null = null;

// Parse device from user agent
function parseDevice(ua: string): string {
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
    if (/Mobile|Android|iPhone|iPod|IEMobile|BlackBerry|Opera Mini|Windows Phone/i.test(ua)) return 'Mobile';
    return 'Desktop';
}

// Parse browser from user agent
function parseBrowser(ua: string): string {
    if (/Edg/i.test(ua)) return 'Edge';
    if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return 'Chrome';
    if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
    if (/Firefox/i.test(ua)) return 'Firefox';
    if (/Opera|OPR/i.test(ua)) return 'Opera';
    if (/MSIE|Trident/i.test(ua)) return 'IE';
    return 'Unknown';
}

// Get geo data using free IP geolocation APIs
// Falls back through multiple services for reliability
export async function getGeoData(): Promise<GeoData> {
    // Return cached data if available
    if (cachedGeoData) {
        return cachedGeoData;
    }

    const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
    const device = parseDevice(ua);
    const browser = parseBrowser(ua);

    const defaultData: GeoData = {
        country: 'Unknown',
        countryCode: 'XX',
        city: 'Unknown',
        device,
        browser,
        ip: '0.0.0.0',
    };

    try {
        // Primary: ip-api.com (free, no API key needed)
        // Works with private browsing since it's server-side IP detection
        const response = await fetch('http://ip-api.com/json/?fields=status,country,countryCode,city,query', {
            method: 'GET',
            cache: 'no-store', // Don't cache to always get fresh IP
        });

        if (response.ok) {
            const data = await response.json();
            if (data.status === 'success') {
                cachedGeoData = {
                    country: data.country || 'Unknown',
                    countryCode: data.countryCode || 'XX',
                    city: data.city || 'Unknown',
                    device,
                    browser,
                    ip: data.query || '0.0.0.0',
                };
                return cachedGeoData;
            }
        }
    } catch (e) {
        console.warn('[GeoService] Primary API failed, trying fallback...', e);
    }

    try {
        // Fallback 1: ipapi.co (free tier)
        const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            cache: 'no-store',
        });

        if (response.ok) {
            const data = await response.json();
            if (data.country_name) {
                cachedGeoData = {
                    country: data.country_name || 'Unknown',
                    countryCode: data.country_code || 'XX',
                    city: data.city || 'Unknown',
                    device,
                    browser,
                    ip: data.ip || '0.0.0.0',
                };
                return cachedGeoData;
            }
        }
    } catch (e) {
        console.warn('[GeoService] Fallback 1 failed, trying fallback 2...', e);
    }

    try {
        // Fallback 2: ipify + country from Supabase Edge Function (if available)
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (ipResponse.ok) {
            const { ip } = await ipResponse.json();
            defaultData.ip = ip;

            // Try to get country from another free service using the IP
            const geoResponse = await fetch(`https://ipwhois.app/json/${ip}`);
            if (geoResponse.ok) {
                const geoData = await geoResponse.json();
                cachedGeoData = {
                    country: geoData.country || 'Unknown',
                    countryCode: geoData.country_code || 'XX',
                    city: geoData.city || 'Unknown',
                    device,
                    browser,
                    ip,
                };
                return cachedGeoData;
            }
        }
    } catch (e) {
        console.warn('[GeoService] All APIs failed, using defaults', e);
    }

    // Cache the default data too to avoid repeated failed calls
    cachedGeoData = defaultData;
    return defaultData;
}

// Get just the IP for anti-fraud (lightweight)
export async function getClientIP(): Promise<string> {
    if (cachedGeoData) {
        return cachedGeoData.ip;
    }

    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (response.ok) {
            const { ip } = await response.json();
            return ip;
        }
    } catch (e) {
        console.warn('[GeoService] IP fetch failed', e);
    }

    return '0.0.0.0';
}

// Reset cache (for testing or after long sessions)
export function resetGeoCache(): void {
    cachedGeoData = null;
}

// Export type for use in other files
export const GeoService = {
    getGeoData,
    getClientIP,
    resetGeoCache,
    parseDevice,
    parseBrowser,
};

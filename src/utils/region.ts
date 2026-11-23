export type PaystackCountryCode = 'NG' | 'GH' | 'KE' | 'ZA' | 'CI';

export const PAYSTACK_COUNTRY_NAMES: Record<PaystackCountryCode, string> = {
    NG: 'Nigeria',
    GH: 'Ghana',
    KE: 'Kenya',
    ZA: 'South Africa',
    CI: "Côte d'Ivoire",
};

const TIMEZONE_TO_PAYSTACK_COUNTRY: Record<string, PaystackCountryCode> = {
    'Africa/Lagos': 'NG',
    'Africa/Accra': 'GH',
    'Africa/Nairobi': 'KE',
    'Africa/Johannesburg': 'ZA',
    'Africa/Abidjan': 'CI',
};

const SUPPORTED_COUNTRY_CODES = new Set<string>(Object.keys(PAYSTACK_COUNTRY_NAMES));

/**
 * Detect whether the visitor appears to be in one of the Paystack-supported
 * African markets (NG, GH, KE, ZA, CI) using browser timezone first, with
 * navigator locale region subtags as a fallback.
 */
export function getPaystackCountryCode(): PaystackCountryCode | null {
    try {
        if (typeof Intl !== 'undefined') {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (timeZone && timeZone in TIMEZONE_TO_PAYSTACK_COUNTRY) {
                return TIMEZONE_TO_PAYSTACK_COUNTRY[timeZone];
            }
        }

        if (typeof navigator !== 'undefined') {
            const locales = navigator.languages?.length ? navigator.languages : [navigator.language];
            for (const locale of locales) {
                if (!locale) continue;
                const match = locale.match(/[-_]([A-Za-z]{2})\b/);
                const region = match?.[1]?.toUpperCase();
                if (region && SUPPORTED_COUNTRY_CODES.has(region)) {
                    return region as PaystackCountryCode;
                }
            }
        }
    } catch {
        // Fall back to directing to the mobile app stores if locale APIs are unavailable
    }

    return null;
}

export function isPaystackSupportedRegion(): boolean {
    return getPaystackCountryCode() !== null;
}

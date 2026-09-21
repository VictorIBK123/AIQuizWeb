export interface LastSeenPayload {
    authProvider: 'google' | 'email';
    timeStamp: Date;
    location: string;
    platform: 'android' | 'web' | 'manual';
    device: string;
}

/**
 * Retrieves GPS coordinates using browser Geolocation API.
 * Times out after 3 seconds so login/register is never blocked if user ignores prompt.
 */
export const getBrowserLocation = (): Promise<string> => {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve('');
            return;
        }

        const timer = setTimeout(() => {
            resolve('');
        }, 3000);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                clearTimeout(timer);
                const { latitude, longitude } = position.coords;
                resolve(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            },
            (error) => {
                clearTimeout(timer);
                console.log('[GPS Web] Geolocation unavailable or denied:', error.message);
                resolve('');
            },
            { timeout: 3000, maximumAge: 60000, enableHighAccuracy: true }
        );
    });
};

export const getBrowserDevice = (): string => {
    const ua = navigator.userAgent || '';
    if (/android/i.test(ua)) return 'Android Browser';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS Safari';
    if (/Windows/i.test(ua)) return 'Windows PC';
    if (/Macintosh|Mac OS X/i.test(ua)) return 'Mac';
    if (/Linux/i.test(ua)) return 'Linux';
    return 'Web Browser';
};

export const getWebLastSeenPayload = async (authProvider: 'google' | 'email'): Promise<LastSeenPayload> => {
    const location = await getBrowserLocation();
    const device = getBrowserDevice();

    return {
        authProvider,
        timeStamp: new Date(),
        location,
        platform: 'web',
        device,
    };
};

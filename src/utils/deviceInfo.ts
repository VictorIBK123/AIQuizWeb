export interface LastLoginPayload {
    authProvider: 'google' | 'email';
    timeStamp: Date;
    platform: 'web';
    device: string;
}

export const getBrowserDevice = (): string => {
    const ua = navigator.userAgent || '';
    if (/android/i.test(ua)) return 'Android Browser';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS Safari';
    if (/Windows/i.test(ua)) return 'Windows PC';
    if (/Macintosh|Mac OS X/i.test(ua)) return 'Mac';
    if (/Linux/i.test(ua)) return 'Linux';
    return 'Web Browser';
};

export const getWebLastLoginPayload = (authProvider: 'google' | 'email'): LastLoginPayload => {
    const device = getBrowserDevice();

    return {
        authProvider,
        timeStamp: new Date(),
        platform: 'web',
        device,
    };
};

import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { baseUrl as BASE_URL } from '../constants';
import * as SecureStore from 'expo-secure-store';
import { showToast } from '../utils/ToastShow';
import { logout } from './authService';
import { timeout } from '../constants';

// Define the shape of your token response
interface TokenResponse {
    accessToken: string;
    // add other fields if your API returns them (e.g., refreshToken)
}
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * 1. Refresh Logic
 * The 'failedRequest' is the error object from the rejected promise
 */
const refreshAuthLogic = async (failedRequest: any) => {
    console.log('failed request', failedRequest?.response?.data?.message, await SecureStore.getItemAsync('ACCESS_TOKEN'))
    const refreshToken = await SecureStore.getItemAsync('REFRESH_TOKEN') ?? '';
    console.log('Attempting to refresh token with refresh token:', refreshToken);
    if (!refreshToken) {
        // showToast('error', 'Session expired. Please log in again.');
        return Promise.reject('No refresh token');
    }
    // Use a fresh axios instance for the refresh call to avoid infinite loops
    return axios
        .post<TokenResponse>(`${BASE_URL}/auth/refresh`, {
            refreshToken,
            timeout
        })
        .then(async (tokenRefreshResponse: AxiosResponse<TokenResponse>) => {
            const { accessToken } = tokenRefreshResponse.data;
            console.log('Token refreshed successfully:', accessToken);

            await SecureStore.setItemAsync('ACCESS_TOKEN', accessToken);

            // Update the header for the original request that failed
            if (failedRequest.response.config.headers) {
                failedRequest.response.config.headers['Authorization'] = `Bearer ${accessToken}`;
            }

            return Promise.resolve();
        })
        .catch(async (err) => {
            console.error('Token refresh failed:', err.response?.data || err.message);
            // If refresh fails, clear storage and handle logout
            showToast('error', 'Session expired. Please log in again.');
            await SecureStore.deleteItemAsync('ACCESS_TOKEN');
            await SecureStore.deleteItemAsync('REFRESH_TOKEN');
            logout();
            return Promise.reject(err);
        });
};

/**
 * 2. Instantiate the interceptor
 */
createAuthRefreshInterceptor(api, refreshAuthLogic, {
    statusCodes: [401],
    pauseInstanceWhileRefreshing: true,
    skipWhileRefreshing: true
});

/**
 * 3. Request interceptor to attach token
 */
api.interceptors.request.use(
    async (config: AxiosRequestConfig): Promise<any> => {
        const token = await SecureStore.getItemAsync('ACCESS_TOKEN') ?? '';

        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
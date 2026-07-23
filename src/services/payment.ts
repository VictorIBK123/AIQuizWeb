import axios from 'axios';
import { baseUrl } from '../constants';

const authHeaders = (token: string) => {
    return token ? { Authorization: `Bearer ${token}` } : {};
};



export const subscribe = (token: string) =>
    axios.request({
        method: 'POST',
        url: `${baseUrl}/payment/subscribe`,
        headers: authHeaders(token),
    });

export const charge = (token: string) =>
    axios.request({
        method: 'POST',
        url: `${baseUrl}/payment/charge?from=WEB`,
        headers: authHeaders(token),
    });


import { useContext, useState } from 'react';
import { charge, subscribe } from '../services/payment';
import { authContext } from '../Context/context';

type ChargeResponseData = { 
    data:{
        authorization_url: string;
        access_code: string;
        reference: string;
    }
};

type SubscribeResponseData = {
    data: {
        customer: number;
        plan: number;
        status: string;
        subscription_code: string;
        [key: string]: any;
    }
};

type PaymentResult =
    | { data: SubscribeResponseData | ChargeResponseData; error: null }
    | { data: null; error: string };

export const usePayment = () => {
    const { accessToken: token } = useContext(authContext);
    const [errorSubscribing, setErrorSubscribing] = useState<string>('');
    const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

    const subscribeFunc = async (): Promise<PaymentResult> => {
        setIsSubscribing(true);
        setErrorSubscribing('');
        try {
            const response = await subscribe(token!);
            return { data: response.data as SubscribeResponseData, error: null };
        } catch (error: any) {
            const code = error?.response?.data?.code;

            if (code === 'customer_not_found' || code === 'no_active_authorizations_for_customer') {
                try {
                    console.log('Attempting to charge the use.');
                    const response = await charge(token!);
                    console.log('Charge response:', response.data);
                    return { data: response.data as ChargeResponseData, error: null };
                } catch (chargeError: any) {
                    const message = chargeError?.response?.data?.message ?? 'An error occurred while charging. Please try again.';
                    setErrorSubscribing(message);
                    return { data: null, error: message };
                }
            }

            const message =
                code === 'duplicate_subscription'
                    ? (error?.response?.data?.message ?? 'You already have an active subscription.')
                    : (error?.response?.data?.message ?? 'An error occurred while subscribing. Please try again.');
            setErrorSubscribing(message);
            return { data: null, error: message };
        } finally {
            setIsSubscribing(false);
        }
    };

    return { subscribeFunc, errorSubscribing, isSubscribing };
};
import axios from 'axios';
import { baseUrl } from '../constants';

const authHeaders = (token: string) => {
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export type AgeRange = 'Under 12' | '12 to 18' | '19 to 25' | '26 to 35' | '36 to 50' | '51 and above'
export type Gender = 'Male' | 'Female' | 'Prefer not to say'
export type Status = 'Primary School Student' | 'High School Student' | 'Undergraduate Student' | 'Graduate Student' | 'Professional' | 'Other'

export type Profile = {
    name?: string
    ageRange?: AgeRange
    bio?: string
    status?: Status
    gender?: Gender
    avatarUrl?: string
}

export type ProfileData = {
    success: boolean
    data: {
        isPremium: boolean
        subscription: any
        remainingGenerations: {
            count: number
            date: Date
        }
        profile: Profile
        email: string
        name: string
        topicInterests: string[]
        overallPerformance: number
        totalQuizzesTaken: number
    }
}

export const getProfileData = async (token: string): Promise<ProfileData> => {
    const response = await axios.request({
        url: `${baseUrl}/profile`,
        method: 'GET',
        headers: authHeaders(token),
    });
    console.log('response data for profile:', response.data);
    return response.data;
};
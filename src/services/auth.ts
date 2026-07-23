import axios from "axios"
import { baseUrl, timeout } from "../constants"


export const loginWithEmailService = async (email: string, password: string) => {
    console.log('login service called with email:', email)
    const result = await axios.request({
        url: `${baseUrl}/auth/login`,
        method: 'POST',
        timeout: timeout,
        data: {
            email,
            password
        },
    })
    console.log('login service response:', result.data)
    return result.data
}

export const registerWithEmailService = async (name: string, email: string, password: string) => {
    const result = await axios.request({
        url: `${baseUrl}/auth/register`,
        method: 'POST',
        timeout,
        data: {
            name,
            email,
            password
        }
    })
    return result.data
}

export const sendEmailVerificationCode = async (email: string) => {
    const result = await axios.request({
        url: `${baseUrl}/auth/sendVerificationCode`,
        timeout: timeout,
        method: 'POST',
        data: {
            email
        }
    })
    return result.data
}

export const confirmVerificationCodeService = async (email: string, code: string) => {
    const result = await axios.request({
        url: `${baseUrl}/auth/confirmVerificationCode`,
        method: 'POST',
        timeout: timeout,
        data: {
            email,
            code
        }
    })
    return result.data
}

export const resetPasswordService = async (email: string, code: string, newPassword: string) => {
    const result = await axios.request({
        url: `${baseUrl}/auth/resetPassword`,
        method: 'PATCH',
        data: {
            email,
            code,
            newPassword
        }
    })
    return result.data
}
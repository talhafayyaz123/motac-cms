import { signIn, signOut } from 'next-auth/react';

import { apiClient } from './apiClient';
export type AuthRequestType =
  | 'login'
  | 'requestOtp'
  | 'resetPassword'
  | 'verifyOtp';

interface AuthRequestData {
  email?: string;
  password?: string;
  newPassword?: string;
  otp?: string;
  userAgent?: string;
}

export async function handleAuthRequest(
  type: AuthRequestType,
  data: AuthRequestData,
) {
  try {
    let response;
    let result;

    switch (type) {
      case 'login':
        result = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        if (result?.ok) {
          return { success: true };
        } else {
          return { success: false, error: result?.error };
        }

      case 'requestOtp':
        response = await apiClient('/otps/request', {
          method: 'POST',
          body: JSON.stringify({
            email: data.email,
            userAgent: data.userAgent,
          }),
        });

        if (response) {
          return { success: true };
        } else {
          return { success: false, error: 'Failed to request OTP.' };
        }

      case 'resetPassword':
        response = await apiClient('/auth/reset/password', {
          method: 'POST',
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            newPassword: data.newPassword,
            otp: data.otp,
          }),
        });
        if (response) {
          return { success: true };
        } else {
          return { success: false, error: 'Failed to reset password.' };
        }

      case 'verifyOtp':
        response = await apiClient('/otps/verify', {
          method: 'POST',
          body: JSON.stringify({ email: data.email, otp: data.otp }),
        });
        if (response) {
          return { success: true };
        } else {
          return { success: false, error: 'Invalid OTP.' };
        }

      default:
        return { success: false, error: 'Invalid request type' };
    }
  } catch (error) {
    const typedError = error as Error;
    console.error('errors in call:', typedError);

    return {
      success: false,
      error:
        typedError?.message ||
        'An unexpected error occurred. Please try again.',
    };
  }
}

export async function logout() {
  try {
    await signOut({ redirect: false });
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
}

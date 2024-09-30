import { getSession, signIn, signOut } from 'next-auth/react';

import { apiClient } from './apiClient';

const backendApiUrl =
  'http://cms-api-motac.ap-south-1.elasticbeanstalk.com/api/v1';

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

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
): Promise<any> => {
  const session = await getSession();

  const authHeaders: Record<string, string> = (session as any)?.accessToken
    ? {
        Authorization: `Bearer ${(session as any).accessToken}`,
      }
    : {};

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...authHeaders,
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${backendApiUrl}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const fetchDestinations = async (typeId: number): Promise<any[]> => {
  try {
    const result = await fetchWithAuth(`/destinations?typeId=${typeId}`, {
      method: 'GET',
    });

    const tagColors = ['#E7ECFC', '#E3EFF8', '#E3F7F8'];
    const transformedData = result?.data?.map((item: any) => ({
      Select: '',
      'Attraction ID': item.displayId,
      'Attraction Name': item.title || '',
      'Attraction Category': item.destinationCategoryName || '',
      'Attraction City': item.cityName,
      Tags: item.tags
        ? item.tags.map((tag: any) => ({
            name: tag.name,
            color: tagColors[Math.floor(Math.random() * tagColors.length)],
          }))
        : [],
      Priority: item.priorityName || 'none',
      Edit: 'Edit',
      Delete: 'Delete',
    }));

    return transformedData;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

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

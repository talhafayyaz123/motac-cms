import { getSession, signOut } from 'next-auth/react';

const backendApiUrl = 'https://cms.api.motac-dev.com/api/v1';

async function getAccessToken(): Promise<string | null> {
  const session = await getSession();
  return session ? (session as any).accessToken : null;
}
const authEndpoints = [
  '/auth/login',
  '/otps/request',
  '/auth/forgot/password',
  '/otps/verify',
];

async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await fetch(`${backendApiUrl}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Refresh Token Error:', error);
    return false;
  }
}

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
  isFileUpload?: boolean;
}

export const apiClient = async (
  endpoint: string,
  options: FetchOptions = {},
) => {
  try {
    const accessToken = await getAccessToken();

    const defaultHeaders: Record<string, string> = {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    if (!options.isFileUpload) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    const config: FetchOptions = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    let response = await fetch(`${backendApiUrl}${endpoint}`, config);

    if (!response.ok) {
      if (response.status === 401) {
        const tokenRefreshed = await refreshAccessToken();
        if (tokenRefreshed) {
          const newAccessToken = await getAccessToken();
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
          response = await fetch(`${backendApiUrl}${endpoint}`, config);
        } else {
          await signOut();
        }
      }
      if (!response.ok) {
        const data = await response.json();
        const errorMessages = data.errors
          ? Object.values(data.errors).flat().join(', ')
          : data.message || 'Invalid Input';
        throw new Error(errorMessages);
      }
    }

    if (response.status === 204 || response.statusText === 'No Content') {
      return;
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

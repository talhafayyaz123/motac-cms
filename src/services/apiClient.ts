import { getSession, signOut } from 'next-auth/react';

const backendApiUrl = 'https://cms.api.motac-dev.com/api/v1';

const authEndpoints = [
  '/auth/login',
  '/otps/request',
  '/auth/forgot/password',
  '/otps/verify',
];

async function getAccessToken() {
  const session = await getSession();
  if (!(session as any)) return null;

  return (session as any).accessToken;
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

    const response = await fetch(`${backendApiUrl}${endpoint}`, config);

    if (!response.ok) {
      if (response.status === 401 && !authEndpoints.includes(endpoint)) {
        await signOut();
      }
      const data = await response.json();
      const errorMessages = data.errors
        ? Object.values(data.errors).flat().join(', ')
        : data.message || 'Invalid Input';
      throw new Error(errorMessages);
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

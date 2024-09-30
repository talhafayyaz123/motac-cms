import { getSession } from 'next-auth/react';
const backendApiUrl =
  'http://cms-api-motac.ap-south-1.elasticbeanstalk.com/api/v1';

async function getAccessToken(): Promise<string | null> {
  const session = await getSession();
  return session ? (session as any).accessToken : null;
}

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const apiClient = async (
  endpoint: string,
  options: FetchOptions = {},
) => {
  try {
    const accessToken = await getAccessToken();

    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    const config: FetchOptions = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(`${backendApiUrl}${endpoint}`, config);

    if (!response.ok) {
      const data = await response.json();
      const errorMessages = data.errors
        ? Object.values(data.errors).flat().join(', ')
        : data.message || 'Invalid Input';
      throw new Error(errorMessages);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

import { getSession, signIn, signOut } from 'next-auth/react';

const backendApiUrl = 'https://cms.api.motac-dev.com/api/v1';
const REFRESH_THRESHOLD = 20; // 20 seconds before expiry

async function refreshAccessToken(): Promise<boolean> {
  try {
    const session = await getSession(); // Get the current session
    if (!session || !session?.refreshToken) {
      throw new Error('No refresh token available');
    }

    const refreshToken = session?.refreshToken; // Extract the refresh token

    const response = await fetch(`${backendApiUrl}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${refreshToken}`, // Send refresh_token in Authorization header
        'Content-Type': 'application/json',
      },
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

async function getAccessToken(): Promise<string | null> {
  const session = await getSession();
  console.log(session);

  if (!session || !session.accessToken || !session.expires) {
    console.log('Session is missing or invalid');
    return null;
  }

  const expirationTime = new Date(session.tokenExpires).getTime();

  const currentTime = Date.now();

  const remainingTime = (expirationTime - currentTime) / 1000; // In seconds
  console.log('Remaining Time (seconds):', remainingTime);

  // Check if token is about to expire
  if (remainingTime <= REFRESH_THRESHOLD) {
    console.log('Token is about to expire, refreshing...');
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      session.accessToken = newAccessToken;
      await signIn('credentials', { accessToken: newAccessToken });
      return newAccessToken;
    } else {
      // If refresh failed, sign out the user
      await signOut();
      return null;
    }
  }

  // Return the current access token if it's still valid
  return session.accessToken;
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

// const backendApiUrl = 'https://cms.api.motac-dev.com/api/v1';

// const REFRESH_THRESHOLD = 20; // 20 seconds before expiry

// async function refreshAccessToken() {
//   try {
//     const response = await fetch(`${backendApiUrl}/auth/refresh`, {
//       method: 'POST',
//       credentials: 'include', // Adjust based on your refresh API
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return data.accessToken; // Assuming the new token is returned here
//     } else {
//       throw new Error('Failed to refresh access token');
//     }
//   } catch (error) {
//     console.error('Token refresh error:', error);
//     return null;
//   }
// }

// async function getAccessToken(): Promise<string | null> {
//   const session = await getSession();
//   if (!session || !session.accessToken || !session.expires) {
//     return null;
//   }

//   const expirationTime = new Date(session.expires).getTime();
//   const currentTime = Date.now();
//   const remainingTime = (expirationTime - currentTime) / 1000; // In seconds

//   // Check if token is about to expire
//   if (remainingTime <= REFRESH_THRESHOLD) {
//     console.log('Token is about to expire, refreshing...');
//     const newAccessToken = await refreshAccessToken();

//     if (newAccessToken) {
//       session.accessToken = newAccessToken; // Optionally, update session here if needed
//       // Update the token in NextAuth
//       await signIn('credentials', { accessToken: newAccessToken }); // Re-authenticate to update the session
//       return newAccessToken;
//     } else {
//       // If refresh failed, sign out the user
//       await signOut();
//       return null;
//     }
//   }

//   return session.accessToken;
// }

// Your existing apiClient function below...

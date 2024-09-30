import { signIn, signOut } from 'next-auth/react';

import { formatDate } from '@/helpers/utils/utils';

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

export const fetchDestinations = async (
  typeId: number,
  searchValue: string = '',
): Promise<any[]> => {
  try {
    const result = await apiClient(
      `/destinations?typeId=${typeId}&search=${searchValue}`,
      {
        method: 'GET',
      },
    );

    const tagColors = ['#E7ECFC', '#E3EFF8', '#E3F7F8'];

    const transformedData = result?.data?.map((item: any) => {
      const baseData = {
        destinationId: item.id,
        Select: '',
        'ID ': item.displayId,
        'Name ': item.title || '',
        'Category ': item.destinationCategoryName || '',
        'City ': item.cityName,
        Tags: item.tags
          ? item.tags.map((tag: any) => ({
              name: tag.name,
              color: tagColors[Math.floor(Math.random() * tagColors.length)],
            }))
          : [],
        Priority: item.priorityName || 'none',
        Edit: 'Edit',
        Delete: 'Delete',
      };

      if (typeId === 3) {
        return {
          ...baseData,
          'Event Date': formatDate(item.happeningEndDate) || '',
        };
      }

      return baseData;
    });

    return transformedData;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

export const fetchPriorities = async () => {
  try {
    const result = await apiClient(`/destinations/priorities`, {
      method: 'GET',
    });

    const priorities = result?.map((item: any) => ({
      value: item.name,
      label: item.name,
      priorityId: item.id,
    }));
    return priorities;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

export const updateDestinationPriority = async (
  priorityId: number,
  displayId: string,
) => {
  try {
    const response = await apiClient(
      `/destinations/${displayId}/priority/${priorityId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ displayId, priorityId }),
      },
    );

    if (!response?.id) {
      throw new Error('Failed to update destination priority');
    }
    return response;
  } catch (error) {
    console.error('Error updating priority:', error);
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

///My Team Apis
export const fetchTeam = async (): Promise<any[]> => {
  try {
    const result = await apiClient(`/cms/users`, {
      method: 'GET',
    });

    const transformedData = result?.data?.map((item: any) => {
      const baseData = {
        Select: '',
        ID: item.id,
        'First Name': item.firstName || '',
        'Last Name': item.lastName || '',
        'Email Address': item.email,
        Role: item.role || '',
        Designation: item.designation || '',
        Edit: 'Edit',
        Delete: 'Delete',
      };

      return baseData;
    });

    return transformedData;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

export const deleteDestination = async (displayId: string) => {
  try {
    const response = await apiClient(`/destinations/${displayId}`, {
      method: 'DELETE',
      body: JSON.stringify({ displayId }),
    });

    // Check for successful deletion
    if (!response?.id) {
      throw new Error('Failed to delete destination');
    }
    return response;
  } catch (error) {
    console.error('Error deleting destination:', error);

    // Throw an error with a user-friendly message
    throw new Error(
      'There was an error deleting the destination. Please try again.',
    );
  }
};

export const fetchRecommendationTags = async (): Promise<any[]> => {
  try {
    const result = await apiClient(`/destinations/recommendation/tags`, {
      method: 'GET',
    });

    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

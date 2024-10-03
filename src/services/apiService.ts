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
  currentPage: number = 1,
  perPage: number = 10,
  searchValue: string = '',
): Promise<{ data: any[]; total: number }> => {
  try {
    // Build the query string
    const queryParams = new URLSearchParams({
      typeId: typeId.toString(),
      page: currentPage.toString(),
      limit: perPage.toString(),
    });

    // Only add search parameter if searchValue is not an empty string
    if (searchValue) {
      queryParams.append('search', searchValue);
    }

    const result = await apiClient(
      `/destinations?${queryParams.toString()}`, // Use built query parameters
      {
        method: 'GET',
      },
    );

    const tagColors = ['#E7ECFC', '#E3EFF8', '#E3F7F8'];

    const transformedData = result?.data?.map((item: any) => {
      const baseData = {
        'ID ': item.displayId,
        'Name ': item.title || '',
        'Category ': item.destinationCategoryName || '',
        'City ': item.cityName,
        Tags: item.tags
          ? item.tags.map((tag: any) => ({
              id: tag.id,
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
          'Event Start Date': formatDate(item.happeningStartDate) || '',
          'Event End Date': formatDate(item.happeningEndDate) || '',
        };
      }

      return baseData;
    });

    return {
      data: transformedData,
      total: result?.totalRecords || 0, // Assuming the API response includes totalRecords
    };
  } catch (error) {
    console.error('An error occurred:', error);
    return { data: [], total: 0 }; // Return an empty array and zero total records on error
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

export const fetchTeam = async (
  pageNumber = 1,
  itemsPerPage = 10,
): Promise<any> => {
  try {
    const result = await apiClient(
      `/cms/users?page=${pageNumber}&limit=${itemsPerPage}`,
      {
        method: 'GET',
      },
    );

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

    return { data: transformedData, total: result.totalRecords };
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

export const fetchSpecificTeamMember = async (id: number): Promise<any> => {
  try {
    const result = await apiClient(`/cms/users/${id}`, {
      method: 'GET',
    });

    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

export const fetchTeamRoles = async (): Promise<any[]> => {
  try {
    const data = await apiClient(`/cms/users/roles`, {
      method: 'GET',
    });

    const transformedData = data?.map((item: any) => ({
      value: item?.id,
      label: item?.name,
    }));

    return transformedData;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

export const fetchTeamDesignations = async (): Promise<any[]> => {
  try {
    const data = await apiClient(`/cms/users/designations`, {
      method: 'GET',
    });

    const transformedData = data?.map((item: any) => ({
      value: item?.id,
      label: item?.name,
    }));

    return transformedData;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

export const fetchTeamStatuses = async (): Promise<any[]> => {
  try {
    const data = await apiClient(`/cms/users/statuses`, {
      method: 'GET',
    });

    const transformedData = data?.map((item: any) => ({
      value: item?.id,
      label: item?.name,
    }));

    return transformedData;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

export const AddTeamMember = async (
  payload: any,
): Promise<any[] | { error: string }> => {
  try {
    const data = await apiClient(`/cms/users`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return data;
  } catch (err) {
    const typedError = err as Error;
    return { error: typedError.message };
  }
};

export const DeleteTeamMember = async (id: number) => {
  try {
    const response = await apiClient(`/cms/users/${id}`, {
      method: 'DELETE',
    });
    console.log(response);
  } catch (err) {
    const typedError = err as Error;
    return { error: typedError.message };
  }
};

export const UpdateTeamMember = async (
  payload: any,
): Promise<any[] | { error: string }> => {
  try {
    const data = await apiClient(`/cms/users/${payload.id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload.data),
    });
    return data;
  } catch (err) {
    const typedError = err as Error;
    return { error: typedError.message };
  }
};

export const FetchUsers = async (
  pageNumber = 1,
  itemsPerPage = 10,
  search = '',
): Promise<{ data: any[]; total: number }> => {
  try {
    const result = await apiClient(
      `/app/users?page=${pageNumber}&limit=${itemsPerPage}&search=${search}`,
      {
        method: 'GET',
      },
    );

    const transformedData = result?.data?.map((item: any) => ({
      Select: '',
      'User ID': item?.displayId,
      'First Name': item?.firstName,
      'Last Name': item?.lastName,
      Email: item?.email,
      'Phone Number': item?.phoneNumber,
      Nationality: item?.nationality,
      Action: 'View',
      'Reset Link': 'Send Reset Password Link',
    }));

    return { data: transformedData, total: result.totalRecords };
  } catch (error) {
    console.error('An error occurred:', error);
    return { data: [], total: 0 };
  }
};

export const FetchDeletedUsers = async (
  pageNumber = 1,
  itemsPerPage = 10,
  search = '',
): Promise<{ data: any[]; total: number }> => {
  try {
    const result = await apiClient(
      `/app/users?page=${pageNumber}&limit=${itemsPerPage}&search=${search}&isDeleted=true`,
      {
        method: 'GET',
      },
    );

    const transformedData = result?.data?.map((item: any) => ({
      Select: '',
      'User ID': item?.displayId,
      'First Name': item?.firstName,
      'Last Name': item?.lastName,
      Email: item?.email,
      'Phone Number': item?.phoneNumber,
      Nationality: item?.nationality,
    }));

    return { data: transformedData, total: result.totalRecords };
  } catch (error) {
    console.error('An error occurred:', error);
    return { data: [], total: 0 };
  }
};

export const DeleteActiveMember = async (id: number) => {
  try {
    const response = await apiClient(`/app/users/${id}`, {
      method: 'DELETE',
    });
    return response;
  } catch (err) {
    const typedError = err as Error;
    return { error: typedError.message };
  }
};

export const FetchDashboardUsersAndDestinationData = async (
  startDate: string,
  endDate: string,
  limit = 7,
) => {
  try {
    const response = await apiClient(
      `/dashboards/users-and-destinations?startDate=${startDate}&endDate=${endDate}&limit=${limit}`,
      {
        method: 'GET',
      },
    );
    return response;
  } catch (err) {
    const typedError = err as Error;
    return { error: typedError.message };
  }
};

export const FetchDashboardUsersData = async (
  startDate: string,
  endDate: string,
) => {
  try {
    const response = await apiClient(
      `/dashboards/users?startDate=${startDate}&endDate=${endDate}`,
      {
        method: 'GET',
      },
    );
    return response;
  } catch (err) {
    const typedError = err as Error;
    return { error: typedError.message };
  }
};

export const FetchSeeAttractionData = async (
  startDate: string,
  endDate: string,
) => {
  try {
    const response = await apiClient(
      `/dashboards/discover-malaysia?startDate=${startDate}&endDate=${endDate}`,
      {
        method: 'GET',
      },
    );
    return response;
  } catch (err) {
    const typedError = err as Error;
    return { error: typedError.message };
  }
};

export const FetchHappeningEventsData = async (
  startDate: string,
  endDate: string,
) => {
  try {
    const response = await apiClient(
      `/dashboards/happening-events?startDate=${startDate}&endDate=${endDate}`,
      {
        method: 'GET',
      },
    );
    return response;
  } catch (err) {
    const typedError = err as Error;
    return { error: typedError.message };
  }
};

export const deleteDestination = async (displayId: string) => {
  try {
    const response = await apiClient(`/destinations/${displayId}`, {
      method: 'DELETE',
      body: JSON.stringify({ displayId }),
    });

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

export const fetchDestinationsCategories = async (
  typeId: number,
): Promise<any[]> => {
  try {
    const result = await apiClient(
      `/destinations/categories?typeId=${typeId}`,
      {
        method: 'GET',
      },
    );

    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

export const fileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient('/files/upload', {
      method: 'POST',
      body: formData,
      isFileUpload: true,
    });
    return response;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export const createDestination = async (data: any) => {
  try {
    const body: any = {
      title: data?.title,
      description: data?.description,
      openingHours: data?.openingHours,
      closingHours: data?.closingHours,
      ageLimit: data?.ageLimit,
      mapLink: data?.mapLink,
      address: data?.address,
      area: data?.area,
      cityId: data?.city,
      tags: data?.tags,
      priorityId: data?.priority,
      destinationCategoryId: data?.category,
    };

    body.images = data?.images ? data.images : [];
    body.bannerImageId = data?.bannerImageId ? data.bannerImageId : 1;

    if (data?.workingDays) {
      body.workingDays = data.workingDays;
    }

    if (data?.happeningStartDate) {
      body.happeningStartDate = data.happeningStartDate;
    }

    if (data?.happeningEndDate) {
      body.happeningEndDate = data.happeningEndDate;
    }
    const result = await apiClient(`/destinations`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.error('An error occurred:', error);
    return {
      status: false,
      error: error,
    };
  }
};

export const updateDestination = async (displayId: string, data: any) => {
  try {
    const body: any = {
      title: data?.title,
      description: data?.description,
      openingHours: data?.openingHours,
      closingHours: data?.closingHours,
      ageLimit: data?.ageLimit,
      mapLink: data?.mapLink,
      address: data?.address,
      area: data?.area,
      cityId: data?.city,
      tags: data?.tags,
      priorityId: data?.priority,
      destinationCategoryId: data?.category,
    };

    body.images = data?.images ? data.images : [];
    body.bannerImageId = data?.bannerImageId ? data.bannerImageId : 1;

    if (data?.workingDays) {
      body.workingDays = data.workingDays;
    }

    if (data?.happeningStartDate) {
      body.happeningStartDate = data.happeningStartDate;
    }

    if (data?.happeningEndDate) {
      body.happeningEndDate = data.happeningEndDate;
    }
    const result = await apiClient(`/destinations/${displayId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.error('An error occurred:', error);
    return {
      status: false,
      error: error,
    };
  }
};

export const fetchDestinationsById = async (displayId: string) => {
  try {
    const result = await apiClient(`/destinations/${displayId}`, {
      method: 'GET',
    });

    return result;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export const fetchAreas = async (): Promise<any[]> => {
  try {
    const result = await apiClient(`/localities/countries`, {
      method: 'GET',
    });

    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

export const fetchCities = async (): Promise<any[]> => {
  try {
    const result = await apiClient(`/localities/cities`, {
      method: 'GET',
    });

    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

export const updateDestinationTags = async (
  displayId: string,
  tags: number[],
) => {
  try {
    const body = {
      tags: tags,
    };

    const result = await apiClient(`/destinations/${displayId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    return result;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export const resetPassword = async (
  payload: any,
): Promise<any[] | { error: string }> => {
  try {
    const data = await apiClient(`/reset/password`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return data;
  } catch (err) {
    const typedError = err as Error;
    return { error: typedError.message };
  }
};

import { formatDate } from '@/helpers/utils/utils';

import { apiClient } from './apiClient';

export const fetchDestinations = async (typeId: number): Promise<any[]> => {
  try {
    const result = await apiClient(`/destinations?typeId=${typeId}`, {
      method: 'GET',
    });

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
  destinationId: number,
) => {
  try {
    const response = await apiClient(
      `/destinations/${destinationId}/priority/${priorityId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ priorityId }),
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

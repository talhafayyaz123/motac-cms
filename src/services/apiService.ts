import { getSession } from 'next-auth/react';
const backendApiUrl =
  'http://cms-api-motac.ap-south-1.elasticbeanstalk.com/api/v1';

export const fetchDestinations = async (typeId: number): Promise<any[]> => {
  const session = await getSession();
  try {
    const response = await fetch(
      `${backendApiUrl}/destinations?typeId=${typeId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(session as any).accessToken}`,
        },
      },
    );

    const result = await response.json();
    const tagColors = ['#E7ECFC', '#E3EFF8', '#E3F7F8'];
    const transformedData = result?.data?.map((item: any) => ({
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
    }));

    return transformedData;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};
export const fetchPriority = async () => {};

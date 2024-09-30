import { getSession } from 'next-auth/react';

const backendApiUrl =
  'http://cms-api-motac.ap-south-1.elasticbeanstalk.com/api/v1';

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

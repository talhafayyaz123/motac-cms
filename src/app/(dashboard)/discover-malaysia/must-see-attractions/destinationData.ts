import { getSession } from 'next-auth/react';

const fetchData = async (): Promise<any> => {
  const session = await getSession();
  try {
    const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const response = await fetch(`${backendApiUrl}/destinations?typeId=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const result = await response.json();
    const tagColors = ['#E7ECFC', '#E3EFF8', '#E3F7F8'];
    const transformedData = result.data.map((item: any) => ({
      Select: '',
      'Attraction ID': item.displayId,
      'Attraction Name': item.title || '',
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

export default fetchData;

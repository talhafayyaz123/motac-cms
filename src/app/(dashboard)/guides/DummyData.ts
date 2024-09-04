const generateDummyData = () => {
  const guideNames = [
    'Malaysian Marvels',
    'Island Escapes',
    'Heritage Trails',
    'Wildlife Wonders',
    'City Vibes',
  ];

  const cities = [
    'Kuala Lumpur',
    'Langkawi',
    'Penang',
    'Taman Negara',
    'George Town',
  ];

  const categories = [
    'Cultural Attractions',
    'Beaches & Islands',
    'Recommended Trip',
    'National Parks',
    'Urban Exploration',
  ];

  const tags = ['Jungle', 'Trekking', 'Wildlife'];

  const data = Array.from({ length: 12 }, (_, index) => {
    return {
      Select: '',
      'Guide Name': guideNames[index % guideNames.length],
      City: cities[index % cities.length],
      Category: categories[index % categories.length],
      Tags: tags,
      Edit: 'Edit',
      Delete: 'Delete',
    };
  });

  return data;
};

export default generateDummyData;

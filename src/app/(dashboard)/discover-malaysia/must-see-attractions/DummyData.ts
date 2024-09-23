const generateDummyData = () => {
  const attractionNames = [
    'Petronas Twin Towers',
    'Langkawi Sky Bridge',
    'Batu Caves',
    'Sipadan Island',
    'Penang Hill',
    'Kinabalu National Park',
    'Perhentian Islands',
    'Cameron Highlands',
    'Melaka UNESCO World Heritage',
    'Taman Negara National Park',
  ];

  const categories = [
    'Skyscraper',
    'Adventure',
    'Cave Temple',
    'Diving Site',
    'Scenic Viewpoint',
    'Nature Reserve',
    'Beaches',
    'Hill Station',
    'Historical Site',
    'Rainforest',
  ];

  const cities = [
    'Kuala Lumpur',
    'Langkawi',
    'Selangor',
    'Sabah',
    'Penang',
    'Sabah',
    'Kuala Lumpur',
    'Langkawi',
    'Selangor',
    'Penang',
  ];

  const tagsList = [
    ['Food', 'Nature', 'Travel'],
    ['Food', 'Nature', 'Travel'],
    ['Food', 'Nature', 'Travel'],
    ['Food', 'Nature', 'Travel'],
    ['Food', 'Nature', 'Travel'],
    ['Food', 'Nature', 'Travel'],
    ['Food', 'Nature', 'Travel'],
    ['Food', 'Nature', 'Travel'],
    ['Food', 'Nature', 'Travel'],
    ['Food', 'Nature', 'Travel'],
  ];

  const priorities = ['none', 'none', 'none'];

  const data = Array.from({ length: 18 }, (_, index) => {
    return {
      Select: '',
      'Attraction ID': `00${(index % 10) + 1}`,
      'Attraction Name': attractionNames[index % 10],
      'Attraction Category': categories[index % 10],
      'Attraction City': cities[index % 10],
      Tags: tagsList[index % 10],
      Priority: priorities[index % 3],
      Edit: 'Edit',
      Delete: 'Delete',
    };
  });

  return data;
};

export default generateDummyData;

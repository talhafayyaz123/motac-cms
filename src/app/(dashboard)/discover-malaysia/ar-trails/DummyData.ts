const generateARTrailData = () => {
  const trailNames = [
    'KL Heritage Trail',
    'Batu Caves Adventure',
    'Langkawi Sky Bridge',
  ];

  const locations = ['Kuala Lumpur', 'Langkawi', 'Selangor', 'Sabah', 'Penang'];

  const trailCategories = [
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

  const data = Array.from({ length: 18 }, (_, index) => {
    return {
      Select: '',
      'Name of AR Trail': trailNames[index % 3],
      'Location of Trail': locations[index % 5],
      'AR Trail Category': trailCategories[index % 10],
      'Link of the Trail': 'AR Experience',
      Tags: tagsList[index % 3],
      Edit: 'Edit',
      Delete: 'Delete',
    };
  });

  return data;
};

export default generateARTrailData;

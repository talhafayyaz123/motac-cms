const generateDummyData = () => {
  const restaurantNames = [
    'Seri Melaka',
    'Little India Curry House',
    'Sushi King',
  ];

  const descriptions = [
    'A cozy restaurant serving authentic Malay cuisine<br/>in a traditional setting.',
    'Experience the vibrant flavors of India<br/>with our wide range of curries and bread.',
    'Enjoy fresh sushi and Japanese dishes<br/>in a modern and welcoming atmosphere.',
  ];

  const locations = [
    'Location: 123 Jalan Melaka,<br/>Kuala Lumpur, Malaysia',
    '456 Jalan Tun Sambanthan,<br/>Kuala Lumpur, Malaysia',
    '789 Jalan Bukit Bintang,<br/>Kuala Lumpur, Malaysia',
  ];

  const openTimes = ['10:00 AM', '11:30 AM', '12:00 AM'];
  const closeTimes = ['10:00 PM', '11:00 PM'];
  const categories = ['Asian Cuisine', 'Indian', 'Japanese'];
  const tagsList = [
    ['Food', 'Nature', 'Travel'],
    ['Food', 'Nature', 'Travel'],
    ['Food', 'Nature', 'Travel'],
  ];

  const data = Array.from({ length: 18 }, (_, index) => {
    return {
      Select: '',
      ID: `Res445${5000 + index}`,
      'Restaurant Name': restaurantNames[index % 3],
      Description: descriptions[index % 3],
      Location: locations[index % 3],
      'Opens At': openTimes[index % 3],
      'Closes At': closeTimes[index % 2],
      Category: categories[index % 3],
      Tags: tagsList[index % 3],
      Edit: 'Edit',
      Delete: 'Delete',
    };
  });

  return data;
};

export default generateDummyData;

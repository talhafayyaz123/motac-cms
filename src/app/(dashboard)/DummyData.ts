const generateDummyDataForARTrails = () => {
  const locations = ['Saba', 'Kuala Lumpur', 'Langwai'];
  const arTrailName = [
    'KL Heritage Trail',
    'Langwai Sky Bridge',
    'Batu Adventure',
  ];
  const catogories = ['Adventures', 'Driving Site', 'Beaches'];

  const data = Array.from({ length: 18 }, (_, index) => {
    return {
      'AR Trail Name': arTrailName[index % arTrailName.length],
      Location: locations[index % locations.length],
      Category: catogories[index % catogories.length],
    };
  });

  return data;
};

export default generateDummyDataForARTrails;

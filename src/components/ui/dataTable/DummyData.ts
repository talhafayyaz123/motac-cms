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
      'Melaka UNESCO World ',
      'Taman Negara National ',
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
      'Kuala Lumpur',
      'Sabah',
      'Langkawi',
      'Selangor',
      'Penang',
    ];
  
    const tagsList = [
      ['Food', 'Nature', 'Travel'],
      ['Adventure', 'Nature', 'Photography'],
      ['Culture', 'History', 'Landmark'],
      ['Diving', 'Marine Life', 'Adventure'],
      ['Hiking', 'Scenic', 'Photography'],
      ['Nature', 'Wildlife', 'Adventure'],
      ['Beaches', 'Relaxation', 'Scenic'],
      ['Cool Climate', 'Nature', 'Photography'],
      ['History', 'Culture', 'Landmark'],
      ['Rainforest', 'Adventure', 'Hiking'],
    ];
  
    const priorities = ['High', 'Medium', 'Low'];
  
    const data = Array.from({ length: 18 }, (_, index) => ({
      'Select': '',
      'Attraction ID': `00${(index % 6) + 1}`,
      'Attraction Name': attractionNames[index % 10],
      'Attraction Category': categories[index % 10],
      'Attraction City': cities[index % 10],
      'Tags': tagsList[index % 10],
      'Priority': priorities[index % 3],
    }));
  
    return data;
  };
  
  export default generateDummyData;
  
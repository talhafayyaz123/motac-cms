const generateExperienceData = () => {
  const experienceNames = [
    'Batu Caves Tour',
    'Langkawi Sky Bridge Visit',
    'Penang Food Street Tour',
    'Malacca Historical Walk',
    'Taman Negara Expedition',
    'Kuala Lumpur City Tour',
    'Perhentian Islands Diving',
    'Ipoh Cave Temples Visit',
    'Cameron Highlands Retreat',
    'Borneo Wildlife Safari',
  ];

  const experienceCategories = [
    'Cultural',
    'Adventure',
    'Culinary',
    'Historical',
    'Nature',
    'City Tour',
    'Adventure',
    'Culinary',
    'Historical',
    'Nature',
  ];

  const experienceCities = [
    'Kuala Lumpur',
    'Langkawi',
    'Selangor',
    'Sabah',
    'Penang',
    'Sabah',
    'Kuala Lumpur',
    'Langkawi',
    'Selangor',
    'Sabah',
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

  const priorities = ['none', 'none'];

  const data = Array.from({ length: 18 }, (_, index) => {
    return {
      Select: '',
      'Experience ID': `EXP00${(index % 5) + 1}`,
      'Experience Name': experienceNames[index % 10],
      'Experience Category': experienceCategories[index % 10],
      'Experience City': experienceCities[index % 10],
      Tags: tagsList[index % 10],
      Priority: priorities[index % 2],
      Edit: 'Edit',
      Delete: 'Delete',
    };
  });

  return data;
};

export default generateExperienceData;

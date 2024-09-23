const generateEventData = () => {
  const eventNames = [
    'Penang Food Festival',
    'Rainforest World Music Festival',
    'Putrajaya Hot Air Balloon Fiesta',
    'Kuala Lumpur Fashion Week',
    'Borneo Jazz Festival',
  ];

  const eventCategories = [
    'Food & Drink',
    'Music & Culture',
    'Adventure',
    'Fashion',
    'Music',
  ];

  const eventCities = [
    'George Town',
    'Langkawi',
    'Selangor',
    'Sabah',
    'Penang',
    'Kuala Lumpur',
  ];

  const eventDates = [
    '2023-10-01',
    '2023-10-02',
    '2023-10-03',
    '2023-10-04',
    '2023-10-05',
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
  const data = Array.from({ length: 25 }, (_, index) => {
    return {
      Select: '',
      'Event ID': `EV00${(index % 5) + 1}`,
      'Event Name': eventNames[index % 5],
      'Event Category': eventCategories[index % 5],
      'Event City': eventCities[index % 6],
      'Event Date': eventDates[index % 5],
      Tags: tagsList[index % 5],
      Priority: priorities[index % 3],
      Edit: 'Edit',
      Delete: 'Delete',
    };
  });

  return data;
};

export default generateEventData;

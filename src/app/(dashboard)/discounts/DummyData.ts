const generateDummyData = () => {
  const offerTitles = [
    'Exclusive 20% Off Dining',
    '15% Off Luxury Spa Treatments',
    '10% Off at Premium Fashion Stores',
  ];

  const offerSubtitles = [
    'Enjoy fine dining with a 20% discount<br />at selected restaurants',
    'Relax and rejuvenate with a special<br /> 15% discount on all spa services',
    'Upgrade your wardrobe with a 10%<br /> discount at participating fashion outlets',
  ];

  const merchantNames = [
    'Gourmet Bistro',
    'Serenity Spa & Wellness',
    'Elegance Boutique',
  ];

  const merchantCountries = ['Malaysia', 'Singapore'];

  const data = Array.from({ length: 18 }, (_, index) => {
    return {
      Select: '',
      'Offer ID': `${index + 12345}`,
      'Offer Title': offerTitles[index % 3],
      'Offer Subtitle': offerSubtitles[index % 3],
      'Offer Start Date': '2024-09-01',
      'Offer End Date': '2024-12-31',
      'Merchant Name': merchantNames[index % 3],
      'Merchant Country': merchantCountries[index % 2],
      'Merchant Country Code': 'MY',
      Edit: 'Edit',
      Delete: 'Delete',
    };
  });

  return data;
};

export default generateDummyData;

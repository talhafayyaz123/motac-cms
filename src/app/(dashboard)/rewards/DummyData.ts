const generateDummyData = () => {
  const rewardTitles = ['Amazon', 'FashionWalk', 'Jackal'];
  const rewardSubtitles = ['Amazon Essentials', 'Comfy Feet', 'Luxe Stay'];
  const categories = ['Shopping', 'Apparel', 'Hotel'];
  const points = [300, 350, 100];
  const startDate = '22/08/2024';
  const endDate = '28/08/2024';
  const merchantNames = [
    'Gourmet Bistro',
    'Serenity Spa & Wellness',
    'Elegance Boutique',
  ];
  const countries = ['Malaysia', 'Singapore'];

  const data = Array.from({ length: 18 }, (_, index) => {
    return {
      Select: '',
      'Reward ID': `RD22${(index + 1) * 100}`,
      'Reward Title': rewardTitles[index % 3],
      'Reward Subtitle': rewardSubtitles[index % 3],
      'Points Required to Redeem': points[index % 3],
      Category: categories[index % 3],
      'Start Date': startDate,
      'End Date': endDate,
      'Merchant Name': merchantNames[index % 3],
      'Merchant Country': countries[index % 2],
      Edit: 'Edit',
      Delete: 'Delete',
    };
  });

  return data;
};

export default generateDummyData;

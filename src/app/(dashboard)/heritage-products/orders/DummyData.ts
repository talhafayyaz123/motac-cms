const generateDummyData = () => {
  const users = [
    'U001',
    'U002',
    'U003',
    'U004',
    'U005',
    'U006',
    'U007',
    'U008',
    'U009',
    'U010',
    'U011',
    'U012',
  ];
  const orders = [
    'ART001',
    'ART002',
    'ART003',
    'BOOK004',
    'MUSIC005',
    'EVENT006',
  ];
  const orderNames = [
    'Wayang Kulit Show',
    'Batu Caves Painting',
    'Batik Silk Scarf',
    'Malaysian Folklore',
    'Gamelan CD',
  ];
  const orderCategories = [
    'Traditional Art',
    'Cultural Experience',
    'Traditional Craft',
    'Literature',
    'Music',
  ];
  const orderDates = [
    '2023-04-15',
    '2023-04-16',
    '2023-04-10',
    '2023-03-20',
    '2023-03-15',
  ];
  const orderTimes = ['10:30 AM', '02:45 PM'];
  const orderValues = ['MYR 250', 'MYR 50', 'MYR 30', 'MYR 20'];
  const paymentModes = ['Digital Wallet', 'Credit Card'];
  const paymentStatuses = ['Completed', 'Pending'];
  const orderStatuses = ['Delivered', 'Processing'];

  const data = Array.from({ length: 12 }, (_, index) => {
    return {
      Select: '',
      Image:
        'data:image/jpeg;base64,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',
      'User ID': users[index % users.length],
      'Order ID': orders[index % orders.length],
      'Order Name': orderNames[index % orderNames.length],
      'Order Category': orderCategories[index % orderCategories.length],
      'Order Date': orderDates[index % orderDates.length],
      'Order Time': orderTimes[index % orderTimes.length],
      'Order Value': orderValues[index % orderValues.length],
      'Payment Mode': paymentModes[index % paymentModes.length],
      'Payment Status': paymentStatuses[index % paymentStatuses.length],
      'Order Status': orderStatuses[index % orderStatuses.length],
      Edit: 'Edit',
      Delete: 'Delete',
    };
  });

  return data;
};

export default generateDummyData;

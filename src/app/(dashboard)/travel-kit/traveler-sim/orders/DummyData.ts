const generateDummyData = () => {
  const userIds = [
    'UID001',
    'UID002',
    'UID003',
    'UID004',
    'UID005',
    'UID006',
    'UID007',
    'UID008',
    'UID009',
    'UID010',
    'UID011',
    'UID012',
  ];
  const orderIds = [
    'OD001',
    'OD002',
    'OD003',
    'OD004',
    'OD005',
    'OD006',
    'OD007',
    'OD008',
    'OD009',
    'OD010',
    'OD011',
    'OD012',
  ];
  const names = ['John Doe', 'Jane Smith', 'Michael Johnson'];
  const planNames = ['Power Plan 50', 'Smart Plan', 'Lite Plan', 'Family Plan'];
  const dates = [
    '2023-10-01',
    '2023-10-02',
    '2023-10-03',
    '2023-10-04',
    '2023-10-05',
  ];
  const times = ['10:30 AM', '9:30 AM', '11:30 AM', '12:00 AM'];
  const prices = ['MYR 60', 'MYR 70', 'MYR 100', 'MYR 120'];
  const simTypes = ['E-SIM', 'Physical SIM'];
  const orderStatuses = ['Fulfilled', 'Cancelled', 'Not Fulfilled'];

  const data = Array.from({ length: 12 }, (_, index) => ({
    Select: '',
    'User ID': userIds[index],
    'Order ID': orderIds[index],
    Name: names[index % names.length],
    'Plan Name': planNames[index % planNames.length],
    'Date Of Purchase': dates[index % dates.length],
    'Time Of Purchase': times[index % times.length],
    Price: prices[index % prices.length],
    'Type of SIM': simTypes[index % simTypes.length],
    'Order Status': orderStatuses[index % orderStatuses.length],
  }));

  return data;
};
export default generateDummyData;

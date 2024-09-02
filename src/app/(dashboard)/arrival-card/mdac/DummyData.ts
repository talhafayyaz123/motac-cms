const generateDummyData = () => {
  const userIDs = [
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
  const mdacIDs = ['MDAC001', 'MDAC002', 'MDAC003', 'MDAC004', 'MDAC005'];
  const applicantNames = ['John Smith', 'John Doe'];
  const dates = [
    '11/9/2023',
    '12/9/2023',
    '13/9/2023',
    '14/9/2023',
    '15/9/2023',
    '16/9/2023',
    '17/9/2023',
    '18/9/2023',
    '19/9/2023',
    '20/9/2023',
    '21/9/2023',
    '22/9/2023',
  ];
  const emails = ['john@gmail.com'];
  const pinCodes = ['Q2x3PY4Z'];

  const data = Array.from({ length: 18 }, (_, index) => {
    return {
      Select: '',
      'User ID': userIDs[index % userIDs.length],
      'MDAC ID': mdacIDs[index % mdacIDs.length],
      'Applicant Name': applicantNames[index % applicantNames.length],
      Date: dates[index % dates.length],
      'Email Address': emails[0],
      'MDAC PIN Code': pinCodes[0],
    };
  });

  return data;
};

export default generateDummyData;

const generateDummyData = () => {
  const firstNames = ['Jane', 'John', 'Michael'];
  const lastNames = ['Doe', 'Smith', 'Johnson'];
  const emails = ['jane@gmail.com', 'john@gmail.com', 'michael@gmail.com'];
  const visaApplicationNumbers = [
    'VAN123456',
    'VAN123457',
    'VAN123458',
    'VAN123459',
    'VAN123460',
    'VAN123461',
    'VAN123462',
    'VAN123463',
    'VAN123464',
    'VAN123465',
    'VAN123466',
    'VAN123467',
  ];
  const applicationDates = [
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
  const typesOfVisa = ['SEV', 'MEV', 'Transit Visa'];
  const statuses = ['Approved', 'Rejected', 'Pending', 'Document Required'];

  const data = Array.from({ length: 18 }, (_, index) => {
    return {
      Select: '',
      'User ID': `UID00${(index % 12) + 1}`,
      'First Name': firstNames[index % 3],
      'Last Name': lastNames[index % 3],
      'Email Address': emails[index % 3],
      'Visa Application Number': visaApplicationNumbers[index % 12],
      'Application Date': applicationDates[index % 12],
      'Type of Visa': typesOfVisa[index % 3],
      Status: statuses[index % 4],
    };
  });

  return data;
};

export default generateDummyData;

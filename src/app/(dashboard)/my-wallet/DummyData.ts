const generateDummyData = () => {
  const firstNames = ['John', 'Jane', 'Michael'];
  const lastNames = ['Doe', 'Smith', 'Johnson'];
  const transactionTypes = ['Top Up', 'Transfer'];
  const statuses = ['Success', 'Fail'];
  const amounts = ['MYR 60', 'MYR 70', 'MYR 100', 'MYR 120'];

  const data = Array.from({ length: 18 }, (_, index) => {
    return {
      Select: '',
      'User ID': `100${(index % 5) + 1}`,
      'First Name': firstNames[index % 3],
      'Last Name': lastNames[index % 3],
      Date: `11/9/2023`,
      Time: `${10 + (index % 4)}:30 AM`,
      'Transaction Type': transactionTypes[index % 2],
      'Transaction ID': `TX1234567${(index % 10) + 8}`,
      Amount: amounts[index % 4],
      Status: statuses[index % 2],
    };
  });

  return data;
};

export default generateDummyData;

const generateDummyData = () => {
  const firstNames = ['John', 'Jane', 'Michael'];
  const lastNames = ['Doe', 'Smith', 'Johnson'];
  const emails = ['johndoe@gmail.com', 'jane@gmail.com', 'michael@gmail.com'];
  const phoneNumbers = [
    '+60 12-345 6789',
    '+62 13-579 1234',
    '+41 13-579 1234',
    '+60 XX XXX XXXX',
  ];
  const nationalities = ['United Kingdom', 'Singaporean', 'Australian'];

  const data = Array.from({ length: 18 }, (_, index) => {
    return {
      Select: '',
      'User ID': `13453${(index % 10) + 2}`,
      'First Name': firstNames[index % 3],
      'Last Name': lastNames[index % 3],
      Email: emails[index % 3],
      'Phone Number': phoneNumbers[index % 4],
      Nationality: nationalities[index % 3],
      Action: 'View',
      'Reset Link': 'Send Reset Password Link',
    };
  });

  return data;
};

export default generateDummyData;

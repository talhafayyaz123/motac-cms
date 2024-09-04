const generateDummyData = () => {
  const firstNames = ['George', 'John'];
  const lastNames = ['Alex', 'Smith'];
  const designations = ['CEO', 'HOD'];
  const roles = ['Admin', 'Supervisor'];
  const emails = ['georgealex@org.com', 'johnsmith@org.com'];

  const data = Array.from({ length: 2 }, (_, index) => {
    return {
      Select: '',
      'First Name': firstNames[index],
      'Last Name': lastNames[index],
      Designation: designations[index],
      Role: roles[index],
      'Email Address': emails[index],
      Edit: 'Edit',
      Delete: 'Delete',
    };
  });

  return data;
};

export default generateDummyData;

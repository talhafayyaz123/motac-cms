const generateDummyData = () => {
  const planNames = [
    'Essential Health Plan',
    'Premium Health Plan',
    'Basic Health Plan',
    'Elite Health Plan',
    'Family Health Plan',
  ];

  const providerNames = [
    'HealthFirst Insurance',
    'Apex Health Insurance',
    'CarePlus Insurance',
    'HealthGuard Insurance',
    'Unity Health Insurance',
  ];

  const providerLinks = [
    'HealthFirst Insurance',
    'Apex Health Insurance',
    'CarePlus Insurance',
    'HealthGuard Insurance',
    'Unity Health Insurance',
  ];

  const planPrices = [
    'MYR 300 per month',
    'MYR 700 per month',
    'MYR 500 per month',
    'MYR 800 per month',
    'MYR 750 per month',
  ];

  const data = Array.from({ length: 12 }, (_, index) => {
    return {
      Select: '',
      'Plan Name': planNames[index % planNames.length],
      'Provider Name': providerNames[index % providerNames.length],
      'Provider Link': providerLinks[index % providerLinks.length],
      'Plan Price': planPrices[index % planPrices.length],
      Edit: 'Edit',
      Delete: 'Delete',
    };
  });

  return data;
};

export default generateDummyData;

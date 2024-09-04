const generateDummyData = () => {
  const providerIDs = ['SP001', 'SP002', 'SP003', 'SP004', 'SP005'];
  const providerNames = ['Celcom', 'Digi', 'Maxis', 'U Mobile', 'Yes 4G'];
  const planNames = ['Power Plan 50', 'Smart Plan', 'Lite Plan', 'Family Plan'];
  const packages = [
    '5GB Data + 100 Minutes',
    '5GB Data + 100 Minutes',
    '5GB Data + 100 Minutes',
    '5GB Data + 100 Minutes',
  ];
  const packagePrices = ['MYR 60', 'MYR 160', 'MYR 100', 'MYR 160'];
  const simPlanStatuses = ['Activate', 'Select'];

  const data = Array.from({ length: 12 }, (_, index) => {
    return {
      Select: '',
      'Provider ID': providerIDs[index % providerIDs.length],
      'Provider Name': providerNames[index % providerNames.length],
      'Plan Name': planNames[index % planNames.length],
      Packages: packages[index % packages.length],
      'Package Price': packagePrices[index % packagePrices.length],
      'SIM Plan Status': simPlanStatuses[index % simPlanStatuses.length],
    };
  });

  return data;
};

export default generateDummyData;

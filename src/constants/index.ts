export const chartCategories = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const chartData = [1, 2, 1, 1, 2, 4, 3, 2.5, 2, 3, 2.5, 2];

export const userStats = [
  { label: 'Total Users', value: 7000 },
  { label: 'Active Users', value: 6500 },
  { label: 'Deleted Users', value: 500 },
];

export const dummyMapDataOne = [
  { code: 'US', value: 1 },
  { code: 'RU', value: 5 },
];

export const dummyMapVisibleCountriesOne = ['US', 'RU'];

export const dummyMapDataTwo = [
  { code: 'US', value: 1 },
  { code: 'RU', value: 5 },
  { code: 'PK', value: 5 },
  { code: 'CN', value: 5 },
];

export const dummyMapVisibleCountriesTwo = ['US', 'RU', 'PK', 'CN'];

export const categoriesForBar = [
  'Nature',
  'Culture & History',
  'Food Beverage',
];

export const seriesData = [
  {
    type: 'column' as const,
    name: 'Fruits',
    data: [6, 12, 8],
  },
];

export const attractionDestinationId = 1;
export const topExperienceDestinationId = 2;
export const happeningEventsDestinationId = 3;

export const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const period = i < 12 ? 'AM' : 'PM';
  const label = `${hour}:00 ${period}`;
  return { value: `${hour}:00 ${period}`, label };
});

export const workingDaysOptions = [
  { value: 'Mon-Sun', label: 'Mon-Sun' },
  { value: 'Mon-Fri', label: 'Mon-Fri' },
  { value: 'Sat-Sun', label: 'Sat-Sun' },
  { value: 'Mon-Sat', label: 'Mon-Sat' },
  { value: 'Mon', label: 'Mon' },
  { value: 'Tue', label: 'Tue' },
  { value: 'Wed', label: 'Wed' },
  { value: 'Thu', label: 'Thu' },
  { value: 'Fri', label: 'Fri' },
  { value: 'Sat', label: 'Sat' },
  { value: 'Sun', label: 'Sun' },
];

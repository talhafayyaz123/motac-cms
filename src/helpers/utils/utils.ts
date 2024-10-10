export function parsePathToTitle(path: string) {
  const cleanedPath = path.startsWith('/') ? path.slice(1) : path;

  const title = cleanedPath
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return title;
}

export function firstLetterCapital(name: string): string {
  return name?.charAt(0).toUpperCase() + name?.slice(1);
}

export const formatDate = (
  dateStr: string,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions,
): string => {
  if (!dateStr) return '';

  const date = new Date(dateStr);

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(
    date,
  );
};

export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatISOStringToYYYYMMDD(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function subtractDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

export const getDaysPassedThisYear = () => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  const today = new Date();
  const differenceInTime = today.getTime() - startOfYear.getTime();
  const daysPassed = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return daysPassed;
};

export const getDaysPassedThisMonth = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month
  const differenceInTime = today.getTime() - startOfMonth.getTime();
  const daysPassed = Math.floor(differenceInTime / (1000 * 3600 * 24)) + 1; // Convert time difference to days and include today
  return daysPassed;
};

export const getDaysPassedThisWeek = () => {
  const today = new Date();
  let dayOfWeek = today.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
  dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
  // const daysPassedThisWeek = dayOfWeek + 1; // Add 1 to include today
  return dayOfWeek;
};

export const dashboardDateRangeCalculation = (
  currentDate: Date,
  selectedValue: string,
): { calculatedStartDate: string; calculatedEndDate: string } => {
  let calculatedStartDate: string = '';
  const previousDay = subtractDays(currentDate, 1);
  let calculatedEndDate: string = formatDateToYYYYMMDD(previousDay);

  if (['7', '30'].includes(selectedValue)) {
    const adjustedDate = subtractDays(currentDate, parseInt(selectedValue));
    calculatedStartDate = formatDateToYYYYMMDD(adjustedDate);
  } else if (['90', '180'].includes(selectedValue)) {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    let monthsToSubtract: any;
    if (selectedValue === '90') {
      monthsToSubtract = 3;
    } else if (selectedValue === '180') {
      monthsToSubtract = 6;
    }

    const startMonth = currentMonth - monthsToSubtract;
    let startYear = currentYear;
    let endYear = currentYear;

    if (startMonth < 0) {
      startYear -= Math.ceil(Math.abs(startMonth) / 12);
    }

    calculatedStartDate = formatDateToYYYYMMDD(
      new Date(startYear, (startMonth + 12) % 12, 1),
    );

    let endMonth = currentMonth - 1;
    if (endMonth < 0) {
      endYear -= 1;
      endMonth = 11;
    }

    calculatedEndDate = formatDateToYYYYMMDD(
      new Date(endYear, endMonth + 1, 0),
    );
  } else {
    if (parseInt(selectedValue) > 31) {
      const adjustedDate = subtractDays(currentDate, parseInt(selectedValue));
      calculatedStartDate = formatDateToYYYYMMDD(adjustedDate);
    } else {
      // in case of this month and this week
      const adjustedDate = subtractDays(
        currentDate,
        parseInt(selectedValue) - 1,
      );
      calculatedStartDate = formatDateToYYYYMMDD(adjustedDate);
      calculatedEndDate = formatDateToYYYYMMDD(currentDate);
    }
  }

  return { calculatedStartDate, calculatedEndDate };
};

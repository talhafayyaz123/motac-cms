export function parsePathToTitle(path: string) {
  const cleanedPath = path.startsWith('/') ? path.slice(1) : path;

  const title = cleanedPath
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return title;
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

export function formatDateToYYYYMMDD(date: Date) {
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

export function parsePathToTitle(path: string) {
  const cleanedPath = path.startsWith('/') ? path.slice(1) : path;

  const title = cleanedPath
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return title;
}

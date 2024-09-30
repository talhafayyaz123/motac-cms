export const getDestinationId = (
  destinationName: string,
  destinations: any,
) => {
  if (!destinationName) return null; // Return null if destinationName is undefined

  // Safely extract the destination type from the pathname
  const extractedType = destinationName.split('/').pop()?.replace(/-/g, ' '); // Replace hyphens with spaces

  if (extractedType) {
    // Find the corresponding destination ID
    const destination = destinations.find((dest: any) => {
      return dest.description.toLowerCase() === extractedType.toLowerCase(); // Compare with case-insensitivity
    });
    return destination ? destination.id : null; // Return the found destination ID or null
  }

  return null; // Return null if no matching destination found
};

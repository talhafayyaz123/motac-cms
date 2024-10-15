import * as Yup from 'yup';

const latLongRegex = /@(?!0+\.0+,0+\.0+)(-?\d{1,2}\.\d+),(-?\d{1,3}\.\d+)/;

export const validationSchemaForAttractions = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  openingHours: Yup.string().required('Opening hours selection is required'),
  closingHours: Yup.string()
    .required('Closing hours selection is required')
    .test(
      'is-after-opening',
      'Closing time must be after opening time',
      function (value) {
        const { openingHours } = this.parent;

        // Helper function to parse a time string (like 12:00 PM) to a Date object
        const parseTime = (time: string) => {
          // Check if time is in 12-hour format with AM/PM
          const [timeString, period] = time.split(' ');
          const [hours, minutes] = timeString.split(':').map(Number); // Changed to const

          // Adjust hours based on AM/PM
          let adjustedHours = hours; // Use a new variable to adjust hours
          if (period?.toLowerCase() === 'pm' && adjustedHours !== 12) {
            adjustedHours += 12;
          } else if (period?.toLowerCase() === 'am' && adjustedHours === 12) {
            adjustedHours = 0; // 12 AM is 00:00 in 24-hour time
          }

          const date = new Date();
          date.setHours(adjustedHours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds

          return date;
        };

        // Parse both opening and closing times
        const opening = parseTime(openingHours);
        const closing = parseTime(value);

        // Return true if the closing time is after the opening time
        return closing > opening;
      },
    ),
  workingDays: Yup.string().required('Working days selection is required'),
  ageLimit: Yup.string()
    .required('Age Limitation is required')
    .max(99, 'Age cannot exceed 99')
    .typeError('Age must be a number'),
  mapLink: Yup.string()
    .required('Map Link is a required field')
    .url('Must be a valid URL')
    .matches(
      latLongRegex,
      'Map Link must include valid latitude and longitude',
    ),

  address: Yup.string().required('Address is required'),
  category: Yup.number().required('Category is required'),
  area: Yup.object()
    .shape({
      id: Yup.string().nullable(), // Allow null ID for custom options
      name: Yup.string().required('Area name is required'), // Name must be provided
    })
    .nullable()
    .required('Area is required'),
  cityId: Yup.number().required('City is required'),
  description: Yup.string().required('Description is required'),
  tags: Yup.array().min(1, 'At least one tag must be selected'),
  priority: Yup.number().required('Priority is required'),
  images: Yup.array()?.optional().nullable(),
  bannerImageId: Yup.number().nullable(),
  bannerImage: Yup.string().required('Banner image is required'),
});

export const validationSchemaForExperiences = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  openingHours: Yup.string().required('Opening hours selection is required'),
  closingHours: Yup.string()
    .required('Closing hours selection is required')
    .test(
      'is-after-opening',
      'Closing time must be after opening time',
      function (value) {
        const { openingHours } = this.parent;

        // Helper function to parse a time string (like 12:00 PM) to a Date object
        const parseTime = (time: string) => {
          // Check if time is in 12-hour format with AM/PM
          const [timeString, period] = time.split(' ');
          const [hours, minutes] = timeString.split(':').map(Number); // Changed to const

          // Adjust hours based on AM/PM
          let adjustedHours = hours; // Use a new variable to adjust hours
          if (period?.toLowerCase() === 'pm' && adjustedHours !== 12) {
            adjustedHours += 12;
          } else if (period?.toLowerCase() === 'am' && adjustedHours === 12) {
            adjustedHours = 0; // 12 AM is 00:00 in 24-hour time
          }

          const date = new Date();
          date.setHours(adjustedHours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds

          return date;
        };

        // Parse both opening and closing times
        const opening = parseTime(openingHours);
        const closing = parseTime(value);

        // Return true if the closing time is after the opening time
        return closing > opening;
      },
    ),
  workingDays: Yup.string().required('Working days selection is required'),
  ageLimit: Yup.string()
    .required('Age Limitation is required')
    .max(99, 'Age cannot exceed 99')
    .typeError('Age must be a number'),
  mapLink: Yup.string()
    .required('Map Link is a required field')
    .url('Must be a valid URL')
    .matches(
      latLongRegex,
      'Map Link must include valid latitude and longitude',
    ),
  address: Yup.string().required('Address is required'),
  category: Yup.number().required('Category is required'),
  area: Yup.object()
    .shape({
      id: Yup.string().nullable(), // Allow null ID for custom options
      name: Yup.string().required('Area name is required'), // Name must be provided
    })
    .nullable()
    .required('Area is required'),
  cityId: Yup.number().required('City is required'),
  description: Yup.string().required('Description is required'),
  tags: Yup.array().min(1, 'At least one tag must be selected'),
  priority: Yup.number().required('Priority is required'),
  images: Yup.array()?.optional().nullable(),
  bannerImageId: Yup.number().nullable(),
  bannerImage: Yup.string().required('Banner image is required'),
  eventLink: Yup.string()
    .required('Event Link is a required field')
    .url('Must be a valid URL'),
});

export const validationSchemaForHappeningEvents = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  openingHours: Yup.string().required('Opening hours selection is required'),
  closingHours: Yup.string()
    .required('Closing hours selection is required')
    .test(
      'is-after-opening',
      'Closing time must be after opening time',
      function (value) {
        const { openingHours } = this.parent;

        // Helper function to parse a time string (like 12:00 PM) to a Date object
        const parseTime = (time: string) => {
          // Check if time is in 12-hour format with AM/PM
          const [timeString, period] = time.split(' ');
          const [hours, minutes] = timeString.split(':').map(Number); // Changed to const

          // Adjust hours based on AM/PM
          let adjustedHours = hours; // Use a new variable to adjust hours
          if (period?.toLowerCase() === 'pm' && adjustedHours !== 12) {
            adjustedHours += 12;
          } else if (period?.toLowerCase() === 'am' && adjustedHours === 12) {
            adjustedHours = 0; // 12 AM is 00:00 in 24-hour time
          }

          const date = new Date();
          date.setHours(adjustedHours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds

          return date;
        };

        // Parse both opening and closing times
        const opening = parseTime(openingHours);
        const closing = parseTime(value);

        // Return true if the closing time is after the opening time
        return closing > opening;
      },
    ),
  workingDays: Yup.string().required('Working days selection is required'),
  ageLimit: Yup.string()
    .required('Age Limitation is required')
    .max(99, 'Age cannot exceed 99')
    .typeError('Age must be a number'),
  mapLink: Yup.string()
    .required('Map Link is a required field')
    .url('Must be a valid URL')
    .matches(
      latLongRegex,
      'Map Link must include valid latitude and longitude',
    ),
  address: Yup.string().required('Address is required'),
  category: Yup.number().required('Category is required'),
  area: Yup.object()
    .shape({
      id: Yup.string().nullable(), // Allow null ID for custom options
      name: Yup.string().required('Area name is required'), // Name must be provided
    })
    .nullable()
    .required('Area is required'),
  cityId: Yup.number().required('City is required'),
  description: Yup.string().required('Description is required'),
  tags: Yup.array().min(1, 'At least one tag must be selected'),
  priority: Yup.number().required('Priority is required'),
  happeningStartDate: Yup.date().required('Happening start date is required'),
  happeningEndDate: Yup.date()
    .required('Happening end date is required')
    .test(
      'is-end-date-after-start-date',
      'End date must be after or equal to start date',
      function (value) {
        const { happeningStartDate } = this.parent;
        return value ? value >= happeningStartDate : false;
      },
    ),
  images: Yup.array()?.optional().nullable(),
  bannerImageId: Yup.number().nullable(),
  bannerImage: Yup.string().required('Banner image is required'),
  eventLink: Yup.string()
    .required('Event Link is a required field')
    .url('Must be a valid URL'),
});

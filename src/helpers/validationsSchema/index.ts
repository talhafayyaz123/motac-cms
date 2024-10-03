import * as Yup from 'yup';

export const validationSchemaForAttractions = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  openingHours: Yup.string().required('Opening hours are required'),
  closingHours: Yup.string().required('Closing hours are required'),
  ageLimit: Yup.number()
    .required('Age Limitation is required')
    .max(99, 'Age cannot exceed 99')
    .typeError('Age must be a number'),
  mapLink: Yup.string().required().url('Must be a valid URL'),
  address: Yup.string().required('Address is required'),
  category: Yup.number().required('Category is required'),
  area: Yup.string().required('Area is required'),
  city: Yup.number().required('City is required'),
  description: Yup.string().required('Description is required'),
  tags: Yup.array().min(1, 'At least one tag must be selected'),
  priority: Yup.number().required('Priority is required'),
  images: Yup?.array().optional()?.nullable(),
  bannerImageId: Yup?.number(),
  bannerImage: Yup?.string().nullable(),
});

export const validationSchemaForExperiences = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  openingHours: Yup.string().required('Opening hours are required'),
  closingHours: Yup.string().required('Closing hours are required'),
  ageLimit: Yup.number()
    .required('Age Limitation is required')
    .max(99, 'Age cannot exceed 99')
    .typeError('Age must be a number'),
  mapLink: Yup.string().required().url('Must be a valid URL'),
  address: Yup.string().required('Address is required'),
  category: Yup.number().required('Category is required'),
  area: Yup.string().required('Area is required'),
  city: Yup.number().required('City is required'),
  description: Yup.string().required('Description is required'),
  tags: Yup.array().min(1, 'At least one tag must be selected'),
  priority: Yup.number().required('Priority is required'),
  images: Yup?.array().optional()?.nullable(),
  bannerImageId: Yup?.number(),
  bannerImage: Yup?.string().nullable(),
});

export const validationSchemaForHappeningEvents = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  openingHours: Yup.string().required('Opening hours are required'),
  closingHours: Yup.string().required('Closing hours are required'),
  ageLimit: Yup.number()
    .required('Age Limitation is required')
    .max(99, 'Age cannot exceed 99')
    .typeError('Age must be a number'),
  mapLink: Yup.string().required().url('Must be a valid URL'),
  address: Yup.string().required('Address is required'),
  category: Yup.number().required('Category is required'),
  area: Yup.string().required('Area is required'),
  city: Yup.number().required('City is required'),
  description: Yup.string().required('Description is required'),
  tags: Yup.array().min(1, 'At least one tag must be selected'),
  priority: Yup.number().required('Priority is required'),
  happeningStartDate: Yup.date().required('Happening start date is required'),
  happeningEndDate: Yup.date().required('Happening end date is required'),
  images: Yup?.array().optional()?.nullable(),
  bannerImageId: Yup?.number(),
  bannerImage: Yup?.string().nullable(),
});

'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; // Import necessary hooks
import { FaTrashAlt } from 'react-icons/fa';

import FormContainer from '@/components/container/FormContainer';
import AreaSelect from '@/components/ui/AreaSelect';
import Button from '@/components/ui/Button';
import DropZone from '@/components/ui/DropZone';
import FormLoader from '@/components/ui/FormLoader';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import Select from '@/components/ui/Select';
import TextEditor from '@/components/ui/TextEditor';
import Title from '@/components/ui/Title';
import {
  ageLimitation,
  attractionDestinationId,
  timeOptions,
  workingDaysOptions,
} from '@/constants';
import { validationSchemaForAttractions } from '@/helpers/validationsSchema';
import AlertService from '@/services/alertService';
import {
  createDestination,
  fetchAreas,
  fetchCities,
  fetchDestinationsById,
  fetchDestinationsCategories,
  fetchPriorities,
  fetchRecommendationTags,
  fileUpload,
  updateDestination,
} from '@/services/apiService';

export default function AddAttraction() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const action = pathname?.split('/').pop();
  const id = searchParams?.get('id');
  const [images, setImages] = useState<File[]>([]);

  const [categoriesTags, setCategoriesTags] = useState<
    { id: number; name: string }[]
  >([]);
  const [destinationsCategories, setDestinationsCategories] = useState<
    { id: number; name: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormBtnLoading, setIsFormLoading] = useState(false);
  const [isFormError, setIsFormError] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    setFocus,
    watch,
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(validationSchemaForAttractions),
    defaultValues: {
      title: '',
      openingHours: '',
      closingHours: '',
      ageLimit: '',
      mapLink: '',
      address: '',
      category: attractionDestinationId,
      area: { id: null, name: '' },
      cityId: undefined,
      description: '',
      tags: [],
      priority: 1,
      images,
      bannerImageId: null,
      bannerImage: '',
      workingDays: '',
    },
  });
  const [priorities, setPriorities] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [areas, setAreas] = useState<{ id: number; name: string }[]>([]);

  const fetchInitialData = async () => {
    try {
      const [categories, tags, citiesData, priorityData] = await Promise.all([
        fetchDestinationsCategories(attractionDestinationId),
        fetchRecommendationTags(),
        fetchCities(),
        fetchPriorities(),
      ]);

      setDestinationsCategories(
        categories.map(({ id, name }) => ({ id, name })),
      );
      setCategoriesTags(tags.map(({ id, name }) => ({ id, name })));
      setCities(citiesData.map(({ id, name }) => ({ id, name })));
      setPriorities(
        priorityData.map((priority: any) => ({
          id: priority.priorityId,
          name: priority.label,
        })),
      );
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const fetchAreasData = async (cityId: number) => {
    try {
      if (cityId) {
        const areasData = await fetchAreas(cityId);
        setAreas(areasData?.map(({ id, name }) => ({ id, name })));
        setValue('area', null as any); // Reset area
      }
    } catch (error) {
      console.error('Error loading areas:', error);
    }
  };

  const fetchAttraction = async (attractionId: string) => {
    try {
      setIsLoading(true);
      const data = await fetchDestinationsById(attractionId);
      const destinationCategoryId = data.destinationCategory?.id;
      const priorityId = data.priority?.id;

      setValue('title', data.title);
      setValue('openingHours', data.openingHours);
      setValue('closingHours', data.closingHours);
      setValue('ageLimit', data.ageLimit);
      setValue('mapLink', data.mapLink);
      setValue('address', data.address);
      setValue('category', destinationCategoryId);
      setValue('cityId', data?.area?.city?.id);
      const areaName = data.area?.name;
      const areaId = data.area?.id;
      setValue('area', { id: areaId, name: areaName });
      setValue('workingDays', data.workingDays);
      setValue('description', data.description);
      setValue(
        'tags',
        data.tags.map((tag: { id: number }) => tag.id),
      );
      setValue('priority', priorityId);
      setValue('bannerImageId', data?.bannerImageId);
      setValue('bannerImage', data?.bannerImage?.path);
      // Set existing images and their IDs
      const existingImages = data.images.map(
        (image: { id: number; path: string }) => image.path,
      );
      const existingImageIds = data.images.map(
        (image: { id: number }) => image.id,
      );

      setImages(existingImages);
      setValue('images', existingImageIds);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching attraction:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (action === 'edit-attraction' && id) {
      void fetchAttraction(id);
    }
    // eslint-disable-next-line
  }, [action, id]);

  useEffect(() => {
    void fetchInitialData();
  }, []);

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // Update the form's images field (sync with React Hook Form)
    const currentImageIds = watch('images') || [];
    const updatedImageIds = currentImageIds.filter((_, i) => i !== index);
    setValue('images', updatedImageIds);
  };

  const handleFilesChange = (files: File[]) => {
    setImages((prevImages) => {
      const uniqueFiles = files.filter((file) => !prevImages.includes(file)); // Filter out duplicates
      console.log('Unique files to be added:', uniqueFiles); // Log unique files

      return [...prevImages, ...uniqueFiles]; // Update the state with unique files
    });
  };

  const handleBase64ValueChange = async (base64Value: File | null) => {
    if (base64Value) {
      const response = await fileUpload(base64Value);
      setValue('bannerImageId', response?.file?.id);
      setValue('bannerImage', response?.file?.path);
    }
  };

  const onSubmit = async (data: any) => {
    setIsFormLoading(true);

    const newImageIds = await uploadImages();
    const existingImageIds = data.images || [];

    // Combine existing and new images
    const allImageIds = [...existingImageIds, ...newImageIds];
    // Check if there are no images uploaded
    if (allImageIds.length === 0) {
      setIsFormLoading(false);
      setIsFormError(true);
      return; // Stop form submission if no images are uploaded
    } else {
      setIsFormError(false);
      setIsFormLoading(true);
      if (newImageIds) {
      }
      setValue('images', [...existingImageIds, ...newImageIds]);

      const cityId = Number(data.cityId); // CityId is always required
      const areaId = data.area?.id ? Number(data.area.id) : null;

      const transformedData: any = {
        ...data,
        cityId, // Always include cityId
        images: [...existingImageIds, ...newImageIds],
      };

      // Scenario 1: If areaId exists (user selected from dropdown), send areaId
      if (areaId) {
        transformedData.areaId = areaId;
      }
      // Scenario 2: If areaId does not exist (user entered custom area), send area name instead of areaId
      else if (data.area?.name) {
        transformedData.area = data.area.name;
      }

      // Additional logic for update:
      if (action === 'edit-attraction' && id) {
        if (!areaId && data.area?.name) {
          // Scenario 2 for Update: If custom area name is entered, send both area and cityId
          transformedData.area = data.area.name;
          transformedData.cityId = cityId; // Send cityId with custom area
        }
      }

      try {
        if (action === 'edit-attraction' && id) {
          const response = await updateDestination(id, transformedData);
          setIsFormLoading(false);
          if (response?.status) {
            await AlertService.alert(
              'Successful!',
              'Update Attraction Success',
              'success',
              'Ok',
            );
            router.push('/discover-malaysia/must-see-attractions');
          } else {
            await AlertService.alert(
              'Error',
              (response.error as string) || 'Something went wrong',
              'error',
              'Try Again',
            );
          }
        } else {
          const response = await createDestination(transformedData);
          setIsFormLoading(false);
          if (response?.status) {
            await AlertService.alert(
              'Successful!',
              'Add Attraction Success',
              'success',
              'Ok',
            );
            router.push('/discover-malaysia/must-see-attractions');
          } else {
            await AlertService.alert(
              'Error',
              (response.error as string) || 'Something went wrong',
              'error',
              'Try Again',
            );
          }
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setIsFormLoading(false);
      }
    }
  };

  const uploadImages = async () => {
    const uploadedImageIds: number[] = [];

    for (const file of images) {
      if (file instanceof File) {
        // Only upload if it's a new file
        console.log('Uploading file:', file.name);
        const response = await fileUpload(file);
        uploadedImageIds.push(response?.file?.id);
        console.log('File uploaded successfully:', file?.name);
      }
    }

    return uploadedImageIds;
  };

  const handleError = (errors: any) => {
    const errorFields = Object.keys(errors);

    if (errorFields.length > 0) {
      const firstErrorField = errorFields[0];
      const errorElement = document.querySelector(
        `[name="${firstErrorField}"]`,
      );

      // Scroll the field into view
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Focus on the first invalid field using setFocus
      setFocus(firstErrorField as any);
    }
  };

  return (
    <main className="h-full">
      <div className="sticky top-0 bg-white w-full py-8 z-50">
        <Title className="text-[#051225] font-bold">Detailed View</Title>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit, handleError)}>
          <FormContainer>
            <p className="font-semibold mb-3 text-[#181819]">Main Info</p>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  label="Title"
                  placeholder="Explore the Petronas Twin Towers"
                  className="text-xs mb-3"
                  {...field}
                  error={errors.title?.message}
                />
              )}
            />
            <TextEditor
              control={control}
              name="description"
              error={errors.description?.message}
            />
            <div className="mt-5 flex flex-wrap gap-2">
              <Controller
                control={control}
                name="openingHours"
                render={({ field }) => (
                  <Select
                    label="Opening Hours"
                    options={timeOptions}
                    selectedValues={field.value}
                    setSelectedValues={field.onChange}
                    minWidth="350px"
                    error={errors.openingHours?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="closingHours"
                render={({ field }) => (
                  <Select
                    label="Closing Hours"
                    options={timeOptions}
                    selectedValues={field.value}
                    setSelectedValues={field.onChange}
                    minWidth="350px"
                    error={errors.closingHours?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="workingDays"
                render={({ field }) => (
                  <Select
                    label="Working Days"
                    options={workingDaysOptions} // Using the new working days options
                    selectedValues={field.value}
                    setSelectedValues={field.onChange}
                    minWidth="350px"
                    error={errors.workingDays?.message}
                  />
                )}
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-4">
              <Controller
                control={control}
                name="ageLimit"
                render={({ field }) => (
                  <Select
                    label="Age Limitation"
                    options={ageLimitation.map((p) => ({
                      value: p.value,
                      label: p.label,
                    }))}
                    selectedValues={field.value}
                    setSelectedValues={field.onChange}
                    minWidth="350px"
                    error={errors.ageLimit?.message}
                  />
                )}
              />

              <Controller
                name="bannerImage"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Banner Image"
                    className="text-xs"
                    minWidth="350px"
                    error={errors.bannerImage?.message}
                    defaultImagePath={
                      action === 'add-attraction'
                        ? undefined
                        : watch('bannerImage')
                    }
                    type="file"
                    onFileError={async () => {
                      await AlertService.alert(
                        '',
                        'Only images with 16:9 aspect ratio are allowed',
                        'warning',
                        'OK',
                      );
                    }}
                    onChange={(e) => {
                      const input = e.target as HTMLInputElement;
                      if (input.files && input.files[0]) {
                        field.onChange(input.files[0]); // Update form state
                      }
                    }}
                    onBase64ValueChange={handleBase64ValueChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="mapLink"
                render={({ field }) => (
                  <Input
                    label="Map Link"
                    placeholder="Google Maps"
                    className="text-xs"
                    minWidth="350px"
                    {...field}
                    error={errors.mapLink?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    label="Category"
                    options={destinationsCategories.map((p) => ({
                      value: p.id,
                      label: p.name,
                      key: p.id,
                    }))}
                    selectedValues={field.value}
                    setSelectedValues={field.onChange}
                    minWidth="350px"
                    error={errors.category?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="tags" // Name for the tags
                render={({ field }) => (
                  <Select
                    label="Tags"
                    options={categoriesTags.map((p) => ({
                      value: p.id,
                      label: p.name,
                      key: p.id,
                    }))}
                    selectedValues={
                      Array.isArray(field.value) ? field.value : []
                    }
                    multiple
                    setSelectedValues={(values) => {
                      const selectedValues = Array.isArray(values)
                        ? values
                        : [values];
                      field.onChange(selectedValues);
                    }}
                    minWidth="350px"
                    maxWidth="350px"
                    error={errors.tags?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select
                    minWidth="350px"
                    selectedValues={field.value}
                    label="Priority"
                    options={priorities.map((p) => ({
                      value: p.id,
                      label: p.name,
                      key: p.id,
                    }))}
                    setSelectedValues={field.onChange}
                    error={errors.priority?.message}
                  />
                )}
              />
            </div>
            <p className="mt-5 text-md text-[#181819] font-bold">Location</p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Controller
                control={control}
                name="cityId"
                render={({ field }) => (
                  <Select
                    label="State"
                    options={cities.map((p) => ({
                      value: p.id,
                      label: p.name,
                      key: p.id,
                    }))}
                    selectedValues={field.value}
                    setSelectedValues={(event) => {
                      field.onChange(event);
                      void fetchAreasData(event as number);
                    }}
                    minWidth="350px"
                    error={errors.cityId?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="area"
                render={({ field }) => (
                  <AreaSelect
                    label="Area"
                    options={areas.map((p) => ({
                      value: p.id,
                      label: p.name,
                    }))}
                    selectedValues={
                      field.value as {
                        id: number | string | null;
                        name: string;
                      } | null
                    } // Expecting { id, name } or null
                    setSelectedValues={(selected) => {
                      const selectedArea = selected
                        ? {
                            id: selected.id, // This will be null for custom options
                            name: selected.name,
                          }
                        : null;

                      field.onChange(selectedArea); // Set the selected area object
                    }}
                    minWidth="350px"
                    searchable
                    error={errors.area?.message} // Display validation errors if any
                  />
                )}
              />

              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <Input
                    label="Address"
                    placeholder="Kuala Lumpur City Center (KLCC), 43 Jalan Ampan"
                    className="text-xs"
                    minWidth="350px"
                    {...field}
                    error={errors.address?.message}
                  />
                )}
              />
            </div>
          </FormContainer>
          <FormContainer className="mt-5">
            <p className="font-semibold mb-3">Images</p>
            {isFormError && (
              <p className="text-red-500 text-xs italic">
                Please upload at least one image
              </p>
            )}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {images.map((file, index) => (
                <div key={index} className="relative">
                  {typeof file === 'string' ? (
                    /* eslint-disable @next/next/no-img-element */
                    <img
                      src={file} // This will work for existing image URLs
                      alt={`${index + 1}`}
                      height={100}
                      width={100}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  ) : (
                    /* eslint-disable @next/next/no-img-element */
                    <img
                      src={URL.createObjectURL(file)} // Use a regular <img> for file objects
                      alt={`${index + 1}`}
                      height={100}
                      width={100}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  )}
                  <button
                    type="button"
                    className="absolute bottom-2 right-2 p-1 bg-[#e9dbda] rounded-md"
                    onClick={() => removeImage(index)}
                  >
                    <FaTrashAlt size={20} className="text-[#364ea2]" />
                  </button>
                </div>
              ))}
            </div>
            <DropZone onChange={handleFilesChange} setImages={setImages} />
          </FormContainer>
          <div className="w-full flex justify-end gap-3 p-10">
            <Button variant="customBlue" type="submit" title="Submit">
              {isFormBtnLoading ? (
                <FormLoader /> // Small loader icon inside the button
              ) : action === 'add-attraction' ? (
                'Add'
              ) : (
                'Update'
              )}
            </Button>
            <Button
              variant="danger"
              title="Cancel"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </main>
  );
}

'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import DropZone from '@/components/ui/DropZone';
import FormLoader from '@/components/ui/FormLoader';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import Select from '@/components/ui/Select';
import TextEditor from '@/components/ui/TextEditor';
import Title from '@/components/ui/Title';
import { validationSchemaForExperiences } from '@/helpers/validationsSchema';
import AlertService from '@/services/alertService';
import {
  fetchDestinationsCategories,
  fetchRecommendationTags,
  fetchCities,
  fetchAreas,
  fetchDestinationsById,
  fileUpload,
  updateDestination,
  createDestination,
  fetchPriorities,
} from '@/services/apiService';

export default function AddExperience() {
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
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(validationSchemaForExperiences),
    defaultValues: {
      title: '',
      openingHours: '',
      closingHours: '',
      ageLimit: 1,
      mapLink: '',
      address: '',
      category: 1,
      area: '',
      city: 1,
      description: '',
      tags: [],
      priority: 1,
      images,
      bannerImageId: 1,
      bannerImage: null,
    },
  });

  const [priorities, setPriorities] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [areas, setAreas] = useState<{ id: number; name: string }[]>([]);

  const fetchInitialData = async () => {
    try {
      const [categories, tags, citiesData, areasData, priorityData] =
        await Promise.all([
          fetchDestinationsCategories(1),
          fetchRecommendationTags(),
          fetchCities(),
          fetchAreas(),
          fetchPriorities(),
        ]);

      setDestinationsCategories(
        categories.map(({ id, name }) => ({ id, name })),
      );
      setCategoriesTags(tags.map(({ id, name }) => ({ id, name })));
      setCities(citiesData.map(({ id, name }) => ({ id, name })));
      setAreas(areasData.map(({ name }) => ({ id: name, name })));
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

  const fetchExperience = async (experienceId: string) => {
    try {
      setIsLoading(true);
      const data = await fetchDestinationsById(experienceId);
      const destinationCategoryId = data.destinationCategory?.id;
      const areaId = data.area?.id;
      const priorityId = data.priority?.id;

      setValue('title', data.title);
      setValue('openingHours', data.openingHours);
      setValue('closingHours', data.closingHours);
      setValue('ageLimit', data.ageLimit);
      setValue('mapLink', data.mapLink);
      setValue('address', data.address);
      setValue('category', destinationCategoryId);
      setValue('area', areaId);
      setValue('city', data.area?.city?.id);
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
      console.error('Error fetching experience:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (action === 'edit-experience' && id) {
      void fetchExperience(id);
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
    const transformedData = {
      ...data,
      category: data.category,
      area: data.area,
      city: data.city,
      priority: data.priority,
    };

    const newImageIds = await uploadImages();

    const existingImageIds = data.images || [];
    if (newImageIds) {
    }
    setValue('images', [...existingImageIds, ...newImageIds]);

    try {
      if (action === 'edit-experience' && id) {
        const response = await updateDestination(id, transformedData);
        setIsFormLoading(false);
        if (response?.status) {
          await AlertService.alert(
            'Successful!',
            'Update Experience Success',
            'success',
            'Ok',
          );
          router.push('/discover-malaysia/top-experience');
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
            'Update Experience Success',
            'success',
            'Ok',
          );
          router.push('/discover-malaysia/top-experience');
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
  };

  const uploadImages = async () => {
    const uploadedImageIds: number[] = [];

    for (const file of images) {
      if (file instanceof File) {
        // Only upload if it's a new file
        console.log('Uploading file:', file.name);
        const response = await fileUpload(file);
        uploadedImageIds.push(response?.file?.id);
        console.log('File uploaded successfully:', file.name);
      }
    }

    return uploadedImageIds;
  };
  return (
    <main className="h-full">
      <div className="sticky top-0 bg-white w-full py-8 z-50">
        <Title>Detailed View</Title>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer>
            <p className="font-semibold mb-3">Main Info</p>
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
            <div className="mt-5 flex flex-wrap gap-4">
              <Controller
                control={control}
                name="openingHours"
                render={({ field }) => (
                  <Input
                    label="Opening Hours"
                    placeholder="Daily 9:00 Am - 9:00 Pm"
                    className="text-xs"
                    minWidth="350px"
                    {...field}
                    error={errors.openingHours?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="closingHours"
                render={({ field }) => (
                  <Input
                    label="Closing Hours"
                    placeholder="Daily 9:00 Am - 9:00 Pm"
                    className="text-xs"
                    minWidth="350px"
                    {...field}
                    error={errors.closingHours?.message}
                  />
                )}
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-4">
              <Controller
                control={control}
                name="ageLimit"
                render={({ field }) => (
                  <Input
                    label="Age Limitation"
                    placeholder="None"
                    className="text-xs"
                    minWidth="350px"
                    {...field}
                    error={errors.ageLimit?.message}
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
                name="bannerImage"
                control={control}
                defaultValue={null} // Default value for the file input
                render={({ field }) => (
                  <Input
                    label="Banner Image"
                    className="text-xs"
                    minWidth="350px"
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
            <p className="font-semibold mb-3">Location</p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <Select
                    label="City"
                    options={cities.map((p) => ({
                      value: p.id,
                      label: p.name,
                      key: p.id,
                    }))}
                    selectedValues={field.value}
                    setSelectedValues={field.onChange}
                    minWidth="350px"
                    error={errors.city?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="area"
                render={({ field }) => (
                  <Select
                    label="Area"
                    options={areas.map((p) => ({
                      value: p.id,
                      label: p.name,
                      key: p.id,
                    }))}
                    selectedValues={field.value}
                    setSelectedValues={field.onChange}
                    minWidth="350px"
                    searchable
                    error={errors.area?.message}
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
                    className="absolute top-0 right-0 p-1 bg-red-500 rounded-full"
                    onClick={() => removeImage(index)}
                  >
                    <FaTrashAlt className="text-white" />
                  </button>
                </div>
              ))}
            </div>
            <DropZone setImages={setImages} onChange={handleFilesChange} />
          </FormContainer>
          <div className="w-full flex justify-end gap-3 p-10">
            <Button
              variant="danger"
              onClick={() => {
                router.push(
                  '/discover-malaysia/top-experience/add-experiences',
                );
              }}
            >
              Cancel
            </Button>
            <Button
              variant="customBlue"
              type="submit"
              title="Submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              {isFormBtnLoading ? (
                <FormLoader /> // Small loader icon inside the button
              ) : action === 'add-experience' ? (
                'Add'
              ) : (
                'Edit'
              )}
            </Button>{' '}
          </div>
        </form>
      )}
    </main>
  );
}

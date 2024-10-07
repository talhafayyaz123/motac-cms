/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';
import * as Yup from 'yup';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Title from '@/components/ui/Title';
import AlertService from '@/services/alertService';
import { DeleteActiveMember, FetchActiveMember } from '@/services/apiService';
import { useMember } from '@/store/MemberContext';

interface Nationality {
  id: number;
  name: string;
}

interface FetchedUser {
  photo: any;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  nationality: Nationality;
  gender: string;
  profileImage?: string; // Add profileImage field for existing image
}

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  nationality: string;
  gender: string;
  profileImage?: string; // Include profile image in form values
}

export default function PersonalDetails() {
  const { currentMember, setCurrentMember } = useMember();
  const [data, setData] = useState<FetchedUser | null>(null);
  const [profileImage, setProfileImage] = useState<string | File | null>(null); // State to manage image upload
  const router = useRouter();
  const { 'User ID': userID = '' } = currentMember || {};

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    nationality: Yup.string().required('Nationality is required'),
    gender: Yup.string().required('Gender is required'),
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      nationality: '',
      gender: '',
      profileImage: '',
    },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (userID) {
          const response = await FetchActiveMember(userID);
          setData(response);
          setValue('profileImage', response?.photo?.path); // Set the existing profile image if available
        }
      } catch (error) {
        console.log(error);
      }
    };
    void loadData();
  }, [userID]);

  useEffect(() => {
    if (data) {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        nationality: data.nationality.name,
        gender: data.gender,
        profileImage: data?.photo?.path || '',
      });
    }
  }, [data, reset]);

  const handleDelete = async () => {
    try {
      const result = await AlertService.confirm(
        'Are you sure you want to delete this member?',
        'Yes, delete it!',
        'Cancel',
      );

      if (result.isConfirmed) {
        await DeleteActiveMember(userID);
        await AlertService.alert(
          'Successful!',
          'Member Deleted Successfully',
          'success',
          'Done',
        );
        localStorage.removeItem('currentTeamMember');
        setCurrentMember(null);
        router.push('/user-management/active');
      }
    } catch (error: any) {
      await AlertService.alert(
        'Error!',
        'An unexpected error occurred',
        'error',
        'OK',
      );
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setValue('profileImage', '');
  };

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted:', data);
  };

  return (
    <main className="h-full">
      <div className="sticky top-0 bg-white w-full py-8 z-50 flex justify-between">
        <Title className="text-[#051225]">Personal Details</Title>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <FormContainer>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 flex pb-40 flex-wrap gap-4"
        >
          {/* First Name */}
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                label="First Name"
                disabled
                placeholder="John"
                className="text-xs"
                minWidth="350px"
                {...field}
                error={errors.firstName?.message}
              />
            )}
          />

          {/* Last Name */}
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                label="Last Name"
                disabled
                placeholder="Doe"
                className="text-xs"
                minWidth="350px"
                {...field}
                error={errors.lastName?.message}
              />
            )}
          />

          {/* Phone Number */}
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                label="Phone Number"
                disabled
                placeholder="+60 12-345 6789"
                className="text-xs"
                minWidth="350px"
                {...field}
                error={errors.phoneNumber?.message}
              />
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label="Email"
                disabled
                placeholder="johndoe@gmail.com"
                className="text-xs"
                minWidth="350px"
                {...field}
                error={errors.email?.message}
              />
            )}
          />

          {/* Nationality */}
          <Controller
            name="nationality"
            control={control}
            render={({ field }) => (
              <Input
                label="Nationality"
                disabled
                placeholder="United Kingdom"
                className="text-xs"
                minWidth="350px"
                {...field}
                error={errors.nationality?.message}
              />
            )}
          />

          {/* Gender */}
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Input
                label="Gender"
                disabled
                placeholder="Male"
                className="text-xs"
                minWidth="350px"
                {...field}
                error={errors.gender?.message}
              />
            )}
          />

          {/* Image upload */}
          <div className="w-full flex flex-col items-start gap-3 mt-5">
            {profileImage ? (
              <div className="relative">
                {typeof profileImage === 'string' ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-40 h-40 object-cover rounded-md"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    className="w-40 h-40 object-cover rounded-md"
                  />
                )}
                <button
                  type="button"
                  className="absolute bottom-2 right-2 p-1 bg-[#e9dbda] rounded-md"
                  onClick={handleRemoveImage}
                >
                  <FaTrashAlt size={20} className="text-[#364ea2]" />
                </button>
              </div>
            ) : (
              <Controller
                name="profileImage"
                control={control}
                render={() => (
                  <Input
                    label="Upload Profile Image"
                    className="text-xs"
                    minWidth="350px"
                    isFileUploaded
                    type="file"
                    defaultImagePath={watch('profileImage')}
                    onFileError={async () => {
                      await AlertService.alert(
                        '',
                        'Only images with 16:9 aspect ratio are allowed',
                        'warning',
                        'OK',
                      );
                    }}
                  />
                )}
              />
            )}
          </div>
        </form>
      </FormContainer>
    </main>
  );
}

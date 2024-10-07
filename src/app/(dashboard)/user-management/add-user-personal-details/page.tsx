'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Title from '@/components/ui/Title';
import AlertService from '@/services/alertService';
import { DeleteActiveMember } from '@/services/apiService';
import { useMember } from '@/store/MemberContext';

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  nationality: string;
}

export default function PersonalDetails() {
  const { currentMember, setCurrentMember } = useMember();

  const router = useRouter();

  const {
    'User ID': userID = '',
    'First Name': firstName = '',
    'Last Name': lastName = '',
    Email = '',
    'Phone Number': phoneNumber = '',
    Nationality = '',
  } = currentMember || {};

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    nationality: Yup.string().required('Nationality is required'),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      nationality: '',
    },
  });

  useEffect(() => {
    if (currentMember) {
      reset({
        firstName,
        lastName,
        phoneNumber,
        email: Email,
        nationality: Nationality,
      });
    }
  }, [
    currentMember,
    reset,
    firstName,
    lastName,
    phoneNumber,
    Email,
    Nationality,
  ]);

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

          {/* Gender - static field */}
          <Input
            label="Gender"
            disabled
            placeholder="Male"
            className="text-xs"
            minWidth="350px"
          />

          {/* Image upload */}
          <Input
            label="View Image"
            className="text-xs"
            disabled
            minWidth="350px"
            type="file"
            onFileError={async () => {
              try {
                await AlertService.alert(
                  '',
                  'Only images with 16:9 aspect ratio are allowed',
                  'warning',
                  'OK',
                );
              } catch (error) {
                console.log('something went wrong');
              }
            }}
            onChange={(e) => {
              const input = e.target as HTMLInputElement;
              if (input.files && input.files[0]) {
                console.log('Image uploaded successfully', input.files[0]);
              }
            }}
          />
        </form>
      </FormContainer>
    </main>
  );
}

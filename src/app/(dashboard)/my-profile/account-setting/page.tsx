/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import Select from '@/components/ui/Select';
import AlertService from '@/services/alertService';
import {
  fetchSpecificTeamMember,
  UpdateTeamMember,
} from '@/services/apiService';

interface TeamMember {
  id: number;
  designation: string;
  firstName: string;
  company: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  photo: string | null;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phoneNumber?: string;
}

function AccountSettings() {
  const router = useRouter();
  const [data, setData] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const loadData = async () => {
    try {
      setLoading(true);

      // @ts-expect-error
      const userId = session?.user?.id;

      if (userId) {
        const response = await fetchSpecificTeamMember(userId);
        setData(response);
      } else {
        console.log('User ID not found');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const [settingComponent, setSettingComponent] =
    useState<string>('Account Setting');

  const handleSettingChange = (
    value: string | number | (string | number)[],
  ) => {
    if (typeof value === 'string') {
      setSettingComponent(value);

      if (value === 'Security Setting') {
        router.push('/my-profile/security-setting');
      } else {
        router.push('/my-profile/account-setting');
      }
    }
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    company: Yup.string().required('Company is required'),
    phoneNumber: Yup.string(),
  });

  // react-hook-form initialization
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company,
        phoneNumber: data.phoneNumber || '',
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: FormValues) => {
    const { email, ...updatedValues } = values;
    try {
      const response: any = await UpdateTeamMember({
        data: updatedValues,
        // @ts-expect-error
        id: session?.user?.id,
      });

      if (response?.error) {
        await AlertService.alert('Error!', response.error, 'error', 'OK');
      } else if (response?.id) {
        void loadData();
        await AlertService.alert(
          'Successful!',
          'Member Updated Successfully',
          'success',
          'Done',
        );
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      await AlertService.alert(
        'Error!',
        'An unexpected error occurred',
        'error',
        'OK',
      );
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <FormContainer className="border border-blue-100 relative mt-14">
      <div className="w-1/5 absolute top-[-25px]">
        <Select
          options={[
            { value: 'Account Setting', label: 'Account Setting' },
            { value: 'Security Setting', label: 'Security Setting' },
          ]}
          selectedValues={settingComponent}
          setSelectedValues={handleSettingChange as any}
          minWidth="200px"
          profile
        />
      </div>
      <div className="h-28 w-28 rounded-full border border-blue-100 mt-10 flex items-center justify-center relative">
        <Image height={60} alt="user" width={60} src="/user_icon.svg" />
        <Image
          height={40}
          alt="user"
          width={40}
          src="/camera_icon.svg"
          className="absolute right-[-10px] bottom-0"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-wrap gap-4 w-[75%]"
      >
        {/* First Name */}
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Input
              label="First Name"
              placeholder="First Name"
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
              placeholder="Last Name"
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
              placeholder="+66 123 456 789"
              className="text-xs"
              minWidth="350px"
              {...field}
              icon={
                <Image
                  alt="flag"
                  height={25}
                  width={25}
                  src="/malaysia_flag.png"
                />
              }
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
              label="Email Address"
              placeholder="Email"
              className="text-xs"
              minWidth="350px"
              {...field}
              disabled
              error={errors.email?.message}
            />
          )}
        />

        {/* Company */}
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <Input
              label="Company"
              placeholder="Company"
              className="text-xs"
              minWidth="350px"
              {...field}
              error={errors.company?.message}
            />
          )}
        />

        <div className="w-full flex justify-start mt-8 mb-16">
          <Button
            minWidth="160px"
            variant="customBlue"
            type="submit"
            disabled={isSubmitting}
          >
            Update
          </Button>
        </div>
      </form>
    </FormContainer>
  );
}

export default AccountSettings;

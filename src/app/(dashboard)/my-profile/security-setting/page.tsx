/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import AlertService from '@/services/alertService';
import { resetPassword } from '@/services/apiService';

// Define the validation schema
const schema = yup
  .object({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup
      .string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required('Please confirm your password'),
  })
  .required();

function SecuritySettings() {
  const router = useRouter();
  const { data: session } = useSession();

  const [settingComponent, setSettingComponent] =
    useState<string>('Security Setting');

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

  // Use react-hook-form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      // @ts-ignore
      const response: ResetPasswordResponse = await resetPassword({
        ...data,
        email: session?.user?.email,
      });

      console.log('Password reset successful', response);
      await AlertService.alert(
        'Successful!',
        'Password reset successfully.',
        'success',
        'OK',
      );
    } catch (error) {
      console.error('Error resetting password:', error);
      await AlertService.alert(
        'Error!',
        'An unexpected error occurred while resetting the password.',
        'error',
        'OK',
      );
    }
  };

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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 flex flex-wrap gap-4 w-[75%]">
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <Input
                label="Current Password"
                placeholder="********"
                className="text-xs"
                minWidth="350px"
                type="password"
                {...field}
                error={errors.currentPassword?.message}
              />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Input
                label="New Password"
                placeholder="********"
                className="text-xs"
                minWidth="350px"
                type="password"
                {...field}
                error={errors.newPassword?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                label="Confirm Password"
                placeholder="********"
                className="text-xs"
                minWidth="350px"
                type="password"
                {...field}
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </div>
        <div className="w-full flex justify-start mt-8 mb-52">
          <Button minWidth="160px" variant="customBlue" type="submit">
            Update
          </Button>
        </div>
      </form>
    </FormContainer>
  );
}

export default SecuritySettings;

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Formik, Form } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
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

function AccountSettings() {
  const router = useRouter();
  const [data, setData] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  console.log(data);

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

  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    company: Yup.string().required('Company is required'),
  });

  // Initial values fetched from the session
  const initialValues = {
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    company: data?.company || '',
    phoneNumber: data?.phoneNumber || '',
  };

  const handleUpdate = async (values: any, { setSubmitting }: any) => {
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
    } finally {
      setSubmitting(false);
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
          setSelectedValues={handleSettingChange}
          minWidth="200px"
          profile
        />
      </div>
      <div className="h-28 w-28 rounded-full border border-blue-100 mt-10"></div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdate}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className="mt-10 flex flex-wrap gap-4 w-[75%]">
            <Input
              label="First Name"
              name="firstName"
              placeholder="First Name"
              className="text-xs"
              minWidth="350px"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.firstName && errors.firstName
                  ? errors.firstName
                  : undefined
              }
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              className="text-xs"
              minWidth="350px"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.lastName && errors.lastName
                  ? errors.lastName
                  : undefined
              }
            />
            <Input
              label="Phone Number"
              name="phoneNumber"
              placeholder="+66 123 456 789"
              className="text-xs"
              minWidth="350px"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              icon={
                <Image
                  alt="flag"
                  height={25}
                  width={25}
                  src="/malaysia_flag.png"
                />
              }
              error={
                touched.phoneNumber && errors.phoneNumber
                  ? errors.phoneNumber
                  : undefined
              }
            />
            <Input
              label="Email Address"
              name="email"
              placeholder="Email"
              className="text-xs"
              minWidth="350px"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled
              error={touched.email && errors.email ? errors.email : undefined}
            />
            <Input
              label="Company"
              name="company"
              placeholder="Company"
              className="text-xs"
              minWidth="350px"
              value={values.company}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.company && errors.company ? errors.company : undefined
              }
            />

            <div className="w-full flex justify-start mt-8 mb-16">
              <Button minWidth="160px" variant="customBlue" type="submit">
                Update
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}

export default AccountSettings;

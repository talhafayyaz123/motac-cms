'use client';

import { Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Title from '@/components/ui/Title';
import AlertService from '@/services/alertService';
import { DeleteActiveMember } from '@/services/apiService';
import { useMember } from '@/store/MemberContext';

export default function PersonalDetails() {
  const { currentMember, setCurrentMember } = useMember();

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

  const initialValues = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: Email,
    nationality: Nationality,
  };

  const handleDelete = async () => {
    try {
      const response: any = await DeleteActiveMember(userID);
      console.log(response);

      if (response?.error) {
        await AlertService.alert('Error!', response.error, 'error', 'OK');
      } else if (response?.id) {
        await AlertService.alert(
          'Successful!',
          'Member Deleted Successfully',
          'success',
          'Done',
        );
        localStorage.removeItem('currentTeamMember');
        setCurrentMember(null);
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => console.log('hello')}
          enableReinitialize={true}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="mt-5 flex pb-40 flex-wrap gap-4">
              <Input
                label="First Name"
                name="firstName"
                placeholder="John"
                disabled
                className="text-xs"
                minWidth="350px"
                value={values.firstName}
                onChange={(e) => setFieldValue('firstName', e.target.value)}
                error={
                  touched.firstName && typeof errors.firstName === 'string'
                    ? errors.firstName
                    : undefined
                }
              />

              <Input
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                disabled
                className="text-xs"
                minWidth="350px"
                value={values.lastName}
                onChange={(e) => setFieldValue('lastName', e.target.value)}
                error={
                  touched.lastName && typeof errors.lastName === 'string'
                    ? errors.lastName
                    : undefined
                }
              />

              <Input
                label="Phone Number"
                name="phoneNumber"
                disabled
                placeholder="+60 12-345 6789"
                className="text-xs"
                minWidth="350px"
                value={values.phoneNumber}
                onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
                error={
                  touched.phoneNumber && typeof errors.phoneNumber === 'string'
                    ? errors.phoneNumber
                    : undefined
                }
              />

              <Input
                label="Email"
                disabled
                name="email"
                placeholder="johndoe@gmail.com"
                className="text-xs"
                minWidth="350px"
                value={values.email}
                onChange={(e) => setFieldValue('email', e.target.value)}
                error={
                  touched.email && typeof errors.email === 'string'
                    ? errors.email
                    : undefined
                }
              />

              <Input
                label="Nationality"
                disabled
                name="nationality"
                placeholder="United Kingdom"
                className="text-xs"
                minWidth="350px"
                value={values.nationality}
                onChange={(e) => setFieldValue('nationality', e.target.value)}
                error={
                  touched.nationality && typeof errors.nationality === 'string'
                    ? errors.nationality
                    : undefined
                }
              />

              <Input
                label="Gender"
                disabled
                placeholder="Male"
                className="text-xs"
                minWidth="350px"
              />
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
                    console.log('something went wrong ');
                  }
                }}
                onChange={(e) => {
                  const input = e.target as HTMLInputElement;
                  if (input.files && input.files[0]) {
                    console.log('Image uploaded successfully', input.files[0]);
                  }
                }}
              />
            </Form>
          )}
        </Formik>
      </FormContainer>
    </main>
  );
}

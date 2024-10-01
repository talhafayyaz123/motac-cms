/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Title from '@/components/ui/Title';
import AlertService from '@/services/alertService';
import {
  fetchTeamDesignations,
  fetchTeamRoles,
  AddTeamMember,
  UpdateTeamMember,
} from '@/services/apiService';
import { useTeamMember } from '@/store/TeamMemberContext';

interface Option {
  value: string;
  label: string;
}

export default function AddTeamMemberPage() {
  const { currentTeamMember, setCurrentTeamMember } = useTeamMember();

  const {
    ID = '',
    'First Name': firstName = '',
    'Last Name': lastName = '',
    'Email Address': emailAddress = '',
    Role = '',
    Designation = '',
  } = currentTeamMember || {};

  const [designation, setDesignation] = useState<Option[]>([]);
  const [role, setRole] = useState<Option[]>([]);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const fetchedData = await fetchTeamRoles();
        setRole(fetchedData);
      } catch (error) {
        console.error('Error loading roles:', error);
      }
    };

    const loadDesignations = async () => {
      try {
        const fetchedData = await fetchTeamDesignations();
        setDesignation(fetchedData);
      } catch (error) {
        console.error('Error loading designations:', error);
      }
    };

    void loadRoles();
    void loadDesignations();
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    company: Yup.string().required('Company is required'),
    designationId: Yup.string().required('Designation is required'),
    roleId: Yup.string().required('Role is required'),
  });

  const initialValues = {
    firstName: firstName,
    lastName: lastName,
    email: emailAddress,
    company: '',
    designationId:
      designation.filter((item: any) => item.label === Designation)[0]?.value ||
      '',
    roleId: role.filter((item: any) => item.label === Role)[0]?.value || '',
    password: '123456',
    statusId: 1,
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any,
  ) => {
    try {
      const response: any = await AddTeamMember(values);

      if (response?.error) {
        await AlertService.alert('Error!', response.error, 'error', 'OK');
      } else if (response?.id) {
        await AlertService.alert(
          'Successful!',
          'Member Added Successfully',
          'success',
          'Done',
        );
        resetForm();
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

  const handleUpdate = async (
    values: any,
    { setSubmitting, resetForm }: any,
  ) => {
    try {
      const { email, password, ...updatedValues } = values;
      const response: any = await UpdateTeamMember({
        data: updatedValues,
        id: ID,
      });

      if (response?.error) {
        await AlertService.alert('Error!', response.error, 'error', 'OK');
      } else if (response?.id) {
        await AlertService.alert(
          'Successful!',
          'Member Updated Successfully',
          'success',
          'Done',
        );
        localStorage.removeItem('currentTeamMember');
        setCurrentTeamMember(null);
        resetForm();
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

  return (
    <main className="h-full">
      <div className="sticky top-0 bg-white w-full py-8 z-50">
        <Title>Member Detail</Title>
      </div>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={ID ? handleUpdate : handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, setFieldValue, values, errors, touched }) => {
            return (
              <Form>
                <div className="mt-5 flex flex-wrap gap-4">
                  {/* First Name */}
                  <Input
                    label="First Name*"
                    name="firstName"
                    placeholder="John"
                    className="text-xs"
                    minWidth="350px"
                    value={values.firstName}
                    onChange={(e) => setFieldValue('firstName', e.target.value)}
                    error={
                      typeof errors.firstName === 'string'
                        ? errors.firstName
                        : undefined
                    }
                  />

                  {/* Last Name */}
                  <Input
                    label="Last Name*"
                    name="lastName"
                    placeholder="Doe"
                    className="text-xs"
                    minWidth="350px"
                    value={values.lastName}
                    onChange={(e) => setFieldValue('lastName', e.target.value)}
                    error={
                      typeof errors.lastName === 'string'
                        ? errors.lastName
                        : undefined
                    }
                  />

                  {/* Designation */}
                  <Select
                    label="Designation*"
                    name="designationId"
                    options={designation}
                    selectedValues={
                      typeof values?.designationId === 'number'
                        ? designation[values?.designationId - 1]?.label
                        : ''
                    }
                    setSelectedValues={(value) =>
                      setFieldValue('designationId', value)
                    }
                    error={
                      touched.designationId && errors.designationId
                        ? errors.designationId
                        : ''
                    }
                    minWidth="350px"
                  />

                  {/* Email */}
                  <Input
                    label="Work Email Address*"
                    sublabel="(Please Add Work Email Only)"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    className="text-xs"
                    minWidth="350px"
                    value={values.email}
                    onChange={(e) => setFieldValue('email', e.target.value)}
                    error={
                      typeof errors.email === 'string'
                        ? errors.email
                        : undefined
                    }
                  />

                  {/* Company */}
                  <Input
                    label="Company*"
                    name="company"
                    placeholder="Organization"
                    className="text-xs"
                    minWidth="350px"
                    value={values.company}
                    onChange={(e) => setFieldValue('company', e.target.value)}
                    error={
                      touched.company && errors.company ? errors.company : ''
                    }
                  />

                  {/* Role */}
                  <Select
                    label="Role*"
                    name="roleId"
                    options={role}
                    selectedValues={
                      typeof values?.roleId === 'number'
                        ? role[values?.roleId - 1]?.label
                        : ''
                    }
                    setSelectedValues={(value) =>
                      setFieldValue('roleId', value)
                    }
                    error={touched.roleId && errors.roleId ? errors.roleId : ''}
                    minWidth="350px"
                  />
                </div>

                <div className="w-full flex justify-end gap-3 p-10">
                  <Button variant="danger" type="button">
                    Cancel
                  </Button>
                  {ID ? (
                    <Button
                      variant="customBlue"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Updating...' : 'Update'}
                    </Button>
                  ) : (
                    <Button
                      variant="customBlue"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </FormContainer>
    </main>
  );
}

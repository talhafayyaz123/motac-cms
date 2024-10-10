'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader'; // Assuming you have a loader component
import Select from '@/components/ui/Select';
import Title from '@/components/ui/Title';
import AlertService from '@/services/alertService';
import {
  fetchTeamDesignations,
  fetchTeamRoles,
  AddTeamMember,
  UpdateTeamMember,
  fetchSpecificTeamMember,
} from '@/services/apiService';
import { useMember } from '@/store/MemberContext';

interface Option {
  value: string;
  label: string;
}

export default function AddTeamMemberPage() {
  const router = useRouter();
  const { currentMember, setCurrentMember } = useMember();

  const { ID = '' } = currentMember || {};

  const [designation, setDesignation] = useState<Option[]>([]);
  const [role, setRole] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // New loader state

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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      designationId: '',
      roleId: '',
    },
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    const loadMemberData = async () => {
      setLoading(true); // Set loader to true before starting to fetch
      try {
        const [fetchedRoles, fetchedDesignations, fetchedMember] =
          await Promise.all([
            fetchTeamRoles(),
            fetchTeamDesignations(),
            ID ? fetchSpecificTeamMember(Number(ID)) : Promise.resolve(null),
          ]);

        setRole(fetchedRoles);
        setDesignation(fetchedDesignations);

        if (fetchedMember) {
          reset({
            firstName: fetchedMember.firstName || '',
            lastName: fetchedMember.lastName || '',
            email: fetchedMember.email || '',
            company: fetchedMember.company || '',
            designationId:
              fetchedDesignations.find(
                (item: Option) => item.label === fetchedMember.designation,
              )?.value || '',
            roleId:
              fetchedRoles.find(
                (item: Option) => item.label === fetchedMember.role,
              )?.value || '',
          });
        }
      } catch (error) {
        console.error(
          'Error loading roles, designations, or member data:',
          error,
        );
      } finally {
        setLoading(false); // Set loader to false after fetching completes
      }
    };

    void loadMemberData();
  }, [ID, reset]);

  const onSubmit = async (values: any) => {
    const payload = {
      ...values,
      designationId: Number(values?.designationId),
      roleId: Number(values?.roleId),
      password: '123456',
      statusId: 1,
    };

    if (ID) {
      return handleUpdate(payload);
    } else {
      return handleAdd(payload);
    }
  };

  const handleAdd = async (values: any) => {
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
        reset();
        router.push('/my-team');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      await AlertService.alert(
        'Error!',
        'An unexpected error occurred',
        'error',
        'OK',
      );
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      const { ...updatedValues } = values;
      delete updatedValues['email'];
      delete updatedValues['password'];
      const response: any = await UpdateTeamMember({
        data: updatedValues,
        id: ID,
      });

      if (response?.error) {
        localStorage.removeItem('currentTeamMember');
        setCurrentMember(null);
        await AlertService.alert('Error!', response.error, 'error', 'OK');
      } else if (response?.id) {
        await AlertService.alert(
          'Successful!',
          'Member Updated Successfully',
          'success',
          'Done',
        );
        localStorage.removeItem('currentTeamMember');
        setCurrentMember(null);
        reset();
        router.push('/my-team');
      }
    } catch (error) {
      localStorage.removeItem('currentTeamMember');
      setCurrentMember(null);
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
    return <Loader />; // Display loader while fetching roles and designations
  }

  return (
    <main className="h-full">
      <div className="sticky top-0 bg-white w-full py-8 z-50">
        <Title>Member Details</Title>
      </div>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 flex flex-wrap gap-4">
            {/* First Name */}
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  label="First Name*"
                  placeholder="John"
                  className="text-xs"
                  minWidth="350px"
                  {...field}
                  error={errors.firstName?.message as string | undefined}
                />
              )}
            />

            {/* Last Name */}
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  label="Last Name*"
                  placeholder="Doe"
                  className="text-xs"
                  minWidth="350px"
                  {...field}
                  error={errors.lastName?.message as string | undefined}
                />
              )}
            />

            {/* Designation */}
            <Controller
              name="designationId"
              control={control}
              render={({ field }) => (
                <Select
                  label="Designation*"
                  options={designation}
                  selectedValues={field.value}
                  setSelectedValues={field.onChange}
                  error={errors.designationId?.message}
                  minWidth="350px"
                />
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  label="Work Email Address*"
                  sublabel="(Please Add Work Email Only)"
                  placeholder="johndoe@gmail.com"
                  className="text-xs"
                  minWidth="350px"
                  {...field}
                  disabled={!!ID}
                  error={errors.email?.message as string | undefined}
                />
              )}
            />

            {/* Company */}
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <Input
                  label="Company*"
                  placeholder="Organization"
                  className="text-xs"
                  minWidth="350px"
                  {...field}
                  error={errors.company?.message as string | undefined}
                />
              )}
            />

            {/* Role */}
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => (
                <Select
                  label="Role*"
                  options={role}
                  selectedValues={field.value}
                  setSelectedValues={field.onChange}
                  error={errors.roleId?.message}
                  minWidth="350px"
                />
              )}
            />
          </div>

          <div className="w-full flex justify-end gap-3 p-10">
            <Button
              variant="danger"
              type="button"
              onClick={() => {
                router.push('/my-team');
                localStorage.removeItem('currentTeamMember');
                setCurrentMember(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="customBlue" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? ID
                  ? 'Updating...'
                  : 'Saving...'
                : ID
                  ? 'Update'
                  : 'Save'}
            </Button>
          </div>
        </form>
      </FormContainer>
    </main>
  );
}

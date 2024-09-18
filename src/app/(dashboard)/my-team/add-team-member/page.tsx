'use client';

import React, { useState } from 'react';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Title from '@/components/ui/Title';

export default function AddTeamMember() {
  const [designation, setDesignation] = useState('');
  const [role, setRole] = useState('');

  return (
    <main className="h-full">
      <div className="sticky top-0 bg-white w-full py-8 z-50">
        <Title>Member Detail</Title>
      </div>
      <FormContainer>
        <div className="mt-5 flex flex-wrap gap-4">
          <Input
            label="First Name*"
            placeholder="Jhon"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Last Name*"
            placeholder="Doe"
            className="text-xs"
            minWidth="350px"
          />
          <Select
            label="Designation*"
            options={[
              { value: 'ceo', label: 'Ceo' },
              { value: 'coo', label: 'Coo' },
            ]}
            selectedValues={designation}
            setSelectedValues={setDesignation}
            minWidth="350px"
          />
          <Input
            label="Work Email Address*"
            sublabel="(Please Add Work Email Only)"
            placeholder="johndoe@gmail.com"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Company*"
            placeholder="Organization"
            className="text-xs"
            minWidth="350px"
          />
          <Select
            label="Role*"
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'User' },
              { value: 'guest', label: 'Guest' },
            ]}
            selectedValues={role}
            setSelectedValues={setRole}
            minWidth="350px"
          />
        </div>

        <div className="w-full flex justify-end gap-3 p-10">
          <Button variant="danger">Cancel</Button>
          <Button variant="customBlue">Save</Button>
        </div>
      </FormContainer>
    </main>
  );
}

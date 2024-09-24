'use client';

import React from 'react';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Title from '@/components/ui/Title';
import AlertService from '@/services/alertService';

export default function PersonalDetails() {
  return (
    <main className="h-full">
      <div className="sticky top-0 bg-white w-full py-8 z-50 flex justify-between">
        <Title className="text-[#051225]">Personal Details</Title>
        <div className="flex gap-2">
          <Button variant="secondary">Delete</Button>
          <Button variant="customBlue">Send Reset Password Link</Button>
        </div>
      </div>
      <FormContainer>
        <div className="mt-5 flex pb-40 flex-wrap gap-4">
          <Input
            label="First Name"
            placeholder="Jhon"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Phone Number"
            placeholder="+60 12-345 6789"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Email"
            placeholder="johndoe@gmail.com"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Date Of Birth"
            placeholder="11/9/1991"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Nationality"
            placeholder="United Kingdom"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Gender"
            placeholder="Male"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="View Image"
            className="text-xs"
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
        </div>
      </FormContainer>
    </main>
  );
}

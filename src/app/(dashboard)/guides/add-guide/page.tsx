'use client';

import React from 'react';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextEditor from '@/components/ui/TextEditor';
import Title from '@/components/ui/Title';

export default function AddGuide() {
  return (
    <main className="h-full px-8 ">
      <div className="sticky top-0 bg-white w-full py-8 z-50">
        <Title>Detailed View</Title>
      </div>
      <FormContainer>
        <p className="font-semibold mb-3">Main Info</p>
        <Input
          label="Guide Name"
          placeholder="Explore the Petronas Twin Towers"
          className="text-xs"
        />
        <TextEditor />
        <div className="mt-5 flex flex-wrap gap-4">
          <Input
            label="City"
            placeholder="Kuala Lumpur"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Area"
            placeholder="Kuala Lumpur City Centre (KLCC), 43 Jalan Ampan"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Address"
            placeholder="Kuala Lumpur City Centre (KLCC), 43 Jalan Ampan"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Category"
            placeholder="Cultural Attraction"
            className="text-xs"
            minWidth="350px"
          />
        </div>
      </FormContainer>
      <div className="w-full flex justify-end gap-3 p-10">
        <Button variant="danger">Cancel</Button>
        <Button variant="customBlue">Add</Button>
      </div>
    </main>
  );
}

'use client';

import React from 'react';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Title from '@/components/ui/Title';
import AlertService from '@/services/alertService';

export default function AddProduct() {
  return (
    <main className="h-full px-8 ">
      <div className="sticky top-0 bg-white w-full py-8 z-50">
        <Title>Add Product</Title>
      </div>
      <FormContainer>
        <div className="mt-5 flex flex-wrap gap-4">
          <Input
            label="Product Image"
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
          <Input
            label="Product ID"
            placeholder="Art101"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Product Name"
            placeholder="Batu Caves Painting"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Product Category"
            placeholder="None"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Product Price"
            placeholder="MYR 250"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Product Upload Date"
            placeholder="09/15/25"
            className="text-xs"
            minWidth="350px"
            type="date"
          />
          <Input
            label="About Section"
            placeholder="Image"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Headline"
            placeholder="Google Maps"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Tags"
            placeholder="Food, Nature, Travel"
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

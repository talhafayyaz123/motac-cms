'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import DropZone from '@/components/ui/DropZone';
import Input from '@/components/ui/Input';
import TextEditor from '@/components/ui/TextEditor';
import Title from '@/components/ui/Title';
import AlertService from '@/services/alertService';

export default function AddEvent() {
  const router = useRouter();

  const [images, setImages] = useState<File[]>([]);

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleFilesChange = (files: File[]) => {
    console.log('New valid files added:', files);
  };
  return (
    <main className="h-full">
      <div className="sticky top-0 bg-white w-full py-8 z-50">
        <Title className="text-[#051225] font-medium">Detailed View</Title>
      </div>
      <FormContainer>
        <p className="font-semibold mb-3 text-[#181819]">Main Info</p>
        <Input
          label="Title"
          placeholder="Explore the Petronas Twin Towers"
          className="text-xs mb-3"
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
            label="Location"
            placeholder="Kuala Lumpur City Centre (KLCC), 43 Jalan Ampan"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Opening Hours / Closing Hours"
            placeholder="Daily 9:00 Am - 9:00 Pm"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Age Limitation"
            placeholder="None"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Category"
            placeholder="Skycraper"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Book Event Link"
            placeholder="www.penangfoodfest.com"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Banner Image"
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
            label="Map Link"
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
      <FormContainer className="mt-5">
        <p className="font-semibold mb-3">Images</p>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {images.map((file, index) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                height={100}
                width={100}
                className="rounded-lg object-cover w-full h-auto aspect-[16/9]"
              />

              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-white text-blue-700 p-2 rounded-full shadow-md"
              >
                <FaTrashAlt />
              </button>
              <p className="text-center mt-2 text-sm text-gray-500">
                {file.name}
              </p>
            </div>
          ))}
        </div>
        <DropZone setImages={setImages} onChange={handleFilesChange} />
      </FormContainer>
      <div className="w-full flex justify-end gap-3 p-10">
        <Button
          variant="danger"
          onClick={() => {
            router.push('/discover-malaysia/happening-events');
          }}
        >
          Cancel
        </Button>
        <Button variant="customBlue">Add</Button>
      </div>
    </main>
  );
}

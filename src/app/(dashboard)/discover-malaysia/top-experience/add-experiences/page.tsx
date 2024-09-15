'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import DropZone from '@/components/ui/DropZone';
import Input from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import TextEditor from '@/components/ui/TextEditor';
import Title from '@/components/ui/Title';

export default function AddAttraction() {
  const [images, setImages] = useState<File[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [categoty, setCategory] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [area, setArea] = useState<string>('');

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <main className="h-full">
      <div className="sticky top-0 bg-white w-full py-8 z-50">
        <Title>Detailed View</Title>
      </div>
      <FormContainer>
        <p className="font-semibold mb-3">Main Info</p>
        <Input
          label="Title"
          placeholder="Explore the Petronas Twin Towers"
          className="text-xs"
        />
        <TextEditor />
        <div className=" w-1/4 my-5">
          <Input
            label="Opening Hours / Closing Hours"
            placeholder="Daily 9:00 Am - 9:00 Pm"
            className="text-xs"
            minWidth="350px"
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-4">
          <Input
            label="Age Limitation"
            placeholder="None"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Book Event Link"
            placeholder="www.bookbatucaves.com"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Event Date"
            placeholder="09/15/25"
            className="text-xs"
            minWidth="350px"
            type="date"
          />
          <Select
            label="Category"
            options={[{ value: 'Cultural', label: 'Cultural' }]}
            selectedValues={categoty}
            setSelectedValues={setCategory}
            minWidth="350px"
          />
          <Input
            label="Banner Image"
            className="text-xs"
            minWidth="350px"
            type="file"
          />
          <Input
            label="Map Link"
            placeholder="Google Maps"
            className="text-xs"
            minWidth="350px"
          />

          <Select
            label="Tags"
            options={[
              { value: 'Food', label: 'Food' },
              { value: 'Travel', label: 'Travel' },
              { value: 'Nature', label: 'Nature' },
            ]}
            selectedValues={selectedTags}
            multiple
            setSelectedValues={setSelectedTags}
            minWidth="350px"
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-4">
          <Select
            label="City"
            options={[{ value: 'Kuala Lumpur', label: 'Kuala Lumpur' }]}
            selectedValues={city}
            setSelectedValues={setCity}
            minWidth="350px"
          />
          <Select
            label="Area"
            options={[
              { value: 'Kuala Lumpur', label: 'Kuala Lumpur' },
              { value: 'Lumpur', label: 'Lumpur' },
            ]}
            selectedValues={area}
            setSelectedValues={setArea}
            minWidth="350px"
            searchable
          />
          <Input
            label="Address"
            placeholder="Daily 9:00 Am - 9:00 Pm"
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
                className="rounded-lg object-cover w-full h-32"
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
        <DropZone images={images} setImages={setImages} />
      </FormContainer>
      <div className="w-full flex justify-end gap-3 p-10">
        <Button variant="danger">Cancel</Button>
        <Button variant="customBlue">Add</Button>
      </div>
    </main>
  );
}

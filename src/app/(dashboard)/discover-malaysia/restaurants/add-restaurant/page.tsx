'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
// import Select from '@/components/ui/Select';
import Title from '@/components/ui/Title';
import AlertService from '@/services/alertService';

export default function AddRestaurant() {
  const router = useRouter();

  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // const [categoty, setCategory] = useState<string>('');
  // const [city, setCity] = useState<string>('');
  // const [area, setArea] = useState<string>('');

  return (
    <main className="h-full">
      <div className="sticky top-0 bg-white w-full py-8 z-50">
        <Title className="text-[#051225] font-medium">Detailed View</Title>
      </div>
      <FormContainer>
        <Input
          label="Restaurant Name"
          placeholder="Seri Melaka"
          className="text-xs mb-3"
        />
        <Input
          label="Description"
          placeholder="A Cozy Restaurant Serving Authenticmalay Cuisine In A Traditional Setting."
          className="text-xs"
        />
        <div className="mt-5 flex flex-wrap gap-4">
          {/* <Select
            label="Category"
            options={[{ value: 'Cultural', label: 'Cultural' }]}
            selectedValues={categoty}
            setSelectedValues={setCategory}
            minWidth="350px"
          /> */}
          <Input
            label="Opening Hours / Closing Hours"
            placeholder="Daily 9:00 Am - 9:00 Pm"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Map Link"
            placeholder="Google Maps"
            className="text-xs"
            minWidth="350px"
          />
          {/* <Select
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
          /> */}
          <Input
            label="Banner Image"
            className="text-xs"
            minWidth="350px"
            type="file"
            onFileError={async () => {
              try {
                await AlertService.alert(
                  '',
                  'Only images of pixels 1920x1080 is allowed',
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
        <p className="mt-5 text-md text-[#181819] font-normal">Location</p>
        <div className="mt-5 flex flex-wrap gap-4">
          {/* <Select
            label="City"
            options={[{ value: 'Kuala Lumpur', label: 'Kuala Lumpur' }]}
            selectedValues={city}
            setSelectedValues={setCity}
            minWidth="350px"
          /> */}
          {/* <Select
            label="Area"
            options={[
              { value: 'Kuala Lumpur', label: 'Kuala Lumpur' },
              { value: 'Lumpur', label: 'Lumpur' },
            ]}
            selectedValues={area}
            setSelectedValues={setArea}
            minWidth="350px"
            searchable
          /> */}
          <Input
            label="Address"
            placeholder="Kuala Lumpur City Centre (KLCC), 43 Jalan Ampan"
            className="text-xs"
            minWidth="350px"
          />
        </div>
      </FormContainer>
      <div className="w-full flex justify-end gap-3 p-10">
        <Button
          variant="danger"
          onClick={() => {
            router.push('/discover-malaysia/restaurants');
          }}
        >
          Cancel
        </Button>
        <Button variant="customBlue">Add</Button>
      </div>
    </main>
  );
}

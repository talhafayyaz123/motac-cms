import React from 'react';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Title from '@/components/ui/Title';

export default function AddRestaurant() {
  return (
    <main className="h-full px-8 ">
      <div className="sticky top-0 bg-white w-full py-8 z-50">
        <Title className="text-[#051225] font-medium">Detailed View</Title>
      </div>
      <FormContainer>
        <Input
          label="Restaurant Name"
          placeholder="Seri Melaka"
          className="text-xs"
        />
        <Input
          label="Description"
          placeholder="A Cozy Restaurant Serving Authenticmalay Cuisine In A Traditional Setting."
          className="text-xs"
        />
        <div className="mt-5 flex flex-wrap gap-4">
          <Input
            label="Location"
            placeholder="Kuala Lumpur City Centre (KLCC), 43 Jalan Ampan"
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
            label="Opening Hours / Closing Hours"
            placeholder="Daily 9:00 Am - 9:00 Pm"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Tags"
            placeholder="Food, Nature, Travel"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Banner Image"
            placeholder="Image"
            className="text-xs"
            minWidth="350px"
          />
          <Input
            label="Map Link"
            placeholder="Google Maps"
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

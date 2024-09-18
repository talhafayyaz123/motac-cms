'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

function SecuritySettings() {
  const router = useRouter();

  const [settingComponent, setSettingComponent] =
    useState<string>('Security Setting');

  const handleSettingChange = (value: string) => {
    setSettingComponent(value);
    if (value === 'Security Setting') {
      router.push('/my-profile/security-setting');
    } else {
      router.push('/my-profile/account-setting');
    }
  };

  return (
    <FormContainer className="border border-blue-100 relative mt-14">
      <div className="w-1/5 absolute top-[-25px]">
        <Select
          options={[
            { value: 'Account Setting', label: 'Account Setting' },
            { value: 'Security Setting', label: 'Security Setting' },
          ]}
          selectedValues={settingComponent}
          setSelectedValues={handleSettingChange}
          minWidth="200px"
          profile
        />
      </div>
      <div className="mt-10 flex flex-wrap gap-4 w-[75%]">
        <Input
          label="Current Password"
          placeholder="********"
          className="text-xs"
          minWidth="350px"
          type="password"
        />
        <Input
          label="New Password"
          placeholder="********"
          className="text-xs"
          minWidth="350px"
          type="password"
        />
        <Input
          label="Confirm Password"
          placeholder="********"
          className="text-xs"
          minWidth="350px"
          type="password"
        />
      </div>
      <div className="w-full flex justify-start mt-8 mb-52">
        <Button minWidth="160px" variant="customBlue">
          Update
        </Button>
      </div>
    </FormContainer>
  );
}

export default SecuritySettings;

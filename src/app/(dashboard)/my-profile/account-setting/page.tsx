'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import FormContainer from '@/components/container/FormContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

function AccountSettings() {
  const router = useRouter();

  const [settingComponent, setSettingComponent] =
    useState<string>('Account Setting');

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
          setSelectedValues={handleSettingChange as any}
          minWidth="200px"
          profile
        />
      </div>
      <div className="h-28 w-28 rounded-full border border-blue-100 mt-10"></div>
      <div className="mt-10 flex flex-wrap gap-4 w-[75%]">
        <Input
          label="First Name"
          placeholder="George"
          className="text-xs"
          minWidth="350px"
        />
        <Input
          label="Last Name"
          placeholder="Alex"
          className="text-xs"
          minWidth="350px"
        />
        <Input
          label="Phone Number"
          placeholder="+66 123 456 789"
          className="text-xs"
          minWidth="350px"
          icon={
            <Image alt="flag" height={25} width={25} src="/malaysia_flag.png" />
          }
        />
        <Input
          label="Email Address"
          placeholder="georgealex@gmail.com"
          className="text-xs"
          minWidth="350px"
        />
      </div>
      <div className="w-full flex justify-start mt-8 mb-16">
        <Button minWidth="160px" variant="customBlue">
          Update
        </Button>
      </div>
    </FormContainer>
  );
}

export default AccountSettings;

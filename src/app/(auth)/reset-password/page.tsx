'use client';

import React, { FormEvent } from 'react';

import AuthForm from '@/app/(auth)/components/AuthForm';

export default function ForgotPassword() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AuthForm
      title="Forgot Password?"
      description="Reset Password"
      buttonText="Sign In"
      fields={[
        {
          type: 'password',
          placeholder: 'New Password',
          name: 'password',
        },
        {
          type: 'password',
          placeholder: 'Confirm New Password',
          name: 'password',
        },
      ]}
      onSubmit={handleSubmit}
      width="520px"
      height="573px"
      paddingTop="25px"
      backBtn={true}
    />
  );
}

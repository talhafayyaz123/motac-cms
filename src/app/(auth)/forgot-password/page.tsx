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
      description="Please Enter Your Registered Email To Reset Password"
      buttonText="Send Otp"
      fields={[
        { type: 'email', placeholder: 'Enter your email', name: 'email' },
      ]}
      onSubmit={handleSubmit}
      width="520px"
      height="540px"
      paddingTop="25px"
      backBtn={true}
      formPadding="50px"
    />
  );
}

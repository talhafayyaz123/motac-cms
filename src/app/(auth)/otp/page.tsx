'use client';

import React, { FormEvent } from 'react';

import AuthForm from '@/app/(auth)/components/AuthForm';

export default function ForgotPassword() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AuthForm
      title="Enter OTP"
      description="Enter Otp to Change Password"
      buttonText="Next"
      fields={[{ type: 'password', placeholder: 'Enter Otp', name: 'otp' }]}
      onSubmit={handleSubmit}
      width="520px"
      height="560px"
      paddingTop="25px"
      formWidth="380px"
      resendOtp="#"
      backBtn={true}
      formPadding="50px"
    />
  );
}

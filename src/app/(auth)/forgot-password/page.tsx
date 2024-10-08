/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

import AuthForm from '@/app/(auth)/AuthForm';
import { requestOtp } from '@/services/apiService';

export default function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const userAgent = navigator.userAgent;

    try {
      const result = await requestOtp({ email, userAgent });
      console.log('OTP Request Success:', result.message);
      if (result?.message) {
        router.push('/otp?email=' + email);
      }
    } catch (error: any) {
      console.error('OTP Request Failed:', error.message);
      setError(error.message);
    }
  };

  return (
    <AuthForm
      title="Forgot Password?"
      description="Please Enter Your Registered Email To Reset Password"
      buttonText="Send OTP"
      fields={[
        { type: 'email', placeholder: 'Enter your email', name: 'email' },
      ]}
      onSubmit={handleSubmit}
      paddingTop="25px"
      backBtn={true}
      formPadding="50px"
      error={error}
    />
  );
}

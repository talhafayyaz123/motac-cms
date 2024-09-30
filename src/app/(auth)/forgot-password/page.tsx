'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

import AuthForm from '@/app/(auth)/AuthForm';
import { handleAuthRequest } from '@/services/apiService';

export default function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const userAgent = navigator.userAgent;
    const result = await handleAuthRequest('requestOtp', { email, userAgent });

    if (result.success) {
      router.push('/otp?email=' + email);
    } else {
      const error = typeof result.error === 'string' ? result.error : null;
      setError(error);
    }
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
      paddingTop="25px"
      backBtn={true}
      formPadding="50px"
      error={error}
    />
  );
}

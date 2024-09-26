'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

import AuthForm from '@/app/(auth)/components/AuthForm';

export default function ForgotPassword() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const otp = form.otp.value;

    try {
      const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

      const response = await fetch(`${backendApiUrl}/otps/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push('/reset-password?email=' + email + '&otp=' + otp);
      } else {
        if (data?.errors && typeof data.errors === 'object') {
          const errorMessages = Object.values(data.errors).flat().join(', ');
          setError(errorMessages || 'Invalid email or password');
        } else {
          setError(data?.message || 'Invalid email or password');
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <AuthForm
      title="Enter OTP"
      description="Enter Otp to Change Password"
      buttonText="Next"
      fields={[{ type: 'password', placeholder: 'Enter Otp', name: 'otp' }]}
      onSubmit={handleSubmit}
      paddingTop="25px"
      formWidth="380px"
      resendOtp="#"
      backBtn={true}
      formPadding="50px"
      error={error}
    />
  );
}

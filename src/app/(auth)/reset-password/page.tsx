'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

import AuthForm from '@/app/(auth)/components/AuthForm';

export default function ForgotPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const password = form.password.value;
    const newPassword = form.new_password.value;

    const email = searchParams.get('email');
    const otp = searchParams.get('otp');

    try {
      const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

      const response = await fetch(`${backendApiUrl}/auth/reset/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, newPassword, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push('/login');
      } else {
        // Handle error object
        if (data?.errors && typeof data.errors === 'object') {
          // Convert error object to an array of strings
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
          name: 'new_password',
        },
      ]}
      onSubmit={handleSubmit}
      paddingTop="25px"
      backBtn={true}
      formPadding="30px"
      error={error}
    />
  );
}

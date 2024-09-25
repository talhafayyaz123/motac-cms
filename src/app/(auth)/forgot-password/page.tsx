'use client';

import React, { FormEvent, useState } from 'react';

import AuthForm from '@/app/(auth)/components/AuthForm';

export default function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const userAgent = 'Chrome/104.0';
    const type = 'RESET_PASSWORD';

    try {
      const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

      const response = await fetch(`${backendApiUrl}/otps/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userAgent, type }),
      });

      const data = await response.json();
      if (response.ok) {
        //  router.push('/');
      } else {
        console.error('Login failed:', data?.errors);

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

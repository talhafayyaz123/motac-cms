/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

import AuthForm from '@/app/(auth)/AuthForm';
import { handleAuthRequest } from '@/services/apiService';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null | undefined>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const result = await handleAuthRequest('login', { email, password });

    if (result.success) {
      router.push('/');
    } else {
      setError(result?.error);
    }
  };

  return (
    <AuthForm
      title="Sign In"
      description="Please Enter Your Registered Email and Password"
      buttonText="Sign In"
      fields={[
        { type: 'email', placeholder: 'Enter your email', name: 'email' },
        {
          type: 'password',
          placeholder: 'Enter your password',
          name: 'password',
        },
      ]}
      onSubmit={handleSubmit}
      forgotPasswordLink="/forgot-password"
      paddingTop="0px"
      error={error}
    />
  );
}

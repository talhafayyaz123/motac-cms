/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

import AuthForm from '@/app/(auth)/AuthForm';
import { HidePasswordIcon, ShowPasswordIcon } from '@/assets';
import { handleAuthRequest } from '@/services/apiService';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null | undefined>(null);
  const [viewPass, setViewPass] = useState(false);

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
        { type: 'email', placeholder: 'Email', name: 'email' },
        {
          type: viewPass ? 'text' : 'password',
          placeholder: 'Password',
          name: 'password',
          icon: !viewPass ? (
            <ShowPasswordIcon
              onClick={() => {
                setViewPass(!viewPass);
              }}
            />
          ) : (
            <HidePasswordIcon
              onClick={() => {
                setViewPass(!viewPass);
              }}
            />
          ),
          iconPlacement: 'right',
        },
      ]}
      onSubmit={handleSubmit}
      forgotPasswordLink="/forgot-password"
      paddingTop="0px"
      error={error}
    />
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { FormEvent, useState } from 'react';

import AuthForm from '@/app/(auth)/components/AuthForm';

export default function Login() {
  // const { data: session, status } = useSession();

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  /*   useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);

  if (status === 'authenticated') {
    return <p>Redirecting to dashboard...</p>;
  } */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setError(error?.message);
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

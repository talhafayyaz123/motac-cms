'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, FormEvent, useState } from 'react';

import AuthForm from '@/app/(auth)/AuthForm';
import { HidePasswordIcon, ShowPasswordIcon } from '@/assets';
import { handleAuthRequest } from '@/services/apiService';

function ResetPasswordComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [viewNewPass, setViewNewPass] = useState(false);
  const [viewConfirmPass, setViewConfirmPass] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const password = form.password.value;
    const confirmPassword = form.new_password.value;

    const email = searchParams.get('email') || '';
    const otp = searchParams.get('otp') || '';

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);

    const result = await handleAuthRequest('resetPassword', {
      email,
      password,
      otp,
    });

    if (result.success) {
      router.push('/login');
    } else {
      setError(result.error || 'Unknown error occurred');
    }
  };

  return (
    <AuthForm
      title="Forgot Password?"
      description="Reset Password"
      buttonText="Reset Password"
      fields={[
        {
          type: viewNewPass ? 'text' : 'password',
          placeholder: 'New Password',
          name: 'password',
          icon: !viewNewPass ? (
            <ShowPasswordIcon
              onClick={() => {
                setViewNewPass(!viewNewPass);
              }}
            />
          ) : (
            <HidePasswordIcon
              onClick={() => {
                setViewNewPass(!viewNewPass);
              }}
            />
          ),
          iconPlacement: 'right',
        },
        {
          type: viewConfirmPass ? 'text' : 'password',
          placeholder: 'Confirm New Password',
          name: 'new_password',
          icon: !viewConfirmPass ? (
            <ShowPasswordIcon
              onClick={() => {
                setViewConfirmPass(!viewConfirmPass);
              }}
            />
          ) : (
            <HidePasswordIcon
              onClick={() => {
                setViewConfirmPass(!viewConfirmPass);
              }}
            />
          ),
          iconPlacement: 'right',
        },
      ]}
      onSubmit={handleSubmit}
      paddingTop="25px"
      backBtn={true}
      formPadding="30px"
      error={error} // Display the error
    />
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordComponent />
    </Suspense>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';

import AuthForm from '@/app/(auth)/AuthForm';
import { handleAuthRequest } from '@/services/apiService';

export default function Otp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  useEffect(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const otp = form.otp.value;

    const result = await handleAuthRequest('verifyOtp', { email, otp });

    if (result.success) {
      router.push(`/reset-password?email=${email}&otp=${otp}`);
    } else {
      router.push(`/reset-password?email=${email}&otp=${otp}`);
      const error = typeof result.error === 'string' ? result.error : null;
      // setError(error);
    }
  };

  return (
    <AuthForm
      title="Enter OTP"
      description="Enter OTP to Change Password"
      buttonText="Next"
      fields={[{ type: 'password', placeholder: 'Enter OTP', name: 'otp' }]}
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

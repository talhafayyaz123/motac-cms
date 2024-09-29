'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

import AuthForm from '@/app/(auth)/AuthForm';
import { handleAuthRequest } from '@/services/apiService';

export default function Otp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  //const [email, setEmail] = useState<string>('');
  const email = '';
  /*   useEffect(() => {
    if (router.query.email && typeof router.query.email === 'string') {
      setEmail(router.query.email);
    }
  }, [router.query.email]); */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const otp = form.otp.value;

    const result = await handleAuthRequest('verifyOtp', { email, otp });

    if (result.success) {
      router.push(`/reset-password?email=${email}&otp=${otp}`);
    } else {
      const error = typeof result.error === 'string' ? result.error : null;
      setError(error);
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

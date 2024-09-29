'use client';

//import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

import AuthForm from '@/app/(auth)/AuthForm';

export default function Otp() {
  //const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  //const [email, setEmail] = useState<string>('');
  const email = 'test@gmail.com';
  /*   useEffect(() => {
    if (router.query.email && typeof router.query.email === 'string') {
      setEmail(router.query.email);
    }
  }, [router.query.email]); */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const otp = form.otp.value;

    try {
      const backendApiUrl =
        'http://cms-api-motac.ap-south-1.elasticbeanstalk.com/api/v1';

      const response = await fetch(`${backendApiUrl}/otps/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        //        await router.push(`/reset-password?email=${email}&otp=${otp}`);
      } else {
        const data = await response.json();
        const errorMessages = data.errors
          ? Object.values(data.errors).flat().join(', ')
          : data.message || 'Invalid OTP';
        setError(errorMessages);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An unexpected error occurred. Please try again.');
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

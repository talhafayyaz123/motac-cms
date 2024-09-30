'use client';

//import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent } from 'react';

import AuthForm from '@/app/(auth)/AuthForm';
//import { handleAuthRequest } from '@/services/apiService';

export default function ResetPassword() {
  //const router = useRouter();
  //  const searchParams = useSearchParams();
  //  const [error, setError] = useState<string | null>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const form = event.target as HTMLFormElement;
    // const password = form.password.value;
    // const newPassword = form.new_password.value;

    //    const email = searchParams.get('email') || '';
    //   const otp = searchParams.get('otp') || '';

    /*     const result = await handleAuthRequest('resetPassword', {
      email,
      password,
      newPassword,
      otp,
    });

    if (result.success) {
      router.push('/login');
    } else {
      setError(result.error);
    } */
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
      //      error={error}
    />
  );
}

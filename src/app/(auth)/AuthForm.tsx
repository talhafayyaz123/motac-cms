'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { FormEvent } from 'react';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface AuthFormProps {
  title?: string;
  description: string;
  buttonText: string;
  fields: {
    type: string;
    placeholder: string;
    name: string;
    icon?: React.ReactNode;
    iconPlacement?: string;
  }[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  forgotPasswordLink?: string;
  paddingTop: string;
  formWidth?: string;
  formPadding?: string;
  resendOtp?: string;
  backBtn?: boolean;
  error?: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  description,
  buttonText,
  fields,
  onSubmit,
  forgotPasswordLink,
  paddingTop,
  formWidth = '443px',
  resendOtp,
  backBtn,
  formPadding = '0',
  error,
}) => {
  return (
    <main
      className="h-screen w-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: `url(/login-bg.png)` }}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-md mt-6 pt-[50px] w-[520px] h-[600px]`}
      >
        <div className="flex items-center justify-center mb-6">
          {backBtn && (
            <Link
              href={'/login'}
              className="relative right-[75px] rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="46"
                viewBox="0 0 70 70"
              >
                <rect
                  id="Rectangle_889"
                  data-name="Rectangle 889"
                  width="70"
                  height="70"
                  rx="35"
                  fill="#364EA2"
                />
                <path
                  id="Path_2041"
                  data-name="Path 2041"
                  d="M24.88,26.837,17.7,19.656a2.067,2.067,0,0,0-3.264.218,2.285,2.285,0,0,0,.218,2.938l8.7,8.6a2.067,2.067,0,0,0,3.047,0l8.7-8.6a2.285,2.285,0,0,0,.218-2.938,2.067,2.067,0,0,0-3.264-.218Z"
                  transform="translate(59 11) rotate(90)"
                  fill="#fff"
                />
              </svg>
            </Link>
          )}
          <Image
            alt="image"
            src="/login-logo.png"
            height={155}
            width={155}
            className="h-[65px] object-cover aspect-[16/9]"
          />
        </div>

        <h2 className="text-center mb-6 text-2xl font-medium text-[#181819]">
          Admin Portal
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className={`flex justify-center pt-[${formPadding}]`}>
          <form
            className={`flex flex-col gap-3 w-[${formWidth}]`}
            onSubmit={onSubmit}
          >
            <h2
              className={`text-left text-2xl font-medium pt-[${paddingTop}] text-[#181819] `}
            >
              {title}
            </h2>
            <span className="text-left ext-2xl font-medium text-[#181819]">
              {description}
            </span>
            {fields.map((field, index) => (
              <div key={index} className="flex flex-col gap-3">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-[#181819]"
                >
                  {field.placeholder}
                </label>
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  inputSize="sm"
                  minWidth="200px"
                  className="bg-white !border-0 !border-b-2 focus:outline-none focus:ring-0 !rounded-none"
                  name={field.name}
                  icon={field.icon}
                  iconPlacement={field.iconPlacement}
                />
              </div>
            ))}

            {forgotPasswordLink && (
              <div className="flex justify-end -mt-3">
                <Link href={forgotPasswordLink}>
                  <span className="text-xs font-medium text-[#181819]">
                    Forgot Password?
                  </span>
                </Link>
              </div>
            )}

            <div className="w-full flex justify-center p-2">
              <Button variant="customBlue" minWidth="360px" type="submit">
                {buttonText}
              </Button>
            </div>

            {resendOtp && (
              <div className="flex justify-center mt-3 text-xs">
                <span>
                  Didnt get code?
                  <Link href={resendOtp}>
                    <span className="text-blue-800 ml-1">
                      Resend code after 2 minutes
                    </span>
                  </Link>
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default AuthForm;

"use client";

import { GoogleSignInButton } from "@/components/authButtons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CredentialsFormProps {
  csrfToken?: string;
}

interface IProps {
  csrfToken?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = (props: IProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <div
      className="flex flex-col items-center w-1/3 mt-10 p-10 shadow-md mx-auto"
    >
      <span>Sign In</span>
      {props.searchParams?.message && <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">{props.searchParams?.message}</p>}
      <GoogleSignInButton />
    </div>
  )
};

export default LoginPage;

"use client"
import { LoginForm } from '@/components/login-form'
import { authClient } from '@/lib/auth-client';
import React, { useEffect } from 'react'
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';


const Page = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();


  useEffect(() => {
    if (data?.session && data?.user) {
      const searchParams = new URLSearchParams(window.location.search);
      const callbackURL = searchParams.get("callbackURL") || "/";
      router.push(callbackURL);
    }
  }, [data, router]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <Spinner />
      </div>
    );
  }


  return (
    <>
      <LoginForm />

    </>
  )
}

export default Page
"use client"
import { LoginForm } from '@/components/login-form'
import { authClient } from '@/lib/auth-client';
import React from 'react'
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';


const Page = () => {
  const {data , isPending} = authClient.useSession();
  const router = useRouter();

  
  if (data?.session && data?.user){
    router.push("/sign-in")
  }

  if (isPending){
    return (
      <div className="flex flex-col items-center jsutify-center h-screen">
        <Spinner/>
        

      </div>
    )
  }

 
  return (
    <>
    <LoginForm/>
    
    </>
  )
}

export default Page
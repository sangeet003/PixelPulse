"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const page = () => {

  const [user, setUser] = useState({
      email : "",
      password : "",
  });

  const router = useRouter();
  const onSubmitHandler = async (e : any) => {
      
      try {
        e.preventDefault();
        const response = await axios.post("/api/user/login", user);
        console.log("Login success", response.data);
        console.log("navigating");
        router.push("/");

      } catch (error : any) {
        console.log("Login Failed", error.message);
      }
  }

  return (
    <div className="flex w-full">
        <form className="mx-auto mt-48 grid gap-3 items-center" onSubmit={onSubmitHandler}>
            <h1 className='m-auto text-2xl p-2 font-medium'>Login</h1>
            <Input type="email" id="email" placeholder="Email" onChange={(e : any) => setUser({...user, email : e.target.value})}/>
            <Input type="password" id="password" placeholder="Password" onChange={(e : any) => setUser({...user, password : e.target.value})}/>
            <Button type="submit">Submit</Button>
        </form>
    </div>
  )
}

export default page
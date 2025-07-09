'use client';

import React, { Suspense, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoCloseCircleOutline } from "react-icons/io5";
import Image from 'next/image';
import { toast } from 'sonner';
import { useAuthStore } from '../../components/stores/auth-store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const LoginContent: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();

  const setToken = useAuthStore(state => state.setToken);

  const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!sp.get("auth-state") || sp.get("auth-state") !== "login") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', email); // FastAPI expects 'username' for email in form data
    formData.append('password', password);

    try {
      // Note: FastAPI's OAuth2PasswordBearer expects x-www-form-urlencoded for login
      const response = await fetch(`${BACKEND_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the access token in localStorage (for client-side access)
        setToken(data);
        toast.success("Login successful");
        // Redirect to home page or dashboard
        router.replace(path);
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        toast.error('Login failed. Please check your credentials!');
      }
    } catch (err) {
      console.error('Network error during login:', err);
      toast.error('Network error. Could not connect to the server.');
    }
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
      <div className='w-full max-w-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 '>
        <div className='flex flex-col sm:flex-row w-full- shadow-lg rounded-xl'>
          <div className='rounded-l-xl overflow-hidden hidden sm:block bg-white'>
            <Image src={'/images/login_img.png'} width={500} height={500} alt='login image' className='' />
          </div>
          <Card id='login' className="w-full max-w-sm ml-auto mr-auto sm:mr-0 outline-none border-none shadow-none relative rounded-r-xl rounded-l-xl sm:rounded-l-none">
            <IoCloseCircleOutline className="absolute top-1 right-1 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800" onClick={() => router.replace(path)} />
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription className='hidden sm:block'>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Button variant="link" onClick={() => router.replace(`${path}?auth-state=signup`)}>Sign Up</Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Login
              </Button>
              <Button variant={"link"} onClick={() => router.replace(`${path}?auth-state=forgot-password`)}>Forgot Password</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

const Login = () => {
  return (
    <Suspense fallback={<div className='min-h-screen flex justify-center items-center'><span>Loading...</span></div>}>
      <LoginContent />
    </Suspense>
  )
}

export default Login;

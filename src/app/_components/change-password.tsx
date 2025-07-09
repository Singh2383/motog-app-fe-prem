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
import Image from 'next/image';
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from 'sonner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { postWithAuth } from '@/lib/post-with-auth';

const ChangePasswordContent: React.FC = () => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

    const router = useRouter();
    const path = usePathname();
    const sp = useSearchParams();

    if (!sp.get("auth-state") || sp.get("auth-state") !== "change-password") return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        try {
            const response = await postWithAuth("/change-password", {
                "current_password": oldPassword,
                "new_password": confirmNewPassword
            })

            if (response.status === 200) {
                toast.success("Password change successful.");
                router.replace(path);
            } else {
                toast.error('Password change failed!');
            }
        } catch (err) {
            toast.error('Something Went Wrong!');
            console.error("Submit error in change password:", err);
        }
    };

    return (
        <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
            <div className='w-full max-w-3xl flex flex-col sm:flex-row fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                <div className='hidden sm:block flex-1 relative bg-white rounded-l-3xl'>
                    <Image src={'/images/_reg_img.png'} fill alt='login image' className='object-cover rounded-l-xl shadow-lg' />
                </div>
                <Card id='login' className="w-full max-w-sm ml-auto mr-auto sm:mr-0 outline-none border-none shadow-none relative rounded-r-xl rounded-l-xl sm:rounded-l-none">
                    <IoCloseCircleOutline className="absolute top-1 right-1 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800" onClick={() => router.replace(path)} />
                    <CardHeader>
                        <CardTitle>Change your password</CardTitle>
                        <CardDescription className='hidden sm:block'>
                            Enter your new password below
                        </CardDescription>
                        <CardAction>
                            <Button variant="link" onClick={() => router.replace(`${path}?auth-state=login`)}>Login</Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="old-password">Old Password</Label>
                                    <Input id="old-password" type="password" onChange={(e) => setOldPassword(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" onChange={(e) => setNewPassword(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-new-password">Confirm Password</Label>
                                    <Input id="confirm-new-password" type="password" required onChange={(e) => setConfirmNewPassword(e.target.value)} />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full" onClick={handleSubmit}>
                            Change Password
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

const ChangePassword = () => {
    return (
        <Suspense fallback={<div className='min-h-screen flex justify-center items-center'><span>Loading...</span></div>}>
            <ChangePasswordContent />
        </Suspense>
    )
}

export default ChangePassword;
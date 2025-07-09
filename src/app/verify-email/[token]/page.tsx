"use client";

import { useAuthStore } from '@/components/stores/auth-store';
import { fetchWithOutAuth } from '@/lib/fetch-without-auth';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

type UserAccount = {
    email: string;
    id: number;
    is_active: boolean;
    is_email_verified: boolean;
    created_at: string; // ISO 8601 timestamp
};

const VerifyEmail = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { token } = useParams();
    const auth = useAuthStore();

    useEffect(() => {
        fetchWithOutAuth<UserAccount>(`verify-email?token=${token}`)
            .then(res => {
                setLoading(false);
                if (res.status == 200) {
                    toast.success("Email verification succeeded");
                    if (auth.token?.access_token) {
                        auth.setToken({
                            access_token: auth.token?.access_token,
                            token_type: auth.token?.token_type,
                            user: res.data
                        });
                    }
                    setTimeout(() => {
                        router.replace("/");
                    }, 200);
                }
            }).catch(err => {
                setLoading(false);
                toast.error("Something Went Wrong!");
                console.error("failed email verification:", err);
            })
    }, [token, setLoading, auth, router]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            {loading && <p>Please wait for a moment...</p>}
        </div>
    )
}

export default VerifyEmail;
"use client";

import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useAuthStore } from "@/components/stores/auth-store";
import { postWithoutAuth } from "@/lib/post-without-auth";
import { toast } from "sonner";

const VerifyEmailBannerLine: FC = () => {
    const auth = useAuthStore(state => state.token);

    if (!auth) return null;
    if (!auth?.user) return null;
    if (auth.user?.is_email_verified) return null;

    const resendEmail = async () => {
        try {
            const { status } = await postWithoutAuth(`resend-verification-email`,
                { email: auth?.user.email });
            if (status === 200) {
                toast.success("Email Sent!");
            }
        } catch (err) {
            toast.error("Something Went Wrong!");
            console.error("Failed resend verification email:", err);
        }
    }

    return (
        <div className="bg-yellow-300/50">
            <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center">
                Please check your email and verify by clicking on the link.
                <Button variant={"link"} className="font-bold m-0 h-2" onClick={resendEmail}>Resend Email</Button>
            </div>
        </div>
    )
}

export default VerifyEmailBannerLine;
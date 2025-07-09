'use client';

import { useAuthStore } from '@/components/stores/auth-store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PUBLIC_ROUTES = ['/', "/inventory", "/sell", "/about-us", "/contact-us", "/faqs", "/privacy-policy", "/refund-policy",
    "/terms-of-use", "/tips-n-advices", "/reset-password", "/verify-email",
];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { token, hasHydrated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!hasHydrated) return;
        if (!token?.access_token && !PUBLIC_ROUTES.includes(pathname)) {
            router.push(`${pathname}?auth-state=login`);
        }
    }, [hasHydrated, pathname, token, router]);

    return <>{children}</>;
}

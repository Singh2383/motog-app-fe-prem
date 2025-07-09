'use client';

import { useAuthStore } from '@/components/stores/auth-store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Protected({ children }: { children: React.ReactNode }) {
    const { token, hasHydrated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!hasHydrated) return;
        if (!token?.access_token) {
            router.push(`${pathname}?auth-state=login`);
        }
    }, [hasHydrated, pathname, token, router]);

    return <>{children}</>;
}

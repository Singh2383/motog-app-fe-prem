'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/components/stores/auth-store';
import { usePathname, useRouter } from 'next/navigation';

export function useRequireAuth() {
    const { token, hasHydrated } = useAuthStore();
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (!hasHydrated) return;
        if (!token) {
            router.replace(`${path}?auth-state=login`);
        }
    }, [token, hasHydrated, path, router]);
}

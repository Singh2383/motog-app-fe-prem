// src/hooks/use-my-listings.ts

'use client';

import { useQuery } from '@tanstack/react-query';
import { CarDto } from './use-cars';
import { useAuthStore } from '@/components/stores/auth-store';

async function fetchMyListings(token: string | undefined): Promise<CarDto[]> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings/my-listings?skip=0&limit=50`);

    const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('Failed to fetch my listings');

    const data = await res.json();
    console.log("This is the my-listings data: ", data); // logging actual parsed JSON
    return data;
}

export function useMyListings() {
    const token = useAuthStore((s) => s.token);

    return useQuery({
        queryKey: ['my-listings'],
        queryFn: () => fetchMyListings(token?.access_token),
        enabled: !!token, // Only run if token is available
        staleTime: 1000 * 60 * 5, // Optional: cache for 5 minutes
    });
}
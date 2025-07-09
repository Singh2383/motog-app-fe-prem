// src/app/my-listings/_components/page-content.tsx
'use client'
import { useMyListings } from "../../../hooks/use-my-listings"
import MyListings from "./my-listings"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MyListingsPageContent() {
    const router = useRouter();
    const sp = useSearchParams();
    const [page, setPage] = useState(Number(sp.get('page')) || 1);

    const pushState = () => {
        const url = new URL(window.location.href);
        url.searchParams.set('page', String(page));
        router.replace(url.pathname + '?' + url.searchParams.toString());
    };

    const { data, isLoading, isError } = useMyListings()

    return (
        <div className="bg-gray-50 min-h-screen pt-32 px-4 sm:px-6 lg:px-8 mb-4 mt-8">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    {isLoading && <MyListingsSkeleton />}
                    {isError && <p className="text-red-500">Something went wrong.</p>}
                    {data && (
                        <MyListings
                            myListings={data}
                            totalListings={data.length}
                            currentPage={page}
                            totalPages={1}
                            onPageChange={(p) => {
                                setPage(p);
                                pushState();
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

function MyListingsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg bg-white p-4 shadow-sm h-64" />
            ))}
        </div>
    );
}
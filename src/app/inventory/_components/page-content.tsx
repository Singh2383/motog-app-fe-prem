// app/used-cars/[city]/page.tsx
'use client';
import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useCars } from '@/hooks/useCars';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'; // shadcn
import { SlidersHorizontal } from 'lucide-react';
import { useCars } from '@/hooks/use-cars';
import FiltersSidebar from './filters';
import CarsListing from './car-listing';

const RESULTS_PER_PAGE = 8;

export default function InventoryPageContent() {
    const router = useRouter();
    const sp = useSearchParams();

    const [brand, setBrand] = useState(sp.get('brand') || undefined);
    const [fuel, setFuel] = useState(sp.get('fuel') || undefined);
    const [year, setYear] = useState(sp.get('year') || undefined);
    const [transmission, setTransmission] = useState(sp.get('transmission') || undefined);
    const [owner, setOwner] = useState(sp.get('owner') || undefined);
    const [priceRange, setPriceRange] = useState<[number, number]>([
        Number(sp.get('minPrice')) || 1,
        Number(sp.get('maxPrice')) || 50,
    ]);
    const [verifiedOnly, setVerifiedOnly] = useState(sp.get('verified') === 'true');
    const [page, setPage] = useState(Number(sp.get('page')) || 1);

    const queryParams = useMemo(() => ({
        skip: (page - 1) * RESULTS_PER_PAGE,
        limit: RESULTS_PER_PAGE,
        brand,
        fuel,
        year,
        transmission,
        owner,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        verified: verifiedOnly || undefined,
        city: sp?.get("city") ?? "",           // optional extra param
    }), [brand, fuel, year, transmission, owner, priceRange, verifiedOnly, page, sp?.get("city")]);

    /** keep URL in sync so users can share & refresh */
    const pushState = () => {
        const url = new URL(window.location.href);
        Object.entries(queryParams).forEach(([k, v]) => {
            if (v === undefined || v === '' || (k === 'skip' || k === 'limit')) return;
            url.searchParams.set(k, String(v));
        });
        url.searchParams.set('page', String(page));
        router.replace(url.pathname + '?' + url.searchParams.toString());
    };

    /*------------------------------------------------------------------*/
    /*   Fetch cars with React Query                                     */
    /*------------------------------------------------------------------*/
    const { data, isLoading, isError } = useCars(queryParams);

    console.log("use cars data:", data);

    const handleFilterChange = () => {
        setPage(1);
        pushState();
    };

    const resetFilters = () => {
        setBrand(undefined);
        setFuel(undefined);
        setYear(undefined);
        setTransmission(undefined);
        setOwner(undefined);
        setPriceRange([3, 5]);
        setVerifiedOnly(false);
        setPage(1);
        router.replace(window.location.pathname); // clear query string
    };

    /*------------------------------------------------------------------*/
    /*   Responsive filter sidebar (Sheet on <md, static on ≥md)         */
    /*------------------------------------------------------------------*/
    const Filters = (
        <FiltersSidebar
            brand={brand} setBrand={setBrand}
            fuel={fuel} setFuel={setFuel}
            year={year} setYear={setYear}
            transmission={transmission} setTransmission={setTransmission}
            owner={owner} setOwner={setOwner}
            priceRange={priceRange} setPriceRange={setPriceRange}
            verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
        />
    );

    return (
        <div className="bg-gray-50 min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">
                    Used Cars in {(sp?.get("city") ?? '').replace(/-/g, ' ')}
                    {`(₹${queryParams.minPrice}– ${queryParams.maxPrice} Lakh)`}
                </h1>

                {/* <p className="text-gray-600 mt-1">
                    {(data?.total ?? data?.length ?? "###")} cars available
                </p> */}
            </header>

            <div className="flex gap-6">
                {/*  ❱❱ Mobile – slide‑in drawer */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium shadow-sm">
                            <SlidersHorizontal size={16} /> Filters
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0">
                            {Filters}
                        </SheetContent>
                    </Sheet>
                </div>

                {/*  ❱❱ Desktop sidebar */}
                <aside className="hidden md:block w-72 flex-shrink-0">{Filters}</aside>

                {/*  ❱❱ Listing */}
                <main className="flex-1">
                    {isLoading && <CarsSkeleton />}
                    {isError && <p className="text-red-500">Something went wrong.</p>}
                    {data && (
                        <CarsListing
                            cars={data}
                            totalCars={0}
                            currentPage={page}
                            totalPages={0}
                            onPageChange={(p) => {
                                setPage(p);
                                pushState();
                            }}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}

/* Skeleton loader (optional) */
function CarsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg bg-white p-4 shadow-sm h-64" />
            ))}
        </div>
    );
}

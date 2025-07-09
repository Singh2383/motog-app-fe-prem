'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { useListings } from '@/hooks/use-cars';
import FiltersSidebar from './filters';
import CarsListing from './car-listing';
import useLocation from '@/hooks/use-location';

export default function InventoryPageContent() {
    const pageSize = Number(process.env.NEXT_PUBLIC_INVENTORY_PAGE_SIZE) || 15;
    const router = useRouter();
    const sp = useSearchParams();

    const [vehicleType, setVehicleType] = useState<'car' | 'bike' | undefined>(() => {
        const vt = sp.get('vehicle_type');
        return vt === 'car' || vt === 'bike' ? vt : undefined;
    });

    const location = useLocation(state => state.locality?.mainText);

    const [city, setCity] = useState<string | undefined>(sp.get('city') || undefined);
    const [yearRange, setYearRange] = useState<[number | undefined, number | undefined]>([
        sp.get('min_year') ? Number(sp.get('min_year')) : undefined,
        sp.get('max_year') ? Number(sp.get('max_year')) : undefined,
    ]);

    const [priceRange, setPriceRange] = useState<[number | undefined, number | undefined]>([
        sp.get('min_price') ? Number(sp.get('min_price')) : undefined,
        sp.get('max_price') ? Number(sp.get('max_price')) : undefined,
    ]);

    const [kmsRange, setKmsRange] = useState<[number | undefined, number | undefined]>([
        sp.get('min_km_driven') ? Number(sp.get('min_km_driven')) : undefined,
        sp.get('max_km_driven') ? Number(sp.get('max_km_driven')) : undefined,
    ]);

    const [page, setPage] = useState<number>(sp.get('page') ? Number(sp.get('page')) : 1);

    useEffect(() => {
        if (location) {
            setCity(location);
        }
    }, [location]);

    const queryParams = useMemo(() => ({
        skip: (page - 1) * pageSize,
        limit: pageSize,
        search_q: sp.get('search_q') ?? '',
        city,
        vehicle_type: vehicleType,
        min_price: priceRange[0] ? priceRange[0] * 100000 : undefined,
        max_price: priceRange[1] ? priceRange[1] * 100000 : undefined,
        min_year: yearRange[0],
        max_year: yearRange[1],
        min_km_driven: kmsRange[0],
        max_km_driven: kmsRange[1],
    }), [page, pageSize, vehicleType, city, priceRange, yearRange, kmsRange, sp]);

    const pushState = () => {
        const url = new URL(window.location.href);
        Object.entries(queryParams).forEach(([k, v]) => {
            if (v === undefined || v === '') {
                url.searchParams.delete(k);
                return;
            }
            url.searchParams.set(k, String(v));
        });
        url.searchParams.set('page', String(page));
        router.replace(url.pathname + '?' + url.searchParams.toString());
    };

    const { data, isLoading, isError } = useListings(queryParams);

    const handleFilterChange = () => {
        setPage(1);
        pushState();
    };

    const resetFilters = () => {
        setCity('');
        setVehicleType(undefined);
        setYearRange([undefined, undefined]);
        setPriceRange([undefined, undefined]);
        setKmsRange([undefined, undefined]);
        setPage(1);
        router.replace(window.location.pathname); // removes all query params
    };

    const Filters = (
        <FiltersSidebar
            yearRange={yearRange} setYearRange={setYearRange}
            kmsDriven={kmsRange} setKmsDriven={setKmsRange}
            priceRange={priceRange} setPriceRange={setPriceRange}
            vehicleType={vehicleType} setVehicleType={setVehicleType}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
        />
    );

    return (
        <div className="bg-gray-50 min-h-screen pt-32 px-4 sm:px-6 lg:px-8 mb-4 mt-8">
            <div className="flex flex-col md:flex-row gap-6">
                .                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium shadow-sm">
                            <SlidersHorizontal size={16} /> Filters
                        </SheetTrigger>
                        <SheetTitle className='hidden'>Side Filter Bar - Mobile View</SheetTitle>
                        <SheetContent side="left" className="p-0">
                            {Filters}
                        </SheetContent>
                        <SheetDescription className='hidden'>This is hidden description of Mobile Side Filter Bar</SheetDescription>
                    </Sheet>
                </div>

                <aside className="hidden md:block w-72 flex-shrink-0">{Filters}</aside>

                <div className="flex-1">
                    {isLoading && <CarsSkeleton />}
                    {isError && <p className="text-red-500">Something went wrong.</p>}
                    {data && (
                        <CarsListing
                            cars={data}
                            totalCars={0} // update when backend supports total count
                            currentPage={page}
                            totalPages={10}
                            onPageChange={(p) => {
                                setPage(p);
                                pushState();
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

function CarsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg bg-white p-4 shadow-sm h-64" />
            ))}
        </div>
    );
}


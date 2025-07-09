"use client";

import { Button } from '@/components/ui/button';
import useLocation from '@/hooks/use-location';
import useManualLocation from '@/hooks/use-manual-location';
import { MapPin, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Dispatch, FC, KeyboardEvent, SetStateAction } from 'react';

type MobileSearchBarProps = {
    handleSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
    setSearch: Dispatch<SetStateAction<string>>;
    search: string;
}

const MobileSearchBar: FC<MobileSearchBarProps> = ({ handleSearch, setSearch, search }) => {
    const setShow = useManualLocation(state => state.setShow);
    const locality = useLocation(state => state.locality);
    const router = useRouter();
    return (
        <div className="flex md:hidden pb-3 items-center gap-2">
            {/* Search Input Container */}
            <div className="relative flex-1 min-w-0">
                <div className="flex items-center border border-gray-300 focus-within:border-gray-500 rounded-full pr-20">
                    <Search className="ml-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search cars..."
                        className="flex-1 px-3 py-2.5 outline-none rounded-full text-sm bg-transparent"
                        onKeyDown={handleSearch}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </div>

                {/* Inline Buttons inside input */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="text-xs text-gray-500 hover:text-gray-700"
                        >
                            Clear
                        </button>
                    )}
                    <button
                        onClick={() => router.push(`/inventory?search_q=${search}`)}
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Go
                    </button>
                </div>
            </div>

            {/* Location Button (Always visible) */}
            <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 whitespace-nowrap"
                onClick={() => setShow(true)}
            >
                <MapPin className="h-4 w-4" />
                <span className="text-sm truncate max-w-[90px]">
                    {locality?.mainText ?? 'Select'}
                </span>
            </Button>
        </div>


    )
}

export default MobileSearchBar;
"use client";

import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Dispatch, FC, KeyboardEvent, SetStateAction } from 'react'

type DesktopSearchBarProps = {
    handleSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
    setSearch: Dispatch<SetStateAction<string>>;
    search: string;
}

const DesktopSearchBar: FC<DesktopSearchBarProps> = ({ handleSearch, setSearch, search }) => {
    const router = useRouter();
    return (
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
                <div
                    className={cn(
                        "flex items-center border rounded-full transition-all duration-200 pr-24", // extra right padding for buttons
                        "focus-within:border-gray-500 focus-within:shadow-lg", "border-gray-300"
                    )}
                >
                    <Search className="ml-4 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search cars, brands, models..."
                        className="flex-1 px-4 py-3 outline-none rounded-full bg-transparent"
                        onKeyDown={handleSearch}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </div>

                {/* Clear & Search buttons */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="text-sm text-gray-500 hover:text-gray-700 transition"
                        >
                            Clear
                        </button>
                    )}
                    <button
                        onClick={() => router.push(`/inventory?search_q=${search}`)}
                        className="text-sm text-blue-600 hover:underline transition"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DesktopSearchBar;
// src/app/my-listings/_components/my-listings.tsx
'use client';

import { Button } from "@/components/ui/button";
import { CarDto } from "@/hooks/use-cars";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ListCard from "./list-card";

export default function MyListings({
    myListings,
    totalListings,
    currentPage,
    totalPages,
    onPageChange,
}: {
    myListings: CarDto[];
    totalListings: number;
    currentPage: number;
    totalPages: number;
    onPageChange: (p: number) => void;
}) {
    if (!myListings?.length) {
        return <p className="text-gray-600">No Listings found.</p>
    }

    return (
        <div className="space-y-6">
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {myListings.map((listing) => (
                    <ListCard key={listing.id} car={listing} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <nav className="flex justify-center items-center gap-2" aria-label="Pagination">
                    <Button
                        variant="outline"
                        size={"sm"}
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <p className="text-sm">
                        Page {currentPage} of {totalPages} <span className="text-gray-400">({totalListings} listings)</span>
                    </p>

                    <Button
                        variant={"outline"}
                        size={"sm"}
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </nav>
            )}
        </div>
    );
}
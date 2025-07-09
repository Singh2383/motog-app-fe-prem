'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CarCard from './car-card';
import { CarDto } from '@/hooks/use-cars';

export default function CarsListing({
    cars,
    totalCars,
    currentPage,
    totalPages,
    onPageChange,
}: {
    cars: CarDto[];
    totalCars: number;
    currentPage: number;
    totalPages: number;
    onPageChange: (p: number) => void;
}) {
    if (!cars?.length) {
        return <p className="text-gray-600">No cars match your filters.</p>;
    }

    return (
        <div className="space-y-6">
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <nav className="flex justify-center items-center gap-2" aria-label="Pagination">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <p className="text-sm">
                        Page {currentPage} of {totalPages} <span className="text-gray-400">({totalCars} cars)</span>
                    </p>

                    <Button
                        variant="outline"
                        size="sm"
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

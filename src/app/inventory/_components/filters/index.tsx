'use client';

import YearFilter from './year-range-filter';
import PriceRangeFilter from './price-range-filter';
import KmsDrivenFilter from './kms-driven-filter';
import VehicleTypeFilter from './vehicle-type-filter';

export interface FiltersSidebarProps {
    vehicleType?: 'car' | 'bike';
    setVehicleType: (v?: 'car' | 'bike') => void;
    yearRange: [number | undefined, number | undefined];
    setYearRange: (v: [number | undefined, number | undefined]) => void;
    priceRange: [number | undefined, number | undefined];
    setPriceRange: (v: [number | undefined, number | undefined]) => void;
    kmsDriven: [number | undefined, number | undefined];
    setKmsDriven: (v: [number | undefined, number | undefined]) => void;
    onFilterChange: () => void;
    onReset: () => void;
}

export default function FiltersSidebar({
    vehicleType,
    setVehicleType,
    yearRange,
    setYearRange,
    priceRange,
    setPriceRange,
    kmsDriven,
    setKmsDriven,
    onFilterChange,
    onReset,
}: FiltersSidebarProps) {
    return (
        <div className="p-4 space-y-4 w-full max-w-xs overflow-y-auto border-1 rounded-xl shadow-xl bg-white">
            <VehicleTypeFilter vehicleType={vehicleType} setVehicleType={setVehicleType} />
            <YearFilter yearRange={yearRange} setYearRange={setYearRange} />
            <PriceRangeFilter priceRange={priceRange} setPriceRange={setPriceRange} />
            <KmsDrivenFilter kmsDriven={kmsDriven} setKmsDriven={setKmsDriven} />

            <div className="pt-4 flex justify-between text-sm">
                <button
                    onClick={onReset}
                    className="text-gray-500 hover:underline rounded-md px-2 py-1"
                >
                    Reset
                </button>
                <button
                    onClick={onFilterChange}
                    className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}

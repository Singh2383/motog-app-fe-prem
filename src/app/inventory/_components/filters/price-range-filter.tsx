'use client';
import { formatNumber } from '@/lib/format-number';
import FilterSection from './filter-section';
import { Slider } from '@/components/ui/slider';

export default function PriceRangeFilter({
  priceRange,
  setPriceRange,
}: {
  // Allow priceRange values to be undefined in state,
  // but we’ll always pass valid numbers to the slider.
  priceRange: [number | undefined, number | undefined];
  setPriceRange: (v: [number, number]) => void;
}) {
  // Use defaults if the values haven’t been set yet.
  const sliderValue: [number, number] = [
    priceRange[0] ?? 1,
    priceRange[1] ?? 20,
  ];
  
  return (
    <FilterSection title="Price (₹L)">
      <div className="px-2">
        <Slider
          value={sliderValue}
          onValueChange={(v) =>
            setPriceRange([v[0] as number, v[1] as number])
          }
          min={1}
          max={20}
          step={0.5}
        />
        <div className="mt-2 text-sm text-gray-600 flex justify-between">
          <span>{formatNumber(sliderValue[0] * 100000)}</span>
          <span>{formatNumber(sliderValue[1] * 100000)}</span>
        </div>
      </div>
    </FilterSection>
  );
}

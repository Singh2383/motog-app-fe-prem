'use client';
import { formatNumber } from '@/lib/format-number';
import FilterSection from './filter-section';
import { Slider } from '@/components/ui/slider';

const MIN_KM = 0;
const MAX_KM = 200000;

export default function KmsDrivenFilter({
  kmsDriven,
  setKmsDriven,
}: {
  kmsDriven: [number | undefined, number | undefined];
  setKmsDriven: (v: [number | undefined, number | undefined]) => void;
}) {
  const value: [number, number] = [
    kmsDriven[0] ?? MIN_KM,
    kmsDriven[1] ?? MAX_KM,
  ];

  return (
    <FilterSection title="KM Driven">
      <div className="px-2">
        <Slider
          min={MIN_KM}
          max={MAX_KM}
          step={1000}
          value={value}
          onValueChange={(v) => setKmsDriven([v[0], v[1]])}
        />
        <div className="mt-2 text-sm text-gray-600 flex justify-between">
          <span>{formatNumber(value[0])} km</span>
          <span>{formatNumber(value[1])} km</span>
        </div>
        {(kmsDriven[0] !== undefined || kmsDriven[1] !== undefined) && (
          <button
            type="button"
            onClick={() => setKmsDriven([undefined, undefined])}
            className="mt-2 text-xs text-gray-500 hover:underline"
          >
            Clear
          </button>
        )}
      </div>
    </FilterSection>
  );
}

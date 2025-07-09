'use client';
import FilterSection from './filter-section';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

// Create a list of possible years (for example, the last 15 years).
const YEARS = Array.from({ length: 15 }, (_, i) => 2025 - i);

export default function YearRangeFilter({
  yearRange,
  setYearRange,
}: {
  // yearRange holds optional min and max years.
  yearRange: [number | undefined, number | undefined];
  setYearRange: (v: [number | undefined, number | undefined]) => void;
}) {
  // Convert numbers to strings for display; if undefined, use an empty string.
  const minYearValue = yearRange[0] ? yearRange[0].toString() : '';
  const maxYearValue = yearRange[1] ? yearRange[1].toString() : '';

  return (
    <FilterSection title="Year Range">
      <div className="flex gap-2">
        <Select
          value={minYearValue}
          onValueChange={(v) =>
            setYearRange([Number(v), yearRange[1]])
          }
        >
          <SelectTrigger className="w-full h-9">
            <SelectValue placeholder="Min Year" />
          </SelectTrigger>
          <SelectContent>
            {YEARS.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={maxYearValue}
          onValueChange={(v) =>
            setYearRange([yearRange[0], Number(v)])
          }
        >
          <SelectTrigger className="w-full h-9">
            <SelectValue placeholder="Max Year" />
          </SelectTrigger>
          <SelectContent>
            {YEARS.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {(yearRange[0] !== undefined || yearRange[1] !== undefined) && (
        <button
          type="button"
          onClick={() => setYearRange([undefined, undefined])}
          className="mt-2 text-xs text-gray-500 hover:underline"
        >
          Clear
        </button>
      )}
    </FilterSection>
  );
}

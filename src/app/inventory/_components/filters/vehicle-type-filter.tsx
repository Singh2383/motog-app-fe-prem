'use client';
import FilterSection from './filter-section';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export default function VehicleTypeFilter({
  vehicleType,
  setVehicleType,
}: {
  vehicleType?: 'car' | 'bike';
  setVehicleType: (v?: 'car' | 'bike') => void;
}) {
  return (
    <FilterSection title="Vehicle Type">
      <Select
        value={vehicleType ?? ''}
        onValueChange={(v) =>
          setVehicleType(v === '' ? undefined : (v as 'car' | 'bike'))
        }
      >
        <SelectTrigger className="w-full h-9">
          <SelectValue placeholder="Any type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="car">Car</SelectItem>
          <SelectItem value="bike">Bike</SelectItem>
        </SelectContent>
      </Select>

      {vehicleType && (
        <button
          type="button"
          onClick={() => setVehicleType(undefined)}
          className="mt-2 text-xs text-gray-500 hover:underline"
        >
          Clear
        </button>
      )}
    </FilterSection>
  );
}

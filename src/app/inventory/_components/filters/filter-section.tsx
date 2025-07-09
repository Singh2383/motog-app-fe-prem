// components/filters/filter-section.tsx
import { ReactNode } from 'react';

export default function FilterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b pb-4 mb-4">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

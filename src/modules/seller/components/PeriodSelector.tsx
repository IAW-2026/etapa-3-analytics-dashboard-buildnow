'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Period } from '../types';

export function PeriodSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPeriod = (searchParams.get('period') as Period) || '7d';

  const periods: { value: Period; label: string }[] = [
    { value: '7d', label: '7 días' },
    { value: '30d', label: '30 días' }
  ];

  const handlePeriodChange = (newPeriod: Period) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('period', newPeriod);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
      {periods.map((period) => {
        const isActive = currentPeriod === period.value;
        return (
          <button
            key={period.value}
            onClick={() => handlePeriodChange(period.value)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${isActive
                ? 'bg-slate-100 text-slate-800'
                : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            {period.label}
          </button>
        );
      })}
    </div>
  );
}

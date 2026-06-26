import React from 'react';
import { Star } from 'lucide-react';
import { TopProductData } from '../types';

interface TopProductsProps {
  data: TopProductData[];
}

export function TopProducts({ data }: TopProductsProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 text-slate-800 font-medium mb-6">
        <Star size={18} className="text-slate-500" />
        <h2>Productos top (plataforma)</h2>
      </div>

      <div className="flex flex-col gap-4 flex-1 justify-center">
        {data.map((product) => (
          <div key={product.rank} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-medium text-sm w-4">
                {product.rank}
              </span>
              <span className="text-slate-700 text-sm font-medium">
                {product.name}
              </span>
            </div>
            <span className="text-slate-800 font-bold text-sm">
              {product.sales}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

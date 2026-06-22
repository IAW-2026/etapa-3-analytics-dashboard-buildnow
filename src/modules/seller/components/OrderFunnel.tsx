import React from 'react';
import { Filter } from 'lucide-react';
import { OrderFunnelData } from '../types';

interface OrderFunnelProps {
  data: OrderFunnelData[];
}

export function OrderFunnel({ data }: OrderFunnelProps) {
  const getColorForStatus = (status: string) => {
    switch (status) {
      case 'Recibidas': return 'bg-blue-500';
      case 'Confirmadas': return 'bg-teal-500';
      case 'Listas': return 'bg-amber-500';
      case 'En camino': return 'bg-violet-500';
      case 'Entregadas': return 'bg-green-500';
      case 'Canceladas': return 'bg-red-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 text-slate-800 font-medium mb-6">
        <Filter size={18} className="text-slate-500" />
        <h2>Estado global de ordenes</h2>
      </div>

      <div className="flex flex-col gap-4 flex-1 justify-center">
        {data.map((item) => (
          <div key={item.status} className="flex items-center text-sm">
            <div className="w-28 font-medium text-slate-600 truncate" title={item.status}>
              {item.status}
            </div>

            <div className="flex-1 flex items-center gap-3">
              <div className="flex-1 bg-slate-100 h-6 rounded-md overflow-hidden flex">
                <div
                  className={`h-full ${getColorForStatus(item.status)} transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="w-12 text-right font-bold text-slate-800">
                {item.count}
              </div>
              <div className="w-12 text-right text-slate-500">
                {item.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

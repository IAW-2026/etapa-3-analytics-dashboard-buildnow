import React from 'react';
import { Activity } from 'lucide-react';
import { PlatformHealthData } from '../types';

interface PlatformHealthProps {
  data: PlatformHealthData;
}

export function PlatformHealth({ data }: PlatformHealthProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 text-slate-800 font-medium mb-6">
        <Activity size={18} className="text-slate-500" />
        <h2>Salud de la plataforma</h2>
      </div>

      <div className="flex flex-col gap-4 flex-1 justify-center">
        <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
          <span className="text-slate-600 text-sm">Tasa de cancelación</span>
          <span className={`text-xs font-bold px-2 py-1 rounded-md ${
            data.cancellationRate > 10 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
          }`}>
            {data.cancellationRate}%
          </span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
          <span className="text-slate-600 text-sm">Órdenes pendientes +2h</span>
          <span className={`text-xs font-bold px-2 py-1 rounded-md ${
            data.pendingOrders2h > 5 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
          }`}>
            {data.pendingOrders2h}
          </span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
          <span className="text-slate-600 text-sm">Tiendas cerradas ahora</span>
          <span className={`text-xs font-bold px-2 py-1 rounded-md ${
            data.closedStoresNow > 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
          }`}>
            {data.closedStoresNow}
          </span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
          <span className="text-slate-600 text-sm">Tiempo entrega prom.</span>
          <span className="text-sm font-bold text-slate-800">
            {data.averageDeliveryTime} min
          </span>
        </div>
      </div>
    </div>
  );
}

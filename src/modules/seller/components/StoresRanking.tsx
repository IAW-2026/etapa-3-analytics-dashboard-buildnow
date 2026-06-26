import React from 'react';
import { Trophy } from 'lucide-react';
import { StoreRankingData } from '../types';

interface StoresRankingProps {
  data: StoreRankingData[];
}

export function StoresRanking({ data }: StoresRankingProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 text-slate-800 font-medium mb-6">
        <Trophy size={18} className="text-slate-500" />
        <h2>Ranking de tiendas — top por revenue</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase border-b border-slate-200">
            <tr>
              <th className="pb-3 font-medium">#</th>
              <th className="pb-3 font-medium">Tienda</th>
              <th className="pb-3 font-medium text-right">Órdenes</th>
              <th className="pb-3 font-medium text-right">Ingresos</th>
              <th className="pb-3 font-medium text-right">Ticket prom.</th>
              <th className="pb-3 font-medium text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.map((store) => (
              <tr key={store.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <td className="py-3 text-slate-500">{store.rank}</td>
                <td className="py-3 font-medium text-slate-800">{store.name}</td>
                <td className="py-3 text-right">{store.orders}</td>
                <td className="py-3 text-right font-medium">{formatCurrency(store.revenue)}</td>
                <td className="py-3 text-right text-slate-500">{formatCurrency(store.averageTicket)}</td>
                <td className="py-3 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${store.status === 'Abierta'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                    }`}>
                    {store.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

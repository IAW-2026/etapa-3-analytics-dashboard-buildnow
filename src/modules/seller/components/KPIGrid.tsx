import React from 'react';
import { Store, ShoppingCart, DollarSign, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { PlatformSummary } from '../types';

interface KPIGridProps {
  data: PlatformSummary;
}

export function KPIGrid({ data }: KPIGridProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Tiendas activas */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 text-slate-500 mb-2">
          <Store size={18} />
          <h3 className="text-sm font-medium">Tiendas activas</h3>
        </div>
        <div>
          <p className="text-3xl font-bold text-slate-800">{data.activeStores.current}</p>
          <p className="text-sm text-slate-500 mt-1">{data.activeStores.total} total registradas</p>
        </div>
      </div>

      {/* Órdenes totales */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 text-slate-500 mb-2">
          <ShoppingCart size={18} />
          <h3 className="text-sm font-medium">Órdenes totales</h3>
        </div>
        <div>
          <p className="text-3xl font-bold text-slate-800">{data.totalOrders.current}</p>
          <div className="mt-1 h-5" />
        </div>
      </div>

      {/* Ingresos plataforma */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 text-slate-500 mb-2">
          <DollarSign size={18} />
          <h3 className="text-sm font-medium">Ingresos plataforma</h3>
        </div>
        <div>
          <p className="text-3xl font-bold text-slate-800">{formatCurrency(data.platformRevenue.current)}</p>
          <div className="mt-1 h-5" />
        </div>
      </div>

      {/* Sellers registrados */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 text-slate-500 mb-2">
          <Users size={18} />
          <h3 className="text-sm font-medium">Sellers registrados</h3>
        </div>
        <div>
          <p className="text-3xl font-bold text-slate-800">{data.registeredSellers.current}</p>
          <p className="text-sm text-slate-500 mt-1">{data.registeredSellers.unassigned} sin tienda asignada</p>
        </div>
      </div>
    </div>
  );
}

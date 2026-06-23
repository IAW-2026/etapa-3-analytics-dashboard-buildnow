'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TopProduct } from '../types';

interface TopProductsTableProps {
  products: TopProduct[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-md text-sm max-w-[250px] whitespace-normal">
        <p className="font-semibold text-slate-800 mb-1 leading-tight">{data.productName}</p>
        <p className="text-slate-500 text-xs mb-2">Tienda: <span className="font-medium text-slate-700">{data.storeName}</span></p>
        <p className="text-emerald-600 font-medium">Veces agregado: {data.timesAdded}</p>
      </div>
    );
  }
  return null;
};

export function TopProductsTable({ products }: TopProductsTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 overflow-hidden flex flex-col shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Productos más agregados al carrito</h3>
      <div className="flex-1 min-h-[300px]">
        {products.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-slate-500">
            No hay datos de productos disponibles
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={products} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis 
                dataKey="productName" 
                type="category" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }}
                width={120}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="timesAdded" name="Veces Agregado" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

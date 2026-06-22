'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BuyerCity } from '../types';

interface BuyerCitiesChartProps {
  cities: BuyerCity[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function BuyerCitiesChart({ cities }: BuyerCitiesChartProps) {
  if (!cities || cities.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 h-full flex items-center justify-center shadow-sm">
        <p className="text-slate-500">No hay datos de ciudades disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 h-full flex flex-col shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Compradores por Ciudad</h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={cities}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="buyers"
              nameKey="city"
            >
              {cities.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

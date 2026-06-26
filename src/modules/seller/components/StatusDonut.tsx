'use client';

import React from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { StatusDonutData } from '../types';

interface StatusDonutProps {
  data: StatusDonutData[];
}

const STATUS_COLORS: Record<string, string> = {
  'Entregadas': '#22c55e',
  'Confirmadas': '#14b8a6',
  'Canceladas': '#ef4444',
  'Listas': '#f59e0b',
  'En camino': '#8b5cf6',
  'Recibidas': '#3b82f6',
  'delivered': '#22c55e',
  'Delivered': '#22c55e',
  'confirmed': '#14b8a6',
  'Confirmed': '#14b8a6',
  'cancelled': '#ef4444',
  'Cancelled': '#ef4444',
  'ready': '#f59e0b',
  'Ready': '#f59e0b',
  'on_the_way': '#8b5cf6',
  'On the way': '#8b5cf6',
  'pending_payment': '#3b82f6',
  'Pending payment': '#3b82f6',
};

const getColorForStatus = (name: string, fallback?: string): string =>
  STATUS_COLORS[name] ?? fallback ?? '#94a3b8'; // slate-400

export function StatusDonut({ data }: StatusDonutProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 text-slate-800 font-medium mb-6">
        <PieChartIcon size={18} className="text-slate-500" />
        <h2>Órdenes por estado</h2>
      </div>

      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColorForStatus(entry.name, entry.color)}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

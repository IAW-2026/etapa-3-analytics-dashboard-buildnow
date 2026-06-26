'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PaymentStatusData } from '../types';

const COLORS = {
  Approved: '#059669', // Emerald 600
  Pending: '#D4D4D8', // Zinc 300
  Rejected: '#DC2626', // Red 600
};

export function PaymentsByStatusChart({ data }: { data: PaymentStatusData | null }) {
  if (!data) return null;

  const total = data.approved + data.pending + data.rejected;

  const chartData = [
    { name: 'Aprobado', value: data.approved, color: COLORS.Approved },
    { name: 'Pendiente', value: data.pending, color: COLORS.Pending },
    { name: 'Rechazado', value: data.rejected, color: COLORS.Rejected },
  ];

  const formatPercent = (val: number) => `${((val / total) * 100).toFixed(0)}%`;

  return (
    <div className="bg-white p-6 rounded-xl border border-black shadow-sm">
      <h3 className="text-lg font-semibold text-black mb-6">
        Pagos por estado
      </h3>

      <div className="h-80 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat('en-US').format(Number(value ?? 0))
              }
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #000000',
                borderRadius: '8px',
                color: '#000000',
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry: any) => (
                <span className="text-black font-medium ml-1">
                  {value} {formatPercent(entry.payload.value)}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-8">
          <span className="text-sm text-zinc-600 font-medium">
            Total
          </span>

          <span className="text-2xl font-bold text-black">
            {new Intl.NumberFormat('en-US').format(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

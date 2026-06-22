'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PayoutsData } from '../types';

export function PayoutsByRecipientChart({ data }: { data: PayoutsData | null }) {
  if (!data) return null;

  const chartData = [
    { name: 'Sellers', value: data.sellers },
    { name: 'Deliveries', value: data.delivery },
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-black shadow-sm">
      <h3 className="text-lg font-semibold text-black mb-6">
        Payouts por recipiente
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={40}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#d4d4d8"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#000000',
                fontSize: 12,
                fontWeight: 500,
              }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCurrency}
              tick={{
                fill: '#000000',
                fontSize: 12,
              }}
              dx={-10}
            />

            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(Number(value ?? 0))
              }
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #000000',
                borderRadius: '8px',
                color: '#000000',
              }}
              cursor={{ fill: '#f5f5f5' }}
            />

            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              fill="#000000"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

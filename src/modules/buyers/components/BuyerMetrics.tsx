import { Users, MapPin, ShoppingCart, DollarSign } from 'lucide-react';
import { BuyerSummary } from '../types';

interface BuyerMetricsProps {
  summary: BuyerSummary | null;
}

export function BuyerMetrics({ summary }: BuyerMetricsProps) {
  if (!summary) return null;

  const metrics = [
    {
      title: 'Total Buyers',
      value: summary.totalBuyers.toLocaleString(),
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Buyers with Address',
      value: summary.buyersWithAddress.toLocaleString(),
      icon: MapPin,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Active Carts',
      value: summary.activeCarts.toLocaleString(),
      icon: ShoppingCart,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Estimated Cart Value',
      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(summary.estimatedCartValue),
      icon: DollarSign,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, i) => {
        const Icon = metric.icon;
        return (
          <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {metric.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { Users, MapPin, ShoppingCart, DollarSign } from 'lucide-react';
import { BuyerSummary } from '../types';

interface BuyerMetricsProps {
  summary: BuyerSummary | null;
}

export function BuyerMetrics({ summary }: BuyerMetricsProps) {
  if (!summary) return null;

  const metrics = [
    {
      title: 'Compradores totales',
      value: summary.totalBuyers.toLocaleString('es-AR'),
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Compradores con dirección',
      value: summary.buyersWithAddress.toLocaleString('es-AR'),
      icon: MapPin,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Carritos activos',
      value: summary.activeCarts.toLocaleString('es-AR'),
      icon: ShoppingCart,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Valor est. de carritos',
      value: new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(summary.estimatedCartValue),
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
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-slate-800">
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

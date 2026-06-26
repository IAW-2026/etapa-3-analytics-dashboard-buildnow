import { Wallet, CheckCircle2, ArrowUpRight, PieChart } from 'lucide-react';
import { FinanceSummary } from '../types';

export function FinanceMetrics({ summary }: { summary: FinanceSummary | null }) {
  if (!summary) return null;

  const metrics = [
    {
      title: 'GANANCIAS',
      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(summary.totalRevenue),
      icon: Wallet,
    },
    {
      title: 'PAGOS APROBADOS',
      value: new Intl.NumberFormat('en-US').format(summary.approvedPayments),
      icon: CheckCircle2,
    },
    {
      title: 'PAYOUTS',
      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(summary.totalPayouts),
      icon: ArrowUpRight,
    },
    {
      title: 'COMISIONES DE PLATAFORMA',
      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(summary.platformCommissions),
      icon: PieChart,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="bg-white border border-black rounded-xl p-6 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-semibold text-black tracking-wider">
              {metric.title}
            </h3>

            <div className="p-2 border border-black rounded-full">
              <metric.icon className="w-4 h-4 text-black" />
            </div>
          </div>

          <p className="text-3xl font-bold text-black">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}

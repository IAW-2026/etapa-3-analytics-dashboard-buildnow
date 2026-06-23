import {
  getFinanceSummaryAction,
  getPaymentStatusAction,
  getPayoutsAction,
  getRejectedPaymentsAction,
} from '@/modules/finances/actions/financeAnalyticsActions';

import { FinanceMetrics } from '@/modules/finances/components/FinanceMetrics';
import { PaymentsByStatusChart } from '@/modules/finances/components/PaymentsByStatusChart';
import { PayoutsByRecipientChart } from '@/modules/finances/components/PayoutsByRecipientChart';
import { RecentRejectedPayments } from '@/modules/finances/components/RecentRejectedPayments';

export const metadata = {
  title: 'Finances Analytics Dashboard',
  description: 'Vista general de finanzas y operaciones',
};

export default async function FinancesPage() {
  const [summary, paymentStatus, payouts, rejectedPayments] = await Promise.all([
    getFinanceSummaryAction(),
    getPaymentStatusAction(),
    getPayoutsAction(),
    getRejectedPaymentsAction(),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black">Analytics</h1>
        <p className="text-black mt-2">Vista general de finanzas y operaciones.</p>
      </div>

      <FinanceMetrics summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentsByStatusChart data={paymentStatus} />
        <PayoutsByRecipientChart data={payouts} />
      </div>

      <div className="pt-2">
        <RecentRejectedPayments payments={rejectedPayments} />
      </div>
    </div>
  );
}

import { Download } from 'lucide-react';
import { RejectedPayment } from '../types';

export function RecentRejectedPayments({ payments }: { payments: RejectedPayment[] }) {
  if (!payments || payments.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 text-center text-black">
        No hay pagos rechazados.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white">
        <h3 className="text-lg font-semibold text-black">Pagos rechazados</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-black tracking-wider uppercase">
              <th className="px-6 py-4">ORDER ID</th>
              <th className="px-6 py-4">BUYER EMAIL</th>
              <th className="px-6 py-4 text-right">MONTO</th>
              <th className="px-6 py-4">FECHA</th>
              <th className="px-6 py-4">ESTADO</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 text-sm font-medium text-black whitespace-nowrap">
                  {payment.orderId ? `#${payment.orderId}` : 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                  {payment.payerEmail || 'Unknown'}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-black text-right whitespace-nowrap">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payment.amount)}
                </td>
                <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                  {new Date(payment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    Rechazado
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import {
  getBuyerSummaryAction,
  getBuyerCitiesAction,
  getTopProductsAction,
  getTopCartValuesAction,
  getBuyerActivityAction,
} from '@/modules/buyers/actions/buyerAnalyticsActions';

import { BuyerMetrics } from '@/modules/buyers/components/BuyerMetrics';
import { BuyerCitiesChart } from '@/modules/buyers/components/BuyerCitiesChart';
import { TopProductsTable } from '@/modules/buyers/components/TopProductsTable';
import { TopBuyersTable } from '@/modules/buyers/components/TopBuyersTable';
import { RecentActivity } from '@/modules/buyers/components/RecentActivity';
import { AutoRefresh } from '@/modules/buyers/components/AutoRefresh';

export const metadata = {
  title: 'Buyers Analytics Dashboard',
  description: 'Métricas y análisis de compradores',
};

export default async function BuyersPage() {
  const [summary, cities, topProducts, topCartValues, activity] = await Promise.all([
    getBuyerSummaryAction(),
    getBuyerCitiesAction(),
    getTopProductsAction(),
    getTopCartValuesAction(),
    getBuyerActivityAction(),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <AutoRefresh intervalMs={20000} />
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Buyers</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">Métricas y análisis de compradores</p>
      </div>

      <BuyerMetrics summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TopProductsTable products={topProducts} />
            <TopBuyersTable buyers={topCartValues} />
          </div>
          <div className="h-[400px]">
            <BuyerCitiesChart cities={cities} />
          </div>
        </div>
        
        <div className="lg:col-span-1 h-[600px] lg:h-auto">
          <RecentActivity activities={activity} />
        </div>
      </div>
    </div>
  );
}

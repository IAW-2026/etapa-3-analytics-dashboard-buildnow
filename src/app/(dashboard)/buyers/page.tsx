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

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamic = 'force-dynamic';

export default async function BuyersPage({ searchParams }: PageProps) {
  const [summary, cities, topProducts, topCartValues, activity] = await Promise.all([
    getBuyerSummaryAction(),
    getBuyerCitiesAction(),
    getTopProductsAction(),
    getTopCartValuesAction(),
    getBuyerActivityAction(),
  ]);

  const groupedCitiesMap = cities.reduce((acc, curr) => {
    const rawCity = curr.city ? curr.city.trim() : 'Desconocido';
    const normalizedCity = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).toLowerCase();
    
    if (!acc[normalizedCity]) {
      acc[normalizedCity] = 0;
    }
    acc[normalizedCity] += curr.buyers;
    return acc;
  }, {} as Record<string, number>);

  const processedCities = Object.entries(groupedCitiesMap)
    .map(([city, buyers]) => ({ city, buyers }))
    .sort((a, b) => b.buyers - a.buyers)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto space-y-6">
        <AutoRefresh intervalMs={20000} />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Compradores</h1>
            <p className="text-slate-500 text-sm mt-1">Métricas y análisis de comportamiento de los compradores</p>
          </div>
        </div>

        <section>
          <BuyerMetrics summary={summary} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TopProductsTable products={topProducts.slice(0, 5)} />
              <TopBuyersTable buyers={topCartValues.slice(0, 5)} />
            </div>
            <div className="h-[400px]">
              <BuyerCitiesChart cities={processedCities} />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <RecentActivity activities={activity.slice(0, 6)} />
          </div>
        </section>
      </div>
    </div>
  );
}

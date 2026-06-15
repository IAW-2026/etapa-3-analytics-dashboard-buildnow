import React from 'react';
import { KPIGrid } from '@/modules/seller/components/KPIGrid';
import { RevenueChart } from '@/modules/seller/components/RevenueChart';
import { OrderFunnel } from '@/modules/seller/components/OrderFunnel';
import { StoresRanking } from '@/modules/seller/components/StoresRanking';
import { StatusDonut } from '@/modules/seller/components/StatusDonut';
import { CategoryChart } from '@/modules/seller/components/CategoryChart';
import { PlatformHealth } from '@/modules/seller/components/PlatformHealth';
import { TopProducts } from '@/modules/seller/components/TopProducts';

import {
  getPlatformSummary,
  getRevenueTimeseries,
  getOrderFunnel,
  getStoresRanking,
  getStatusDonut,
  getCategorySales,
  getPlatformHealth,
  getTopProducts
} from '@/modules/seller/services/analytics';
import { Period } from '@/modules/seller/types';

import { PeriodSelector } from '@/modules/seller/components/PeriodSelector';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function OrdersDashboardPage({ searchParams }: Props) {
  // Await searchParams ya que en Next.js 15+ es asíncrono
  const params = await searchParams;
  const rawPeriod = typeof params.period === 'string' ? params.period : '7d';
  
  // Validamos que el periodo sea correcto, si no fallback a '7d'
  const currentPeriod: Period = ['7d', '30d', '90d'].includes(rawPeriod) 
    ? (rawPeriod as Period) 
    : '7d';

  // Realizamos el fetch de los datos en paralelo usando los servicios (Fase 2 y 3)
  const [
    platformSummary,
    revenueTimeseries,
    orderFunnel,
    storesRanking,
    statusDonut,
    categorySales,
    platformHealth,
    topProducts
  ] = await Promise.all([
    getPlatformSummary(currentPeriod),
    getRevenueTimeseries(currentPeriod),
    getOrderFunnel(currentPeriod),
    getStoresRanking(currentPeriod),
    getStatusDonut(currentPeriod),
    getCategorySales(currentPeriod),
    getPlatformHealth(),
    getTopProducts(currentPeriod)
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Panel de administración</h1>
            <p className="text-slate-500 text-sm mt-1">Vista global de la plataforma — todas las tiendas y órdenes</p>
          </div>

          {/* Period Selector Interactivo (Fase 4) */}
          <PeriodSelector />
        </div>

        {/* Row 1: KPI Grid */}
        <section>
          <KPIGrid data={platformSummary} />
        </section>

        {/* Row 2: Charts (Revenue & Funnel) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart data={revenueTimeseries} />
          </div>
          <div className="lg:col-span-1">
            <OrderFunnel data={orderFunnel} />
          </div>
        </section>

        {/* Row 3: Table and Donut */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StoresRanking data={storesRanking} />
          </div>
          <div className="lg:col-span-1">
            <StatusDonut data={statusDonut} />
          </div>
        </section>

        {/* Row 4: Bottom Widgets */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <CategoryChart data={categorySales} />
          </div>
          <div>
            <PlatformHealth data={platformHealth} />
          </div>
          <div>
            <TopProducts data={topProducts} />
          </div>
        </section>

      </div>
    </div>
  );
}

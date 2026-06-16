import { auth } from '@clerk/nextjs/server';
import { 
  PlatformSummary, RevenueDataPoint, OrderFunnelData, 
  StoreRankingData, StatusDonutData, CategorySalesData, 
  PlatformHealthData, TopProductData, Period 
} from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_SELLER_URL || 'http://localhost:3001';

/**
 * Helper genérico para hacer fetch con autenticación al backend de analytics.
 */
async function fetchWithAuth<T>(endpoint: string, period?: Period): Promise<T> {
  const { getToken } = await auth();
  const token = await getToken();

  // Construimos la URL con el query param period si existe
  const url = new URL(`${API_BASE_URL}/api/analytics/${endpoint}`);
  if (period) {
    url.searchParams.append('period', period);
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store' // Para asegurar datos frescos en el dashboard
  });

  if (!response.ok) {
    console.error(`[Analytics API Error] ${endpoint}: ${response.statusText}`);
    // En un caso real, podríamos devolver data mockeada como fallback o lanzar el error
    // Para no romper el dashboard si el endpoint no existe aún, lanzamos el error
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return response.json();
}

export async function getPlatformSummary(period: Period): Promise<PlatformSummary> {
  return fetchWithAuth<PlatformSummary>('platform-summary', period);
}

export async function getRevenueTimeseries(period: Period): Promise<RevenueDataPoint[]> {
  return fetchWithAuth<RevenueDataPoint[]>('revenue-timeseries', period);
}

export async function getOrderFunnel(period: Period): Promise<OrderFunnelData[]> {
  return fetchWithAuth<OrderFunnelData[]>('order-funnel', period);
}

export async function getStoresRanking(period: Period): Promise<StoreRankingData[]> {
  return fetchWithAuth<StoreRankingData[]>('stores-ranking', period);
}

export async function getStatusDonut(period: Period): Promise<StatusDonutData[]> {
  return fetchWithAuth<StatusDonutData[]>('status-donut', period);
}

export async function getCategorySales(period: Period): Promise<CategorySalesData[]> {
  return fetchWithAuth<CategorySalesData[]>('category-sales', period);
}

export async function getPlatformHealth(): Promise<PlatformHealthData> {
  return fetchWithAuth<PlatformHealthData>('platform-health');
}

export async function getTopProducts(period: Period): Promise<TopProductData[]> {
  return fetchWithAuth<TopProductData[]>('top-products', period);
}

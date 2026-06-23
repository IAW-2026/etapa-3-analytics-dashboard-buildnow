import { auth } from '@clerk/nextjs/server';
import { BuyerActivity, BuyerCity, BuyerSummary, TopCartValue, TopProduct } from '../types';

const API_BASE_URL = process.env.BUYER_APP_URL || 'http://localhost:3000';

/**
 * Helper genérico para hacer fetch con autenticación (Bearer token de Clerk)
 * al backend de Buyer App. Ambas apps comparten el mismo Clerk instance,
 * por lo que el token JWT del Dashboard es válido en la Buyer App.
 */
async function fetchWithAuth<T>(endpoint: string): Promise<T> {
  const { getToken, userId, sessionClaims } = await auth();
  const token = await getToken();

  console.log('[Buyer API Auth Debug]', {
    userId,
    role: (sessionClaims as any)?.metadata?.role ?? (sessionClaims as any)?.publicMetadata?.role ?? 'N/A',
    sessionClaims,
    tokenPreview: token ? `${token.substring(0, 30)}...` : 'NULL',
  });

  const url = `${API_BASE_URL}/api/analytics/buyers/${endpoint}`;
  console.log(`[Buyer API Debug] Fetching from: ${url}`);
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const isRedirect = response.status >= 300 && response.status < 400;
    const location = response.headers.get('location');
    console.error(`[Buyer API Error] ${endpoint}: ${response.status} ${response.statusText}${isRedirect ? ` (Redirect to: ${location})` : ''}`);
    const text = await response.text();
    console.error(`[Buyer API Error Text] ${text.substring(0, 200)}`);
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return response.json();
}

export async function fetchBuyerSummary(): Promise<BuyerSummary> {
  return fetchWithAuth<BuyerSummary>('summary');
}

export async function fetchBuyerCities(): Promise<BuyerCity[]> {
  return fetchWithAuth<BuyerCity[]>('cities');
}

export async function fetchTopProducts(): Promise<TopProduct[]> {
  return fetchWithAuth<TopProduct[]>('top-products');
}

export async function fetchTopCartValues(): Promise<TopCartValue[]> {
  return fetchWithAuth<TopCartValue[]>('top-cart-values');
}

export async function fetchBuyerActivity(): Promise<BuyerActivity[]> {
  return fetchWithAuth<BuyerActivity[]>('activity');
}

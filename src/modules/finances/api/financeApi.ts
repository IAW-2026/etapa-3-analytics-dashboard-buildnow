import { auth } from '@clerk/nextjs/server';
import {
  FinanceSummary,
  PaymentStatusData,
  PayoutsData,
  ApiResponse,
  RejectedPayment,
} from '../types';

const API_BASE_URL = process.env.PAYMENTS_APP_URL;

async function fetchWithAuth<T>(endpoint: string): Promise<T> {
  const { getToken } = await auth();
  const token = await getToken();

  const response = await fetch(`${API_BASE_URL}/api/analytics/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error(
      `[Finance API Error] ${endpoint}: ${response.status} ${response.statusText}`
    );
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return response.json();
}

export async function fetchFinanceSummary(): Promise<FinanceSummary> {
  const response = await fetchWithAuth<ApiResponse<FinanceSummary>>(
    'summary'
  );

  return response.data;
}

export async function fetchPaymentStatus(): Promise<PaymentStatusData> {
  const response = await fetchWithAuth<ApiResponse<PaymentStatusData>>(
    'status'
  );

  return response.data;
}

export async function fetchPayouts(): Promise<PayoutsData> {
  const response = await fetchWithAuth<ApiResponse<PayoutsData>>(
    'payouts-by-recipient'
  );

  return response.data;
}

export async function fetchRejectedPayments(): Promise<RejectedPayment[]> {
  const response = await fetchWithAuth<ApiResponse<RejectedPayment[]>>(
    'rejected-payments'
  );

  return response.data;
}
'use server';

import { FinanceAnalyticsService } from '../services/financeAnalyticsService';

export async function getFinanceSummaryAction() {
  return await FinanceAnalyticsService.getSummary();
}

export async function getPaymentStatusAction() {
  return await FinanceAnalyticsService.getPaymentStatus();
}

export async function getPayoutsAction() {
  return await FinanceAnalyticsService.getPayouts();
}

export async function getRejectedPaymentsAction() {
  return await FinanceAnalyticsService.getRejectedPayments();
}

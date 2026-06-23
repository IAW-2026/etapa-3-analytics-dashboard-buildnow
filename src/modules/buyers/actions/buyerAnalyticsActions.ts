'use server';

import { BuyerAnalyticsService } from '../services/buyerAnalyticsService';

export async function getBuyerSummaryAction() {
  return await BuyerAnalyticsService.getSummary();
}

export async function getBuyerCitiesAction() {
  return await BuyerAnalyticsService.getCities();
}

export async function getTopProductsAction() {
  return await BuyerAnalyticsService.getTopProducts();
}

export async function getTopCartValuesAction() {
  return await BuyerAnalyticsService.getTopCartValues();
}

export async function getBuyerActivityAction() {
  return await BuyerAnalyticsService.getActivity();
}

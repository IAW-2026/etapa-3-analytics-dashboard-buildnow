import {
  fetchBuyerSummary,
  fetchBuyerCities,
  fetchTopProducts,
  fetchTopCartValues,
  fetchBuyerActivity,
} from '../api/buyerApi';

export class BuyerAnalyticsService {
  static async getSummary() {
    try {
      return await fetchBuyerSummary();
    } catch (error) {
      console.error('Error in BuyerAnalyticsService.getSummary:', error);
      return null;
    }
  }

  static async getCities() {
    try {
      return await fetchBuyerCities();
    } catch (error) {
      console.error('Error in BuyerAnalyticsService.getCities:', error);
      return [];
    }
  }

  static async getTopProducts() {
    try {
      return await fetchTopProducts();
    } catch (error) {
      console.error('Error in BuyerAnalyticsService.getTopProducts:', error);
      return [];
    }
  }

  static async getTopCartValues() {
    try {
      return await fetchTopCartValues();
    } catch (error) {
      console.error('Error in BuyerAnalyticsService.getTopCartValues:', error);
      return [];
    }
  }

  static async getActivity() {
    try {
      return await fetchBuyerActivity();
    } catch (error) {
      console.error('Error in BuyerAnalyticsService.getActivity:', error);
      return [];
    }
  }
}

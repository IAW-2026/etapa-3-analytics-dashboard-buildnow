import {
  fetchFinanceSummary,
  fetchPaymentStatus,
  fetchPayouts,
  fetchRejectedPayments,
} from '../api/financeApi';

export class FinanceAnalyticsService {
  static getSummary() {
    return fetchFinanceSummary();
  }

  static getPaymentStatus() {
    return fetchPaymentStatus();
  }

  static getPayouts() {
    return fetchPayouts();
  }

  static getRejectedPayments() {
    return fetchRejectedPayments();
  }
}
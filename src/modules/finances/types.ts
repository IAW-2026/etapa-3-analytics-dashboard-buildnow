export interface FinanceSummary {
  totalRevenue: number;
  approvedPayments: number;
  totalPayouts: number;
  platformCommissions: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface PaymentStatusData {
  approved: number;
  pending: number;
  rejected: number;
}

export interface PayoutsData {
  sellers: number;
  delivery: number;
}

export interface RejectedPayment {
  id: string;
  orderId: string;
  payerEmail: string | null;
  amount: number;
  createdAt: string;
}

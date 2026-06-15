export type OrderStatus = 'pending_payment' | 'confirmed' | 'ready' | 'on_the_way' | 'delivered' | 'cancelled';
export type Period = '7d' | '30d' | '90d';

export interface Store {
  id: string;
  name: string;
  status: 'open' | 'closed';
}

export interface Order {
  id: string;
  storeId: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Category {
  id: string;
  name: string;
}

// KPI Dashboard specific types
export interface PlatformSummary {
  activeStores: { current: number; total: number };
  totalOrders: { current: number; previous: number; trend: number };
  platformRevenue: { current: number; previous: number; trend: number };
  registeredSellers: { current: number; unassigned: number };
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface OrderFunnelData {
  status: string;
  count: number;
  percentage: number;
}

export interface StoreRankingData {
  id: string;
  rank: number;
  name: string;
  orders: number;
  revenue: number;
  averageTicket: number;
  status: 'Abierta' | 'Cerrada';
}

export interface StatusDonutData {
  name: string;
  value: number;
  color: string;
}

export interface CategorySalesData {
  name: string;
  percentage: number;
  color: string;
}

export interface PlatformHealthData {
  cancellationRate: number;
  pendingOrders2h: number;
  closedStoresNow: number;
  averageDeliveryTime: number;
}

export interface TopProductData {
  rank: number;
  name: string;
  sales: number;
}

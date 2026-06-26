import { 
  PlatformSummary, RevenueDataPoint, OrderFunnelData, 
  StoreRankingData, StatusDonutData, CategorySalesData, 
  PlatformHealthData, TopProductData 
} from '../../types';

export const mockPlatformSummary: PlatformSummary = {
  activeStores: { current: 12, total: 15 },
  totalOrders: { current: 381, previous: 334, trend: 14 },
  platformRevenue: { current: 1148200, previous: 964873, trend: 19 },
  registeredSellers: { current: 23, unassigned: 4 }
};

export const mockRevenueTimeseries: RevenueDataPoint[] = [
  { date: 'Lun', revenue: 140000, orders: 45 },
  { date: 'Mar', revenue: 165000, orders: 55 },
  { date: 'Mié', revenue: 130000, orders: 40 },
  { date: 'Jue', revenue: 185000, orders: 60 },
  { date: 'Vie', revenue: 170000, orders: 58 },
  { date: 'Sáb', revenue: 220000, orders: 75 },
  { date: 'Dom', revenue: 138200, orders: 48 }
];

export const mockOrderFunnel: OrderFunnelData[] = [
  { status: 'Recibidas', count: 381, percentage: 100 },
  { status: 'Confirmadas', count: 341, percentage: 90 },
  { status: 'Listas', count: 308, percentage: 81 },
  { status: 'En camino', count: 291, percentage: 76 },
  { status: 'Entregadas', count: 278, percentage: 73 },
  { status: 'Canceladas', count: 42, percentage: 11 }
];

export const mockStoresRanking: StoreRankingData[] = [
  { id: '1', rank: 1, name: 'La Esquina del Sabor', orders: 74, revenue: 228400, averageTicket: 3086, status: 'Abierta' },
  { id: '2', rank: 2, name: 'Burger Planet', orders: 68, revenue: 214800, averageTicket: 3159, status: 'Abierta' },
  { id: '3', rank: 3, name: 'Verde & Fresco', orders: 52, revenue: 168200, averageTicket: 3234, status: 'Abierta' },
  { id: '4', rank: 4, name: 'Pizzería Roma', orders: 49, revenue: 152600, averageTicket: 3114, status: 'Abierta' },
  { id: '5', rank: 5, name: 'El Rincón Árabe', orders: 38, revenue: 118000, averageTicket: 3105, status: 'Cerrada' }
];

export const mockStatusDonut: StatusDonutData[] = [
  { name: 'Delivered', value: 278, color: '#22c55e' }, // green-500
  { name: 'Confirmed', value: 63, color: '#14b8a6' }, // teal-500
  { name: 'Cancelled', value: 42, color: '#ef4444' }, // red-500
  { name: 'Ready', value: 33, color: '#f59e0b' }, // amber-500
  { name: 'On the way', value: 29, color: '#8b5cf6' }, // violet-500
  { name: 'Pending payment', value: 12, color: '#3b82f6' } // blue-500
];

export const mockCategorySales: CategorySalesData[] = [
  { name: 'Comidas', percentage: 38, color: '#3b82f6' }, // blue-500
  { name: 'Guarniciones', percentage: 24, color: '#10b981' }, // emerald-500
  { name: 'Bebidas', percentage: 18, color: '#f59e0b' }, // amber-500
  { name: 'Ensaladas', percentage: 12, color: '#6366f1' }, // indigo-500
  { name: 'Otros', percentage: 8, color: '#9ca3af' } // gray-400
];

export const mockPlatformHealth: PlatformHealthData = {
  cancellationRate: 11,
  pendingOrders2h: 8,
  closedStoresNow: 3,
  averageDeliveryTime: 28
};

export const mockTopProducts: TopProductData[] = [
  { rank: 1, name: 'Hamburguesa clásica', sales: 312 },
  { rank: 2, name: 'Papas fritas grandes', sales: 274 },
  { rank: 3, name: 'Milanesa napolitana', sales: 198 },
  { rank: 4, name: 'Pizza mozzarella', sales: 187 },
  { rank: 5, name: 'Coca-Cola 500ml', sales: 161 }
];

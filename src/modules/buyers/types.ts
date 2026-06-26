export interface BuyerSummary {
  totalBuyers: number;
  buyersWithAddress: number;
  activeCarts: number;
  estimatedCartValue: number;
}

export interface BuyerCity {
  city: string;
  buyers: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  storeName: string;
  timesAdded: number;
}

export interface TopCartValue {
  buyerId: string;
  buyerName: string;
  estimatedValue: number;
}

export interface BuyerActivity {
  type: string;
  description: string;
  createdAt: string;
}

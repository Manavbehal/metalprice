export interface MetalDetail {
  symbol: string;
  name: string;
  price: number;
  open_price: number;
  high_price: number;
  low_price: number;
  change: number;
  change_pct: number;
  currency: string;
  timestamp: number;
}

export interface DetailRow {
  label: string;
  value: string;
  highlight?: boolean;
}

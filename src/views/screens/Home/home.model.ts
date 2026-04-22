export interface Metal {
  symbol: string;
  name: string;
}

export interface MetalWithPrice extends Metal {
  price: number | null;
}

export const METALS: Metal[] = [
  { symbol: 'XAU', name: 'Gold' },
  { symbol: 'XAG', name: 'Silver' },
  { symbol: 'XPT', name: 'Platinum' },
  { symbol: 'XPD', name: 'Palladium' },
];

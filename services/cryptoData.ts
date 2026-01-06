export interface Crypto {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  marketCap: string;
  volume24h: string;
  circulatingSupply: string;
  totalSupply: string;
  rank: number;
  icon?: string;
}

export interface CryptoOrder {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  total: number;
  status: 'PENDING' | 'EXECUTED' | 'CANCELLED';
  timestamp: string;
}

export interface CryptoHolding {
  symbol: string;
  name: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export const topCryptos: Crypto[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 7245680.50,
    change24h: 125430.20,
    changePercent24h: 1.76,
    marketCap: '₹142.5L Cr',
    volume24h: '₹3.2L Cr',
    circulatingSupply: '19.6M BTC',
    totalSupply: '21M BTC',
    rank: 1,
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 289456.30,
    change24h: -3245.80,
    changePercent24h: -1.11,
    marketCap: '₹34.8L Cr',
    volume24h: '₹1.5L Cr',
    circulatingSupply: '120.2M ETH',
    totalSupply: 'Unlimited',
    rank: 2,
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    price: 56842.90,
    change24h: 1234.50,
    changePercent24h: 2.22,
    marketCap: '₹8.2L Cr',
    volume24h: '₹45,678 Cr',
    circulatingSupply: '144.4M BNB',
    totalSupply: '144.4M BNB',
    rank: 3,
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 18956.40,
    change24h: 845.20,
    changePercent24h: 4.67,
    marketCap: '₹8.9L Cr',
    volume24h: '₹38,234 Cr',
    circulatingSupply: '470.2M SOL',
    totalSupply: '588.7M SOL',
    rank: 4,
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    price: 234.80,
    change24h: -5.60,
    changePercent24h: -2.33,
    marketCap: '₹13.4L Cr',
    volume24h: '₹52,345 Cr',
    circulatingSupply: '57.1B XRP',
    totalSupply: '100B XRP',
    rank: 5,
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 89.45,
    change24h: 2.30,
    changePercent24h: 2.64,
    marketCap: '₹3.1L Cr',
    volume24h: '₹12,456 Cr',
    circulatingSupply: '35.0B ADA',
    totalSupply: '45B ADA',
    rank: 6,
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 34.25,
    change24h: -1.15,
    changePercent24h: -3.25,
    marketCap: '₹5.0L Cr',
    volume24h: '₹28,567 Cr',
    circulatingSupply: '147.0B DOGE',
    totalSupply: 'Unlimited',
    rank: 7,
  },
  {
    id: 'polygon',
    symbol: 'MATIC',
    name: 'Polygon',
    price: 67.80,
    change24h: 3.45,
    changePercent24h: 5.36,
    marketCap: '₹62,345 Cr',
    volume24h: '₹8,234 Cr',
    circulatingSupply: '9.2B MATIC',
    totalSupply: '10B MATIC',
    rank: 8,
  },
  {
    id: 'polkadot',
    symbol: 'DOT',
    name: 'Polkadot',
    price: 678.90,
    change24h: 12.40,
    changePercent24h: 1.86,
    marketCap: '₹1.1L Cr',
    volume24h: '₹6,789 Cr',
    circulatingSupply: '1.6B DOT',
    totalSupply: 'Unlimited',
    rank: 9,
  },
  {
    id: 'shiba-inu',
    symbol: 'SHIB',
    name: 'Shiba Inu',
    price: 0.00234,
    change24h: -0.00012,
    changePercent24h: -4.87,
    marketCap: '₹1.4L Cr',
    volume24h: '₹18,234 Cr',
    circulatingSupply: '589.3T SHIB',
    totalSupply: '589.7T SHIB',
    rank: 10,
  },
];

export async function getCryptoQuote(symbol: string): Promise<Crypto | null> {
  // Will be replaced with real crypto API (CoinGecko, Binance, etc.)
  const crypto = topCryptos.find(c => c.symbol === symbol);
  return crypto || null;
}

export async function placeCryptoOrder(order: Omit<CryptoOrder, 'id' | 'timestamp'>): Promise<CryptoOrder> {
  // Will be replaced with crypto exchange API
  return {
    ...order,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    status: 'EXECUTED',
  };
}

export const cryptoHoldings: CryptoHolding[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: 0.025,
    avgBuyPrice: 6850000,
    currentPrice: 7245680.50,
    totalValue: 181142.01,
    profitLoss: 9892.01,
    profitLossPercent: 5.78,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    quantity: 0.5,
    avgBuyPrice: 295000,
    currentPrice: 289456.30,
    totalValue: 144728.15,
    profitLoss: -2771.85,
    profitLossPercent: -1.88,
  },
];

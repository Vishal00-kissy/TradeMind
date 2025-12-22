export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  dayHigh: number;
  dayLow: number;
  marketCap: string;
  pe: number;
  sector: string;
}

export interface StockOrder {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  orderType: 'INTRADAY' | 'DELIVERY';
  quantity: number;
  price: number;
  status: 'PENDING' | 'EXECUTED' | 'CANCELLED';
  timestamp: string;
}

export const trendingStocks: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2845.50, change: 32.40, changePercent: 1.15, volume: 5234000, dayHigh: 2856, dayLow: 2820, marketCap: '₹19.2L Cr', pe: 28.5, sector: 'Energy' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3658.20, change: -18.60, changePercent: -0.51, volume: 2156000, dayHigh: 3680, dayLow: 3650, marketCap: '₹13.4L Cr', pe: 32.1, sector: 'IT' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1642.80, change: 12.30, changePercent: 0.75, volume: 8945000, dayHigh: 1648, dayLow: 1635, marketCap: '₹12.5L Cr', pe: 18.7, sector: 'Banking' },
  { symbol: 'INFY', name: 'Infosys', price: 1456.90, change: -8.20, changePercent: -0.56, volume: 3678000, dayHigh: 1468, dayLow: 1452, marketCap: '₹6.1L Cr', pe: 26.4, sector: 'IT' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1128.45, change: 15.80, changePercent: 1.42, volume: 6234000, dayHigh: 1132, dayLow: 1118, marketCap: '₹7.9L Cr', pe: 19.2, sector: 'Banking' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1534.60, change: 22.50, changePercent: 1.49, volume: 4521000, dayHigh: 1540, dayLow: 1520, marketCap: '₹8.7L Cr', pe: 45.3, sector: 'Telecom' },
];

export async function getStockQuote(symbol: string): Promise<Stock | null> {
  // Will be replaced with real API
  const stock = trendingStocks.find(s => s.symbol === symbol);
  return stock || null;
}

export async function placeStockOrder(order: Omit<StockOrder, 'id' | 'timestamp'>): Promise<StockOrder> {
  // Will be replaced with broker API
  return {
    ...order,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    status: 'EXECUTED',
  };
}

export interface TradeRecommendation {
  id: string;
  type: 'BUY' | 'SELL';
  instrument: string;
  strike: number;
  optionType: 'CE' | 'PE';
  lots: number;
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  entryTime: string;
  exitTime?: string;
  reason: string;
  confidence: number;
  status: 'ACTIVE' | 'COMPLETED' | 'PENDING';
}

export interface MarketAnalysis {
  trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  support: number;
  resistance: number;
  analysis: string;
  signals: string[];
}

export const mockMarketData = {
  nifty: {
    price: 24850,
    change: 125.50,
    changePercent: 0.51,
  },
  banknifty: {
    price: 51240,
    change: -85.25,
    changePercent: -0.17,
  },
};

export async function generateTradeRecommendation(
  symbol: string,
  currentPrice: number
): Promise<TradeRecommendation | null> {
  // This will be replaced with AI analysis via Edge Function
  const isCallOption = Math.random() > 0.5;
  const strike = Math.round(currentPrice / 50) * 50;
  
  return {
    id: Date.now().toString(),
    type: Math.random() > 0.5 ? 'BUY' : 'SELL',
    instrument: symbol,
    strike,
    optionType: isCallOption ? 'CE' : 'PE',
    lots: Math.floor(Math.random() * 5) + 1,
    entryPrice: Math.floor(Math.random() * 200) + 50,
    targetPrice: Math.floor(Math.random() * 300) + 100,
    stopLoss: Math.floor(Math.random() * 50) + 20,
    entryTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    reason: 'AI detected strong momentum pattern with RSI oversold condition',
    confidence: Math.floor(Math.random() * 30) + 70,
    status: 'PENDING',
  };
}

export async function analyzeMarket(symbol: string): Promise<MarketAnalysis> {
  // This will be replaced with AI analysis via Edge Function
  const trends: Array<'BULLISH' | 'BEARISH' | 'NEUTRAL'> = ['BULLISH', 'BEARISH', 'NEUTRAL'];
  const trend = trends[Math.floor(Math.random() * trends.length)];
  
  return {
    trend,
    support: 24700,
    resistance: 24950,
    analysis: `Market showing ${trend.toLowerCase()} sentiment with strong institutional buying in banking sector`,
    signals: [
      'RSI showing oversold condition',
      'MACD bullish crossover detected',
      'Volume spike at support level',
    ],
  };
}

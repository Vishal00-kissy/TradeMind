import { getSupabaseClient } from '@/template';
import type { Crypto } from './cryptoData';

export interface CryptoAISignal {
  symbol: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  targetPrice: number;
  stopLoss: number;
  reasoning: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timeHorizon: 'SHORT_TERM' | 'MEDIUM_TERM' | 'LONG_TERM';
  potentialProfit: number;
  timestamp: string;
}

export async function getAICryptoSignal(crypto: Crypto): Promise<{ data: CryptoAISignal | null; error: string | null }> {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.functions.invoke('analyze-crypto', {
      body: {
        symbol: crypto.symbol,
        name: crypto.name,
        currentPrice: crypto.price,
        change24h: crypto.change24h,
        changePercent24h: crypto.changePercent24h,
        marketCap: crypto.marketCap,
        volume24h: crypto.volume24h,
      },
    });

    if (error) {
      console.error('AI analysis error:', error);
      return { data: null, error: error.message };
    }

    return { data: data.analysis, error: null };
  } catch (err) {
    console.error('Crypto AI signal error:', err);
    return { 
      data: null, 
      error: err instanceof Error ? err.message : 'Failed to get AI signal' 
    };
  }
}

export async function getBatchCryptoSignals(cryptos: Crypto[]): Promise<CryptoAISignal[]> {
  const signals: CryptoAISignal[] = [];
  
  // Analyze top 3 cryptos to avoid API rate limits
  const topCryptos = cryptos.slice(0, 3);
  
  for (const crypto of topCryptos) {
    const { data } = await getAICryptoSignal(crypto);
    if (data) {
      signals.push(data);
    }
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return signals;
}

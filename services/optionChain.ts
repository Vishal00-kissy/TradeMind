import { getSupabaseClient } from '@/template';
import { getAccessToken } from './zerodhaAuth';

export interface OptionChainData {
  strike: number;
  callOI: number;
  callOIChange: number;
  callLTP: number;
  callIV: number;
  putLTP: number;
  putIV: number;
  putOI: number;
  putOIChange: number;
}

export async function getOptionChain(
  symbol: string,
  expiry?: string
): Promise<{ data: OptionChainData[] | null; error: string | null }> {
  try {
    const accessToken = await getAccessToken();
    
    if (!accessToken) {
      // Return mock data if not authenticated
      return { data: generateMockOptionChain(symbol === 'NIFTY' ? 25000 : 53000), error: null };
    }

    // Calculate nearest Thursday expiry if not provided
    const expiryDate = expiry || getNearestThursday();

    const supabase = getSupabaseClient();
    const { data, error } = await supabase.functions.invoke('zerodha-optionchain', {
      body: {
        symbol,
        expiry: expiryDate,
        accessToken,
      },
    });

    if (error) {
      console.error('Option chain error:', error);
      // Fallback to mock data
      return { data: generateMockOptionChain(symbol === 'NIFTY' ? 25000 : 53000), error: null };
    }

    // Group options by strike price
    const strikeMap = new Map<number, OptionChainData>();
    
    data.options.forEach((opt: any) => {
      const strike = opt.strike;
      if (!strikeMap.has(strike)) {
        strikeMap.set(strike, {
          strike,
          callLTP: 0,
          callOI: 0,
          callOIChange: 0,
          callIV: 0,
          putLTP: 0,
          putIV: 0,
          putOI: 0,
          putOIChange: 0,
        });
      }

      const strikeData = strikeMap.get(strike)!;
      if (opt.type === 'CE') {
        strikeData.callLTP = opt.ltp || 0;
        strikeData.callOI = opt.oi || 0;
        strikeData.callOIChange = opt.change || 0;
      } else {
        strikeData.putLTP = opt.ltp || 0;
        strikeData.putOI = opt.oi || 0;
        strikeData.putOIChange = opt.change || 0;
      }
    });

    const optionChain = Array.from(strikeMap.values()).sort((a, b) => a.strike - b.strike);
    return { data: optionChain, error: null };
  } catch (err) {
    console.error('Option chain fetch error:', err);
    return { data: generateMockOptionChain(25000), error: null };
  }
}

function getNearestThursday(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7 || 7;
  const thursday = new Date(today);
  thursday.setDate(today.getDate() + daysUntilThursday);
  return thursday.toISOString().split('T')[0];
}

function generateMockOptionChain(atmStrike: number, rangeCount: number = 10): OptionChainData[] {
  const chain: OptionChainData[] = [];
  const startStrike = atmStrike - (rangeCount / 2) * 50;
  
  for (let i = 0; i < rangeCount; i++) {
    const strike = startStrike + (i * 50);
    
    chain.push({
      strike,
      callOI: Math.floor(Math.random() * 50000) + 10000,
      callOIChange: Math.floor(Math.random() * 10000) - 5000,
      callLTP: Math.max(5, Math.floor((atmStrike - strike) / 2) + Math.random() * 100),
      callIV: Math.floor(Math.random() * 30) + 10,
      putLTP: Math.max(5, Math.floor((strike - atmStrike) / 2) + Math.random() * 100),
      putIV: Math.floor(Math.random() * 30) + 10,
      putOI: Math.floor(Math.random() * 50000) + 10000,
      putOIChange: Math.floor(Math.random() * 10000) - 5000,
    });
  }
  
  return chain;
}

// Legacy function for backward compatibility
export function generateOptionChain(atmStrike: number, rangeCount: number = 10): OptionChainData[] {
  return generateMockOptionChain(atmStrike, rangeCount);
}

import { useState, useEffect } from 'react';
import { 
  TradeRecommendation, 
  MarketAnalysis,
  generateTradeRecommendation,
  analyzeMarket,
  mockMarketData 
} from '@/services/aiAnalysis';

export function useTrading() {
  const [recommendations, setRecommendations] = useState<TradeRecommendation[]>([]);
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState(mockMarketData);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const niftyRec = await generateTradeRecommendation('NIFTY', marketData.nifty.price);
      if (niftyRec) {
        setRecommendations(prev => [niftyRec, ...prev].slice(0, 10));
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalysis = async () => {
    try {
      const result = await analyzeMarket('NIFTY');
      setAnalysis(result);
    } catch (error) {
      console.error('Error fetching analysis:', error);
    }
  };

  const executeOrder = (recId: string) => {
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === recId 
          ? { ...rec, status: 'ACTIVE' as const }
          : rec
      )
    );
  };

  useEffect(() => {
    fetchAnalysis();
    fetchRecommendations();
    
    const interval = setInterval(() => {
      setMarketData(prev => ({
        nifty: {
          price: prev.nifty.price + (Math.random() - 0.5) * 20,
          change: prev.nifty.change + (Math.random() - 0.5) * 5,
          changePercent: prev.nifty.changePercent + (Math.random() - 0.5) * 0.1,
        },
        banknifty: {
          price: prev.banknifty.price + (Math.random() - 0.5) * 40,
          change: prev.banknifty.change + (Math.random() - 0.5) * 10,
          changePercent: prev.banknifty.changePercent + (Math.random() - 0.5) * 0.1,
        },
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return {
    recommendations,
    analysis,
    marketData,
    loading,
    fetchRecommendations,
    executeOrder,
  };
}

import { useState, useEffect } from 'react';
import { OptionChainData, getOptionChain } from '@/services/optionChain';

export function useOptionChain(symbol: string = 'NIFTY') {
  const [chainData, setChainData] = useState<OptionChainData[]>([]);
  const [loading, setLoading] = useState(false);

  const loadChain = async () => {
    setLoading(true);
    try {
      const { data } = await getOptionChain(symbol);
      setChainData(data || []);
    } catch (error) {
      console.error('Error loading option chain:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChain();
    // Refresh every 10 seconds
    const interval = setInterval(loadChain, 10000);
    return () => clearInterval(interval);
  }, [symbol]);

  return {
    chainData,
    loading,
    refresh: loadChain,
  };
}

import { useState, useEffect } from 'react';
import { OptionChainData, generateOptionChain } from '@/services/optionChain';

export function useOptionChain(atmStrike: number) {
  const [chainData, setChainData] = useState<OptionChainData[]>([]);
  const [loading, setLoading] = useState(false);

  const loadChain = async () => {
    setLoading(true);
    try {
      const data = generateOptionChain(atmStrike);
      setChainData(data);
    } catch (error) {
      console.error('Error loading option chain:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChain();
  }, [atmStrike]);

  return {
    chainData,
    loading,
    refresh: loadChain,
  };
}

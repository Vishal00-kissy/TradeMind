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

export function generateOptionChain(
  atmStrike: number,
  rangeCount: number = 10
): OptionChainData[] {
  const chain: OptionChainData[] = [];
  const startStrike = atmStrike - (rangeCount / 2) * 50;
  
  for (let i = 0; i < rangeCount; i++) {
    const strike = startStrike + (i * 50);
    const distanceFromATM = Math.abs(strike - atmStrike);
    
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

export interface MutualFund {
  id: string;
  name: string;
  amc: string;
  category: string;
  nav: number;
  navChange: number;
  navChangePercent: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  minSIP: number;
  minLumpsum: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  rating: number;
}

export interface SIPInvestment {
  id: string;
  fundId: string;
  fundName: string;
  amount: number;
  frequency: 'MONTHLY' | 'QUARTERLY';
  startDate: string;
  nextDate: string;
  investedAmount: number;
  currentValue: number;
  returns: number;
}

export const topMutualFunds: MutualFund[] = [
  {
    id: 'MF001',
    name: 'SBI Bluechip Fund',
    amc: 'SBI Mutual Fund',
    category: 'Large Cap',
    nav: 68.45,
    navChange: 0.32,
    navChangePercent: 0.47,
    returns1Y: 18.5,
    returns3Y: 22.3,
    returns5Y: 16.8,
    minSIP: 500,
    minLumpsum: 5000,
    riskLevel: 'MODERATE',
    rating: 4.5,
  },
  {
    id: 'MF002',
    name: 'ICICI Prudential Technology Fund',
    amc: 'ICICI Prudential',
    category: 'Sectoral',
    nav: 142.30,
    navChange: 1.25,
    navChangePercent: 0.89,
    returns1Y: 32.4,
    returns3Y: 28.7,
    returns5Y: 25.2,
    minSIP: 1000,
    minLumpsum: 5000,
    riskLevel: 'HIGH',
    rating: 5,
  },
  {
    id: 'MF003',
    name: 'HDFC Balanced Advantage Fund',
    amc: 'HDFC Mutual Fund',
    category: 'Hybrid',
    nav: 385.60,
    navChange: 0.45,
    navChangePercent: 0.12,
    returns1Y: 14.2,
    returns3Y: 16.5,
    returns5Y: 14.8,
    minSIP: 500,
    minLumpsum: 5000,
    riskLevel: 'MODERATE',
    rating: 4,
  },
];

export async function startSIP(fundId: string, amount: number): Promise<SIPInvestment> {
  const fund = topMutualFunds.find(f => f.id === fundId);
  return {
    id: Date.now().toString(),
    fundId,
    fundName: fund?.name || '',
    amount,
    frequency: 'MONTHLY',
    startDate: new Date().toISOString(),
    nextDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    investedAmount: 0,
    currentValue: 0,
    returns: 0,
  };
}

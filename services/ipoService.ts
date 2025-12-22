export interface IPO {
  id: string;
  companyName: string;
  logo?: string;
  priceRange: { min: number; max: number };
  lotSize: number;
  openDate: string;
  closeDate: string;
  listingDate: string;
  status: 'UPCOMING' | 'OPEN' | 'CLOSED';
  type: 'MAINBOARD' | 'SME';
  gmpPrice?: number;
  gmpPercent?: number;
  subscription: {
    retail: number;
    qib: number;
    nii: number;
    total: number;
  };
}

export interface IPOApplication {
  id: string;
  ipoId: string;
  companyName: string;
  lots: number;
  amount: number;
  bidPrice: number;
  status: 'APPLIED' | 'ALLOTTED' | 'NOT_ALLOTTED';
  applicationDate: string;
}

export const activeIPOs: IPO[] = [
  {
    id: 'IPO001',
    companyName: 'Tech Innovations Ltd',
    priceRange: { min: 250, max: 280 },
    lotSize: 50,
    openDate: '2025-12-20',
    closeDate: '2025-12-24',
    listingDate: '2026-01-02',
    status: 'OPEN',
    type: 'MAINBOARD',
    gmpPrice: 95,
    gmpPercent: 33.9,
    subscription: {
      retail: 2.5,
      qib: 4.2,
      nii: 3.1,
      total: 3.2,
    },
  },
  {
    id: 'IPO002',
    companyName: 'Green Energy Solutions',
    priceRange: { min: 180, max: 200 },
    lotSize: 75,
    openDate: '2025-12-23',
    closeDate: '2025-12-27',
    listingDate: '2026-01-05',
    status: 'UPCOMING',
    type: 'MAINBOARD',
    subscription: {
      retail: 0,
      qib: 0,
      nii: 0,
      total: 0,
    },
  },
  {
    id: 'IPO003',
    companyName: 'Smart Manufacturing Co',
    priceRange: { min: 85, max: 95 },
    lotSize: 150,
    openDate: '2025-12-15',
    closeDate: '2025-12-19',
    listingDate: '2025-12-28',
    status: 'CLOSED',
    type: 'SME',
    gmpPrice: 25,
    gmpPercent: 26.3,
    subscription: {
      retail: 12.5,
      qib: 8.3,
      nii: 10.2,
      total: 10.1,
    },
  },
];

export async function applyIPO(
  ipoId: string,
  lots: number,
  bidPrice: number
): Promise<IPOApplication> {
  const ipo = activeIPOs.find(i => i.id === ipoId);
  return {
    id: Date.now().toString(),
    ipoId,
    companyName: ipo?.companyName || '',
    lots,
    amount: lots * (ipo?.lotSize || 0) * bidPrice,
    bidPrice,
    status: 'APPLIED',
    applicationDate: new Date().toISOString(),
  };
}

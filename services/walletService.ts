export interface WalletTransaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  category: 'DEPOSIT' | 'WITHDRAWAL' | 'TRADE' | 'DIVIDEND' | 'SIP' | 'IPO';
  description: string;
  timestamp: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  accountHolder: string;
  isPrimary: boolean;
}

export const walletBalance = {
  available: 45230.50,
  onHold: 12500.00,
  totalInvested: 125000.00,
  currentValue: 132450.00,
};

export const recentTransactions: WalletTransaction[] = [
  {
    id: 'TXN001',
    type: 'DEBIT',
    amount: 15000,
    category: 'TRADE',
    description: 'Bought NIFTY 25000CE - 3 Lots',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'SUCCESS',
  },
  {
    id: 'TXN002',
    type: 'CREDIT',
    amount: 2500,
    category: 'DIVIDEND',
    description: 'Dividend from RELIANCE',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'SUCCESS',
  },
  {
    id: 'TXN003',
    type: 'DEBIT',
    amount: 5000,
    category: 'SIP',
    description: 'SBI Bluechip Fund - Monthly SIP',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'SUCCESS',
  },
];

export async function addFunds(amount: number, bankAccountId: string): Promise<WalletTransaction> {
  return {
    id: Date.now().toString(),
    type: 'CREDIT',
    amount,
    category: 'DEPOSIT',
    description: `Added from bank account ${bankAccountId}`,
    timestamp: new Date().toISOString(),
    status: 'PENDING',
  };
}

export async function withdrawFunds(amount: number, bankAccountId: string): Promise<WalletTransaction> {
  return {
    id: Date.now().toString(),
    type: 'DEBIT',
    amount,
    category: 'WITHDRAWAL',
    description: `Withdrawn to bank account ${bankAccountId}`,
    timestamp: new Date().toISOString(),
    status: 'PENDING',
  };
}

export interface ProfitHistoryEntry {
  date: string;
  value: number;
}

export interface WithdrawalEntry {
  date: string;
  amount: number;
}

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  color: string;
  initialInvestment: number;
  currentValue: number;
  priceChange24h: number;
  profitHistory: ProfitHistoryEntry[];
  withdrawalHistory: WithdrawalEntry[];
}

export interface CryptoPortfolioState {
  cryptos: CryptoData[];
  totalPortfolio: number;
  totalProfit: number;
  totalInvestment: number;
  portfolioHistory: ProfitHistoryEntry[];
}

interface CryptoPortfolioActions {
  updateCrypto: (cryptoId: string, updates: Partial<CryptoData>) => void;
  addCrypto: (crypto: CryptoData) => void;
  removeCrypto: (cryptoId: string) => void;
  handleWithdraw: (cryptoId: string) => void;
  calculatePortfolioMetrics: () => void;
}

export interface CryptoPortfolioStore {
  state: CryptoPortfolioState;
  actions: CryptoPortfolioActions;
}

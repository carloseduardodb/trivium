export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  priceChange24h: number;
  color: string;
  profitHistory: Array<{ value: number }>;
  currentValue: number;
  initialInvestment: number;
  withdrawalHistory: Array<{ date: string; amount: number }>;
}

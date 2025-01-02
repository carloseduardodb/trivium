import { create } from "zustand";
import { produce } from "immer";
import { CryptoData, CryptoPortfolioStore } from "./interface";

const initialCryptos: CryptoData[] = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    color: "#F7931A",
    initialInvestment: 50000,
    currentValue: 65000,
    priceChange24h: 2.5,
    profitHistory: Array.from({ length: 30 }, (_, i) => ({
      date: `2024-${String(i + 1).padStart(2, "0")}`,
      value: 50000 + Math.random() * 20000,
    })),
    withdrawalHistory: [],
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    color: "#627EEA",
    initialInvestment: 30000,
    currentValue: 28000,
    priceChange24h: -1.8,
    profitHistory: Array.from({ length: 30 }, (_, i) => ({
      date: `2024-${String(i + 1).padStart(2, "0")}`,
      value: 30000 + Math.random() * 10000,
    })),
    withdrawalHistory: [],
  },
];

export const useCryptoPortfolioStore = create<CryptoPortfolioStore>((set) => ({
  state: {
    cryptos: initialCryptos,
    totalPortfolio: 0,
    totalProfit: 0,
    totalInvestment: 0,
    portfolioHistory: [],
  },

  actions: {
    updateCrypto: (cryptoId: string, updates: Partial<CryptoData>) =>
      set(
        produce((state) => {
          const cryptoIndex = state.state.cryptos.findIndex(
            (c: CryptoData) => c.id === cryptoId
          );
          if (cryptoIndex !== -1) {
            state.state.cryptos[cryptoIndex] = {
              ...state.state.cryptos[cryptoIndex],
              ...updates,
            };
          }
        })
      ),

    addCrypto: (crypto: CryptoData) =>
      set(
        produce((state) => {
          state.state.cryptos.push(crypto);
        })
      ),

    removeCrypto: (cryptoId: string) =>
      set(
        produce((state) => {
          state.state.cryptos = state.state.cryptos.filter(
            (c: CryptoData) => c.id !== cryptoId
          );
        })
      ),

    handleWithdraw: (cryptoId: string) =>
      set(
        produce((state) => {
          const cryptoIndex = state.state.cryptos.findIndex(
            (c: CryptoData) => c.id === cryptoId
          );
          if (cryptoIndex !== -1) {
            const crypto = state.state.cryptos[cryptoIndex];
            const profit = crypto.currentValue - crypto.initialInvestment;

            if (profit > 0) {
              state.state.cryptos[cryptoIndex] = {
                ...crypto,
                currentValue: crypto.initialInvestment,
                withdrawalHistory: [
                  ...crypto.withdrawalHistory,
                  {
                    date: new Date().toISOString().split("T")[0],
                    amount: profit,
                  },
                ],
              };
            }
          }
        })
      ),

    calculatePortfolioMetrics: () =>
      set(
        produce((state) => {
          state.state.totalPortfolio = state.state.cryptos.reduce(
            (acc: number, curr: CryptoData) => acc + curr.currentValue,
            0
          );

          state.state.totalProfit = state.state.cryptos.reduce(
            (acc: number, curr: CryptoData) =>
              acc + (curr.currentValue - curr.initialInvestment),
            0
          );

          state.state.totalInvestment = state.state.cryptos.reduce(
            (acc: number, curr: CryptoData) => acc + curr.initialInvestment,
            0
          );

          state.state.portfolioHistory = Array.from({ length: 30 }, (_, i) => ({
            date: `2024-${String(i + 1).padStart(2, "0")}`,
            value: state.state.cryptos.reduce(
              (acc: number, crypto: CryptoData) =>
                acc + crypto.profitHistory[i].value,
              0
            ),
          }));
        })
      ),
  },
}));

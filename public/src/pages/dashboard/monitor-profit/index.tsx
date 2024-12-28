import { useEffect } from "react";
import { Portfolio } from "./components/portfolio";
import { Performance } from "./components/performance";
import { CryptoStatus } from "./components/crypto-status";
import { useCryptoPortfolioStore } from "./store";

export const ProfitMonitor = () => {
  const {
    cryptos,
    totalPortfolio,
    totalInvestment,
    totalProfit,
    portfolioHistory,
  } = useCryptoPortfolioStore((state) => state.state);

  const { handleWithdraw, calculatePortfolioMetrics } = useCryptoPortfolioStore(
    (state) => state.actions
  );

  useEffect(() => {
    calculatePortfolioMetrics();
  }, [cryptos, calculatePortfolioMetrics]);

  return (
    <div className="p-8 min-h-screen w-full">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Monitorar Lucro</h1>
          <p className="text-gray-500">
            Monitore seus investimentos em tempo real
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Portfolio
          totalPortfolio={totalPortfolio}
          totalInvestment={totalInvestment}
          totalProfit={totalProfit}
        />
        <Performance portfolioHistory={portfolioHistory} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cryptos.map((crypto) => (
          <CryptoStatus
            key={crypto.id}
            crypto={crypto}
            handleWithdraw={handleWithdraw}
          />
        ))}
      </div>
    </div>
  );
};

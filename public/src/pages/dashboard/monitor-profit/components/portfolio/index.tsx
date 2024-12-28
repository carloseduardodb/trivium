import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { PortfolioProps } from "./interfaces";

export const Portfolio: React.FC<PortfolioProps> = ({
  totalPortfolio,
  totalInvestment,
  totalProfit,
}) => {
  return (
    <Card className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white shadow-lg rounded-lg">
      <CardContent className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-base opacity-90">Portfolio Total</p>
            <h2 className="text-4xl font-extrabold mt-1">
              R$ {totalPortfolio.toLocaleString()}
            </h2>
          </div>
          <Wallet className="w-8 h-8 opacity-90" />
        </div>

        <div className="flex justify-between gap-6 text-lg">
          <div className="flex-1">
            <p className="opacity-80 mb-1">Investimento</p>
            <p className="font-semibold text-xl">
              R$ {totalInvestment.toLocaleString()}
            </p>
          </div>
          <div className="flex-1">
            <p className="opacity-80 mb-1">Lucro Total</p>
            <p className="font-semibold text-xl">
              R$ {totalProfit.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

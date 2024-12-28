import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, DollarSign, Target } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Crypto } from "./interfaces";

interface CryptoStatusProps {
  crypto: Crypto;
  handleWithdraw: (id: string) => void;
}

export const CryptoStatus = ({ crypto, handleWithdraw }: CryptoStatusProps) => {
  const isPriceUp = crypto.priceChange24h > 0;
  const isProfit = crypto.currentValue > crypto.initialInvestment;
  const isOpportunity = crypto.currentValue <= crypto.initialInvestment * 1.05;

  return (
    <Card
      key={crypto.id}
      className="hover:shadow-lg transition-shadow bg-[#1E1E1E] text-white max-h-fit"
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{crypto.name}</h3>
            <p className="text-sm text-gray-500">{crypto.symbol}</p>
          </div>
          <div
            className={`flex items-center ${
              isPriceUp ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPriceUp ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            <span className="font-medium">
              {Math.abs(crypto.priceChange24h)}%
            </span>
          </div>
        </div>

        <div className="h-32 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={crypto.profitHistory}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={crypto.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Valor Atual</p>
            <p className="font-medium">
              R$ {crypto.currentValue.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Lucro/Prejuízo</p>
            <p
              className={`font-medium ${
                isProfit ? "text-green-500" : "text-red-500"
              }`}
            >
              R${" "}
              {(
                crypto.currentValue - crypto.initialInvestment
              ).toLocaleString()}
            </p>
          </div>
        </div>

        {isOpportunity && (
          <Alert className="mb-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 rounded-lg shadow-sm p-4 flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full mr-4">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <AlertDescription className="text-sm font-medium text-blue-700">
                <span className="block">Oportunidade de compra detectada!</span>
                <span className="text-xs text-blue-600">
                  Aproveite para adquirir mais com base no seu perfil de
                  investimento.
                </span>
              </AlertDescription>
            </div>
          </Alert>
        )}

        <div className="w-full text-end">
          {isProfit && (
            <Button
              className="max-w-fit my-3 bg-purple-900 hover:bg-purple-800 text-white"
              onClick={() => handleWithdraw(crypto.id)}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Realizar Saque
            </Button>
          )}
        </div>

        {crypto.withdrawalHistory.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Últimos Saques</p>
            <div className="max-h-24 overflow-y-auto">
              {crypto.withdrawalHistory.map((withdrawal, index) => (
                <div key={index} className="text-sm flex justify-between py-1">
                  <span className="text-gray-500">{withdrawal.date}</span>
                  <span className="text-green-500">
                    +R$ {withdrawal.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface CryptoData {
  symbol: string;
  name: string;
  currentPrice: number;
  marketCap: number;
  volume24h: number;
  priceHistory: { date: string; price: number }[];
}

export const Dashboard: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    {
      symbol: "BTC",
      name: "Bitcoin",
      currentPrice: 45678.9,
      marketCap: 890000000000,
      volume24h: 25000000000,
      priceHistory: [
        { date: "2024-01-01", price: 40000 },
        { date: "2024-02-01", price: 42000 },
        { date: "2024-03-01", price: 44000 },
        { date: "2024-04-01", price: 45000 },
        { date: "2024-05-01", price: 45500 },
        { date: "2024-06-01", price: 45678.9 },
      ],
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      currentPrice: 3245.67,
      marketCap: 390000000000,
      volume24h: 15000000000,
      priceHistory: [
        { date: "2024-01-01", price: 3000 },
        { date: "2024-02-01", price: 3100 },
        { date: "2024-03-01", price: 3200 },
        { date: "2024-04-01", price: 3220 },
        { date: "2024-05-01", price: 3230 },
        { date: "2024-06-01", price: 3245.67 },
      ],
    },
  ]);

  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData>(
    cryptoData[0]
  );

  const marketCapData = cryptoData.map((crypto) => ({
    name: crypto.symbol,
    value: crypto.marketCap,
  }));

  const volumeData = cryptoData.map((crypto) => ({
    name: crypto.symbol,
    volume: crypto.volume24h,
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className="bg-[#0a0a0a] min-h-screen p-4 md:p-8 text-white w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Crypto Selector */}
        <div className="bg-[#1e1e1e] rounded-2xl p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Minhas Moedas
          </h2>
          {cryptoData.map((crypto) => (
            <div
              key={crypto.symbol}
              className={`p-4 rounded-lg mb-4 cursor-pointer transition-all ${
                selectedCrypto.symbol === crypto.symbol
                  ? "bg-purple-900/30"
                  : "hover:bg-[#2a2a2a]"
              }`}
              onClick={() => setSelectedCrypto(crypto)}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-base md:text-lg">
                    {crypto.symbol}
                  </p>
                  <p className="text-gray-400 text-sm">{crypto.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm md:text-base">
                    ${crypto.currentPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price History Chart */}
        <div className="bg-[#1e1e1e] rounded-2xl p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            {selectedCrypto.symbol} Histórico de Preços
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={selectedCrypto.priceHistory}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Market Cap Pie Chart */}
        <div className="bg-[#1e1e1e] rounded-2xl p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Capitalização de Mercado
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={marketCapData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {marketCapData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 24h Volume Bar Chart */}
        <div className="col-span-1 md:col-span-2 bg-[#1e1e1e] rounded-2xl p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Volume de Negociação 24h
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#8884d8">
                {volumeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

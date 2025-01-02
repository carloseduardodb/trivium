import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

interface CryptoData {
  timestamp: string;
  value: number;
  symbol: string;
  percentageChange?: number;
  volume?: number;
  marketCap?: number;
}

interface CryptoPerformanceChartProps {
  data?: CryptoData[];
  selectedCrypto: string;
}

// Dados de exemplo mais variados
const sampleData: CryptoData[] = [
  {
    timestamp: "2024-01-01",
    symbol: "BTC",
    value: 42000,
    percentageChange: 2.5,
    volume: 28000000000,
    marketCap: 820000000000,
  },
  {
    timestamp: "2024-01-01",
    symbol: "ETH",
    value: 2200,
    percentageChange: 1.8,
    volume: 15000000000,
    marketCap: 260000000000,
  },
  {
    timestamp: "2024-01-01",
    symbol: "SOL",
    value: 98,
    percentageChange: 5.2,
    volume: 2800000000,
    marketCap: 42000000000,
  },
  {
    timestamp: "2024-01-02",
    symbol: "BTC",
    value: 43500,
    percentageChange: 3.57,
    volume: 30000000000,
    marketCap: 848000000000,
  },
  {
    timestamp: "2024-01-02",
    symbol: "ETH",
    value: 2350,
    percentageChange: 6.82,
    volume: 18000000000,
    marketCap: 278000000000,
  },
  {
    timestamp: "2024-01-02",
    symbol: "SOL",
    value: 102,
    percentageChange: 4.08,
    volume: 3200000000,
    marketCap: 44000000000,
  },
  {
    timestamp: "2024-01-03",
    symbol: "BTC",
    value: 44200,
    percentageChange: 1.61,
    volume: 32000000000,
    marketCap: 862000000000,
  },
  {
    timestamp: "2024-01-03",
    symbol: "ETH",
    value: 2420,
    percentageChange: 2.98,
    volume: 19000000000,
    marketCap: 286000000000,
  },
  {
    timestamp: "2024-01-03",
    symbol: "SOL",
    value: 108,
    percentageChange: 5.88,
    volume: 3500000000,
    marketCap: 46000000000,
  },
];

export const PerformGraph: React.FC<CryptoPerformanceChartProps> = ({
  data = sampleData,
  selectedCrypto,
}) => {
  const [metricType, setMetricType] = useState<
    "value" | "percentageChange" | "volume" | "marketCap"
  >("value");

  const formatValue = (value: number, type: string) => {
    switch (type) {
      case "value":
        return `$${value.toLocaleString()}`;
      case "percentageChange":
        return `${value.toFixed(2)}%`;
      case "volume":
        return `$${(value / 1000000000).toFixed(2)}B`;
      case "marketCap":
        return `$${(value / 1000000000).toFixed(2)}B`;
      default:
        return value;
    }
  };

  // Agrupar dados por símbolo da criptomoeda
  const groupedData = data.reduce((acc: { [key: string]: any[] }, curr) => {
    if (!acc[curr.symbol]) {
      acc[curr.symbol] = [];
    }
    acc[curr.symbol].push(curr);
    return acc;
  }, {});

  // Preparar dados para o Recharts
  const chartData = Object.keys(groupedData)[0]?.length
    ? groupedData[Object.keys(groupedData)[0]].map((item, index) => {
        const dataPoint: { [key: string]: any } = {
          timestamp: item.timestamp,
        };
        Object.keys(groupedData).forEach((symbol) => {
          dataPoint[symbol] = groupedData[symbol][index]?.[metricType] || null;
        });
        return dataPoint;
      })
    : [];

  const cryptoSymbols = Object.keys(groupedData);
  const colors = {
    BTC: "#f7931a",
    ETH: "#627eea",
    SOL: "#00FFA3",
    default: "#94a3b8",
  };

  return (
    <div className="w-full h-[600px] p-6 bg-[#1e1e1e] rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Performance de Criptomoedas
        </h2>
        <div className="flex gap-4">
          <select
            className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={metricType}
            onChange={(e) => setMetricType(e.target.value as any)}
          >
            <option value="value">Preço</option>
            <option value="percentageChange">Variação %</option>
            <option value="volume">Volume</option>
            <option value="marketCap">Cap. de Mercado</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="timestamp"
            tick={{ fill: "#666" }}
            tickLine={{ stroke: "#666" }}
          >
            <Label value="Data" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            tick={{ fill: "#666" }}
            tickLine={{ stroke: "#666" }}
            // tickFormatter={(value) => formatValue(value, metricType)}
          >
            <Label
              value={
                metricType === "value"
                  ? "Preço (USD)"
                  : metricType === "percentageChange"
                  ? "Variação (%)"
                  : metricType === "volume"
                  ? "Volume (Bilhões)"
                  : "Cap. de Mercado (Bilhões)"
              }
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [formatValue(value, metricType), ""]}
            labelStyle={{ color: "#666" }}
          />
          <Legend />
          {cryptoSymbols.map((symbol) => (
            <Line
              key={symbol}
              type="monotone"
              dataKey={symbol}
              name={symbol}
              stroke={colors[symbol as keyof typeof colors] || colors.default}
              strokeWidth={symbol === selectedCrypto ? 3 : 1.5}
              dot={symbol === selectedCrypto}
              opacity={symbol === selectedCrypto ? 1 : 0.6}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

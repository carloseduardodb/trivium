import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";
import { PerformanceProps } from "./interfaces";

export const Performance: React.FC<PerformanceProps> = ({
  portfolioHistory,
}) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("24h");

  const renderTimeFrameButtons = () => {
    const timeFrames = ["24h", "7d", "30d", "all"];
    return timeFrames.map((timeFrame) => (
      <Button
        key={timeFrame}
        variant={selectedTimeFrame === timeFrame ? "default" : "ghost"}
        size="sm"
        onClick={() => setSelectedTimeFrame(timeFrame)}
      >
        {timeFrame}
      </Button>
    ));
  };

  return (
    <Card className="col-span-2 bg-[#1E1E1E] text-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Portfolio Performance</h3>
          <div className="flex gap-2">{renderTimeFrameButtons()}</div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioHistory}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SpendingReport = () => {
  const [timeRange, setTimeRange] = useState("12 Months");

  const data = [
    { month: "Jan", income: 25, spending: 20 },
    { month: "Feb", income: 28, spending: 24 },
    { month: "Mar", income: 32, spending: 30 },
    { month: "Apr", income: 40, spending: 35 },
    { month: "May", income: 45, spending: 42 },
    { month: "Jun", income: 60, spending: 40 },
    { month: "Jul", income: 55, spending: 38 },
    { month: "Aug", income: 53, spending: 36 },
    { month: "Sep", income: 58, spending: 40 },
    { month: "Oct", income: 45, spending: 38 },
    { month: "Nov", income: 48, spending: 58 },
    { month: "Dec", income: 42, spending: 45 },
  ];

  const timeRanges = ["12 Months", "3 months", "30 days", "7 days", "24 Hours"];


  return (
    <div className="bg-zinc-900 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-zinc-100">
          Spending Report
        </h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
          View Report
        </button>
      </div>

      <div className="flex gap-4 mb-8 text-sm">
        {timeRanges.map((range) => (
          <button
            key={range}
            className={`px-2 py-1 cursor-pointer ${
              timeRange === range
                ? "text-zinc-100 font-medium border-b-2 border-blue-500"
                : "text-zinc-400 hover:text-zinc-300"
            }`}
            onClick={() => setTimeRange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#27272a"
              opacity={0.5}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a1a1aa" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a1a1aa" }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "0.5rem",
                color: "#f4f4f5"
              }}
              labelStyle={{ color: "#a1a1aa" }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#3b82f6", stroke: "#18181b" }}
            />
            <Line
              type="monotone"
              dataKey="spending"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#f59e0b", stroke: "#18181b" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingReport;

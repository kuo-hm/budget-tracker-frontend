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

  // Sample data that mimics the chart in the design
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

  //   const CustomTooltip = ({ active, payload }) => {
  //     if (active && payload && payload.length) {
  //       return (
  //         <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
  //           <p className="text-gray-400 text-sm">Income</p>
  //           <p className="font-medium">Rp 25.000</p>
  //         </div>
  //       );
  //     }
  //     return null;
  //   };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Spending Report
        </h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">
          View Report
        </button>
      </div>

      <div className="flex gap-4 mb-8 text-sm">
        {timeRanges.map((range) => (
          <button
            key={range}
            className={`px-2 py-1 cursor-pointer ${
              timeRange === range
                ? "text-gray-900 font-medium border-b-2 border-blue-500"
                : "text-gray-400"
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
              opacity={0.2}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888" }}
              domain={[0, 100]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="spending"
              stroke="#fbbf24"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingReport;

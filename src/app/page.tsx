"use client";
import { useState } from "react";
import KPICard from "../components/ui/card/kpi-card";
import SpendingReport from "../components/ui/chart/line-chart";
import Table from "../components/ui/table/table";

const allTransactions = [
  {
    id: "#7890328",
    name: "Spotify",
    logo: "spotify",
    amount: "-Rp 13.000",
    isNegative: true,
    date: "16 Jan 2:30pm",
  },
  {
    id: "#3948509",
    name: "Starbucks",
    logo: "starbucks",
    amount: "-Rp 24.000",
    isNegative: true,
    date: "15 Jan 3:30pm",
  },
  {
    id: "#2980298",
    name: "Upwork",
    logo: "upwork",
    amount: "+Rp 50.000",
    isNegative: false,
    date: "14 Jan 2:30pm",
  },
  {
    id: "#4562137",
    name: "Netflix",
    logo: "spotify",
    amount: "-Rp 45.000",
    isNegative: true,
    date: "13 Jan 1:45pm",
  },
  {
    id: "#7812309",
    name: "Freelance",
    logo: "upwork",
    amount: "+Rp 120.000",
    isNegative: false,
    date: "12 Jan 5:30pm",
  },
  {
    id: "#2346721",
    name: "Amazon",
    logo: "starbucks",
    amount: "-Rp 67.000",
    isNegative: true,
    date: "11 Jan 10:15am",
  },
];
export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="bg-[#F7FAFF] p-6 min-h-screen">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
        <KPICard title="Total Money" value="100.000 MAD" />
        <KPICard
          title="Money Spent this month"
          value="50.000 MAD"
          percentage={-15}
        />
        <KPICard
          title="Money Saved this month"
          value="25.000 MAD"
          percentage={15}
        />
        <KPICard title="Goal" value="100.000 MAD" />
      </div>
      <div className="mb-5">
        <SpendingReport />
      </div>
      <div className="mb-5">
        <Table
          data={allTransactions}
          totalPages={4}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
}

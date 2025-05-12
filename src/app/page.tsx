"use client";
import { useState } from "react";
import KPICard from "../components/ui/card/kpi-card";
import SpendingReport from "../components/ui/chart/line-chart";
import Table from "../components/ui/table/table";
import { motion } from "framer-motion";
import { FaSpotify, FaBriefcase, FaAmazon, FaCoffee, FaLaptop, FaFilm } from "react-icons/fa";

const allTransactions = [
  {
    id: "#7890328",
    name: "Spotify",
    logo: <FaSpotify />,
    amount: "13.000 Dh",
    isNegative: true,
    date: "16 Jan 2:30pm",
  },
  {
    id: "#3948509", 
    name: "Starbucks",
    logo: <FaCoffee />,
    amount: "24.000 Dh",
    isNegative: true,
    date: "15 Jan 3:30pm",
  },
  {
    id: "#2980298",
    name: "Upwork",
    logo: <FaLaptop />,
    amount: " 50.000 Dh",
    isNegative: false,
    date: "14 Jan 2:30pm",
  },
  {
    id: "#4562137",
    name: "Netflix",
    logo: <FaFilm />,
    amount: "45.000 Dh",
    isNegative: true,
    date: "13 Jan 1:45pm",
  },
  {
    id: "#7812309",
    name: "Freelance",
    logo: <FaBriefcase />,
    amount: "120.000 Dh",
    isNegative: false,
    date: "12 Jan 5:30pm",
  },
  {
    id: "#2346721",
    name: "Amazon",
    logo: <FaAmazon />,
    amount: "67.000 Dh",
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
    <div className="bg-zinc-950 p-6 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-5"
      >
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
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-5 bg-zinc-900 rounded-2xl shadow-xl p-6 border border-zinc-800"
      >
        <SpendingReport />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-5 bg-zinc-900 rounded-2xl shadow-xl p-6 border border-zinc-800"
      >
        <Table
          data={allTransactions}
          totalPages={4}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
        />
      </motion.div>
    </div>
  );
}

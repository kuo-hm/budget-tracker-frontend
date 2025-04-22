import KPICard from "../components/ui/card/kpi-card";
import SpendingReport from "../components/ui/chart/line-chart";

export default function Home() {
  return (
    <div className="bg-[#F7FAFF] p-6 min-h-screen">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
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
      <SpendingReport />
    </div>
  );
}

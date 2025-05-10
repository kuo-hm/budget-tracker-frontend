import { motion } from "framer-motion";

interface Props {
  title: string;
  value: string;
  percentage?: number;
}

export default function KPICard({ title, value, percentage }: Props) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-800 w-full"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-zinc-400 text-sm font-medium">{title}</h3>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-zinc-100">{value}</h2>
          {percentage !== undefined && (
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                percentage >= 0
                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                  : "bg-red-500/10 text-red-500 border border-red-500/20"
              }`}
            >
              {percentage >= 0 ? `+${percentage}%` : `${percentage}%`}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

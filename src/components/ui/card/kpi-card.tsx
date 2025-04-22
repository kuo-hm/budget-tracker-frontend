interface Props {
  title: string;
  value: string;
  percentage?: number;
}

export default function KPICard({ title, value, percentage }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <div className="flex flex-col gap-1">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
          {percentage !== undefined && (
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                percentage >= 0
                  ? "bg-green-100 text-green-500"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {percentage >= 0 ? `+${percentage}%` : `${percentage}%`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

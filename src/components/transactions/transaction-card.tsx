"use client";

import { Edit2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { Transaction } from "@/lib/types/transaction";

interface TransactionCardProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

export function TransactionCard({
  transaction,
  onEdit,
  onDelete,
}: TransactionCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow flex flex-col gap-3 relative">
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            transaction.type === "INCOME"
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {transaction.type}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(transaction)}
            className="p-1 text-zinc-400 hover:text-blue-400 transition-colors"
            aria-label="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="p-1 text-zinc-400 hover:text-red-400 transition-colors"
            aria-label="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="text-lg font-semibold text-zinc-100">
        {transaction.description}
      </div>
      <div className="flex items-center gap-2 text-zinc-400 text-sm">
        <span>{transaction.transactionCategory.name}</span>
        <span>•</span>
        <span>
          {format(new Date(transaction.transactionDate), "MMM dd, yyyy")}
        </span>
      </div>
      <div
        className={`text-2xl font-bold mt-2 ${
          transaction.type === "INCOME" ? "text-green-400" : "text-red-400"
        }`}
      >
        {transaction.amount.toFixed(2)}
      </div>
    </div>
  );
}

"use client";

import { Suspense } from "react";
import TransactionsContent from "../../components/transactions/transactions-content";

export default function TransactionsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-cent er justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <TransactionsContent />
    </Suspense>
  );
}

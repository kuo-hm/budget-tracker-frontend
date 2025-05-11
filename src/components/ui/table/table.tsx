"use client";

interface Data {
  id: string;
  name: string;
  logo: string;
  amount: string;
  isNegative: boolean;
  date: string;
}

interface Props {
  data: Data[];
  totalPages: number;
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (pageNumber: number) => void;
}
const Table = ({
  currentPage,
  data,
  goToPage,
  nextPage,
  prevPage,
  totalPages,
}: Props) => {
  const Pagination = () => {
    const pageNumbers = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 rounded mx-1 cursor-pointer transition-colors ${
            currentPage === i
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded mx-1 transition-colors ${
            currentPage === 1
              ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* First page button with ellipsis if needed */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className="px-3 py-1 mx-1 rounded bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300 transition-colors"
            >
              1
            </button>
            {startPage > 2 && <span className="mx-1 text-zinc-400">...</span>}
          </>
        )}

        {/* Page numbers */}
        {pageNumbers}

        {/* Last page button with ellipsis if needed */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="mx-1 text-zinc-400">...</span>}
            <button
              onClick={() => goToPage(totalPages)}
              className="px-3 py-1 mx-1 rounded bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded mx-1 transition-colors ${
            currentPage === totalPages
              ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-zinc-100">
          Transaction History
        </h2>
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            View Report
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
            View Report
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-5 text-sm text-zinc-400 border-b border-zinc-800 pb-2 mb-2">
          <div className="col-span-1">Transaction</div>
          <div className="col-span-1">ID</div>
          <div className="col-span-1">Amount</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Date</div>
        </div>

        {data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-5 py-3 text-sm border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
          >
            <div className="col-span-1 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                {item.logo}
              </div>
              <span className="text-zinc-100">{item.name}</span>
            </div>
            <div className="col-span-1 flex items-center text-zinc-400">
              {item.id}
            </div>
            <div className="col-span-1 flex items-center">
              <span
                className={`${
                  item.isNegative ? "text-red-400" : "text-green-400"
                }`}
              >
                {item.amount}
              </span>
            </div>
            <div className="col-span-1 flex items-center text-zinc-400">
              {item.date}
            </div>
            <div className="col-span-1 flex items-center text-zinc-400">
              {item.date}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default Table;

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
  // Pagination component
  const Pagination = () => {
    // Create page number buttons
    const pageNumbers = [];
    const maxVisibleButtons = 5;

    // Calculate visible page range
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Generate page buttons
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 p-1 rounded mr-1  cursor-pointer ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
          className={`px-3 py-1 rounded mx-1 ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
              className="px-3 py-1 mx-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              1
            </button>
            {startPage > 2 && <span className="mx-1">...</span>}
          </>
        )}

        {/* Page numbers */}
        {pageNumbers}

        {/* Last page button with ellipsis if needed */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="mx-1">...</span>}
            <button
              onClick={() => goToPage(totalPages)}
              className="px-3 py-1 mx-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded mx-1 ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-800">
          Transaction History
        </h2>
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2  cursor-pointer">
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2  cursor-pointer">
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
        <div className="grid grid-cols-5 text-sm text-gray-500 border-b pb-2 mb-2">
          <div className="col-span-1">Transaction</div>
          <div className="col-span-1">ID</div>
          <div className="col-span-1">Amount</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Date</div>
        </div>

        {data.map((transaction, index) => (
          <div
            key={transaction.id}
            className={`grid grid-cols-5 items-center py-4 ${
              index !== data.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div className="col-span-1 flex items-center gap-3">
              {transaction.logo}
              <span className="font-medium">{transaction.name}</span>
            </div>
            <div className="col-span-1 text-gray-400">{transaction.id}</div>
            <div
              className={`col-span-1 font-medium ${
                transaction.isNegative ? "text-red-500" : "text-green-500"
              }`}
            >
              {transaction.amount}
            </div>
            <div className="col-span-1 text-gray-500">{transaction.date}</div>
            <div className="col-span-1 text-gray-500">{transaction.date}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default Table;

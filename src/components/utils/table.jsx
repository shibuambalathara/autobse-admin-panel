import React, { useState } from "react";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";
import Search from "./search";
import LimitedDataPaginationComponents from "./limitedDataPagination";

function TableComponent(prop) {
  const { columns, data, pagination } = prop;
  const [pageIndex, setPageIndex] = useState(0);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // current page's rows
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state, // Destructure state here
    gotoPage, // Use gotoPage instead of setPage
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex },
      pageSize: 10, // Set page size to 10 rows per page
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state; // Destructure globalFilter from state
  const totalPages = Math.ceil(data.length / 10);


  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="inline-block py-2 sm:px-6 lg:px-4">
          <Search filter={globalFilter} className="text-white bg-red-200" setFilter={setGlobalFilter} />
          <div className="border border-gray-200 dark:border-gray-400 md:rounded-lg overflow-hidden">
            <div className="overflow-x-auto lg:w-[80rem] md:w-[35rem] sm:w-[20rem] min-h-[10rem] max-h-[27rem]">
              <table {...getTableProps()} className="min-w-full text-start text-sm font-light text-black">
                <thead className="border-b border-neutral-200 font-medium bg-gray-100 sticky top-0 z-20 ">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-3 py-4 truncate text-start" key={column.id}>
                          {column.render("Header")}
                          <span>
           {column?.isSortedDesc ? " 🔽" : " 🔼" }
          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="overflow-x-auto">
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={row.original.id} className="border-b border-neutral-200">
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()} className="whitespace-nowrap px-4 py-4 text-sm text-black capitalize font-medium" key={cell.column.id}>
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
    
            {/* Pagination Controls */}
          </div>
          {!pagination && (
          <div className="pagination mt-4 flex justify-center items-center space-x-2 text-xs text-gray-600">
          {/* Previous Page Button */}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`p-2 rounded ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        
          {/* Page Numbers with Truncation */}
          {totalPages > 1 && (
            <>
              {state.pageIndex > 2 && (
                <>
                  <button onClick={() => gotoPage(0)} className="px-4 py-2 rounded hover:bg-gray-100">
                    1
                  </button>
                  {state.pageIndex > 3 && <span className="px-2">...</span>}
                </>
              )}
              {[...Array(totalPages)]
                .map((_, index) => index)
                .filter(
                  (index) =>
                    index === state.pageIndex || // Current page
                    index === state.pageIndex - 1 || // One before current
                    index === state.pageIndex + 1 // One after current
                )
                .map((index) => (
                  <button
                    key={index}
                    onClick={() => gotoPage(index)}
                    className={`px-4 py-2 rounded ${
                      index === state.pageIndex ? "bg-gray-200 text-gray-900 font-medium" : "hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              {state.pageIndex < totalPages - 3 && (
                <>
                  {state.pageIndex < totalPages - 4 && <span className="px-2">...</span>}
                  <button onClick={() => gotoPage(totalPages - 1)} className="px-4 py-2 rounded hover:bg-gray-100">
                    {totalPages}
                  </button>
                </>
              )}
            </>
          )}
        
          {/* Next Page Button */}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`p-2 rounded ${!canNextPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableComponent;

import React, { useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";

function TableComponent({ columns, data }) {
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
    state: { pageIndex: currentPageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex },
      pageSize: 10, // Set page size to 10 rows per page
    },
    usePagination
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="sm:-mx-2 lg:-mx-4">
        <div className="inline-block  py-2 sm:px-6 lg:px-8">
          <div className="border border-gray-200 dark:border-gray-400 md:rounded-lg overflow-hidden">
            {/* Table wrapper for horizontal scroll */}
            <div className="overflow-x-auto w-[82rem] h-[30rem]">
              <table
                {...getTableProps()}
                className="min-w-full text-start text-sm font-light text-black"
              >
                <thead className="border-b border-neutral-200 font-medium bg-gray-100 sticky top-0 z-20 ">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="px-3 py-4 truncate text-start"
                          key={column.id}
                        >
                          {column.render("Header")}
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
                          <td
                            {...cell.getCellProps()}
                            className="whitespace-nowrap px-4 py-4 text-sm text-black"
                            key={cell.column.id}
                          >
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
          <div className="pagination mt-4 flex items-center justify-between">
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Previous
              </button>
              <span className="text-sm">
                Page{" "}
                <strong>
                  {currentPageIndex + 1} of {Math.ceil(data.length / 10)}
                </strong>
              </span>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Next
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default TableComponent;

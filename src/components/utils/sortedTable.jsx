import React, { useEffect, useState } from "react";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";
import Search from "./search";
import LimitedDataPaginationComponents from "./limitedDataPagination";
import NotFoundPage from "./emptyComponent";
import { updateSortingState } from "../../store/actions/sortingAction";
import { useDispatch, useSelector } from "react-redux";

function SortedTableComponent({ columns, data, pagination, global = false, limit = true }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [sorting, setSorting] = useState([]);
  const dispatch = useDispatch();
  const sortingState = useSelector((state) => state.sorting || []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state,
    gotoPage,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex, sortBy: sorting },
      manualPagination: !limit,
      pageSize: limit ? 10 : data.length,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleColumnSort = (columnId) => {
    const currentSort = sortingState.find((sort) => sort.id === columnId);
    let nextSort;

    if (!currentSort) {
      nextSort = { id: columnId, order: "ASC" };
    } else if (currentSort.order === "ASC") {
      nextSort = { id: columnId, order: "DESC" };
    } else {
      nextSort = undefined;
    }

    const updatedSorting = nextSort ? [nextSort] : [];
    dispatch(updateSortingState(updatedSorting));
  };

  const { globalFilter, sortBy } = state;
  const totalPages = Math.ceil(data.length / 10);

  useEffect(() => {
    if (sortBy.length > 0) {
      setSorting(sortBy);
    }

    return () => {
      setSorting([]);
    };
  }, [sortBy]);

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.length <= 0) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="inline-block py-2 sm:px-6 lg:px-4">
        {!global && (
          <Search
            filter={globalFilter}
            className="text-white bg-red-200"
            setFilter={setGlobalFilter}
          />
        )}
        <div className="border border-gray-200 dark:border-gray-400 md:rounded-lg overflow-hidden">
          <div className="overflow-x-auto lg:w-[77rem] md:w-[35rem] sm:w-[20rem] min-h-[10rem] max-h-[27rem]">
            <table {...getTableProps()} className="min-w-full text-start text-sm font-light text-black">
              <thead className="border-b border-neutral-200 font-medium bg-gray-100 sticky top-0 z-20">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        onClick={() => handleColumnSort(column.id)}
                        className="px-3 py-4 truncate text-start cursor-pointer"
                        key={column.id}
                      >
                        {column.render("Header")}
                        <span className="ml-1">
                          {sortingState.find((sort) => sort.id === column.id)?.order === "DESC"
                            ? "🔽"
                            : sortingState.find((sort) => sort.id === column.id)
                            ? "🔼"
                            : ""}
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
                    <tr
                      {...row.getRowProps()}
                      key={row.original.id}
                      className="border-b border-neutral-200"
                    >
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="whitespace-nowrap px-4 py-4 text-sm text-black capitalize font-medium"
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

          {!pagination && (
            <div className="pagination mt-4 flex justify-center items-center space-x-2 text-xs text-gray-600">
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className={`p-2 rounded ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                }`}
                aria-label="Previous Page"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => gotoPage(index)}
                  className={`px-4 py-2 rounded ${
                    state.pageIndex === index
                      ? "bg-gray-200 text-gray-900 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className={`p-2 rounded ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                }`}
                aria-label="Next Page"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SortedTableComponent;

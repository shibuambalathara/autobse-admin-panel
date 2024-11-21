import { ButtonStyleDisabledPagination, ButtonStylePagination, pageNumber } from "./style";

const LimitedDataPaginationComponents = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = currentPage * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  return (
    <div className="flex flex-col lg:flex-row  justify-center gap-10 pb-10">
      {/* Items Count and Page Info */}
      <div className="flex flex-col lg:flex-row items-center space-x-2 text-xs">
        {/* <button className="py-2 px-4 bg-white text-gray-600 font-medium rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
          {`${itemsPerPage} items`}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button> */}
        <p className="text-gray-500 mt-4 lg:mt-0">
          {`Showing ${startItem} to ${endItem} of ${totalItems} entries`}
        </p>
      </div>

      {/* Pagination Navigation */}
      <nav aria-label="Pagination" className="flex justify-center items-center text-gray-600 mt-8 lg:mt-0">
        {/* Previous Page */}
        {currentPage > 0 ? (
          <button onClick={() => onPageChange(currentPage - 1)} className="p-2 mr-4 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <span className="p-2 mr-4 rounded opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </span>
        )}

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index)}
            className={`px-4 py-2 rounded ${index === currentPage ? 'bg-gray-200 text-gray-900 font-medium' : 'hover:bg-gray-100'}`}
          >
            {index + 1}
          </button>
        ))}

       
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="px-4 py-2">...</span>
            <button onClick={() => onPageChange(totalPages - 1)} className="px-4 py-2 rounded hover:bg-gray-100">
              {totalPages}
            </button>
          </>
        )}

        {/* Next Page */}
        {currentPage < totalPages - 1 ? (
          <button onClick={() => onPageChange(currentPage + 1)} className="p-2 ml-4 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <span className="p-2 ml-4 rounded opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </nav>
    </div>
  );
};

export default LimitedDataPaginationComponents;

import { ButtonStyleDisabledPagination, ButtonStylePagination, pageNumber } from "./style";

const LimitedDataPaginationComponents = ({ currentPage,  onPageChange }) => {
   


    return (
        <div className="flex justify-center mb-2">
          <div className="flex flex-col justify-between mt-4">
           
    
            <div className="space-x-2">
           
                     {currentPage === 0 ? (
  <span className={ButtonStyleDisabledPagination?.data}>
    First Page
  </span>
) : (
  <button onClick={() => onPageChange(0)} className={ButtonStylePagination?.data}>
   First Page
  </button>
)}
              {currentPage === 0 ? (
  <span className={ButtonStyleDisabledPagination?.data}>
    &lt; Previous Page
  </span>
) : (
  <button onClick={() => onPageChange(currentPage - 1)} className={ButtonStylePagination?.data}>
    &lt; Previous Page
  </button>
)}

            <span className={pageNumber?.data}>{currentPage + 1}</span> 
              <button
                className={ButtonStylePagination?.data}
                onClick={() => onPageChange(currentPage + 1)}
          
              >
             <p>{ `Next Page >`} </p>
              </button>
            </div>
          </div>
        </div>
      );
    };


export default LimitedDataPaginationComponents



import React from 'react'
import { ButtonStyleDisabledPagination, ButtonStylePagination, pageNumber } from './style'

const PaginationComponents = (paginationData) => {

const {nextPage,gotoPage,canPreviousPage,previousPage,pageCount,canNextPage,tablePageIndex}=paginationData


  return (
    <div className="flex justify-center">
    <div className="flex flex-col justify-between mt-4 ">

      <div className="space-x-2">
        
                            {!canPreviousPage ? (
  <span className={ButtonStyleDisabledPagination?.data}>
    First Page
  </span>
) : (
  <button onClick={() => gotoPage(0)} className={ButtonStylePagination?.data}>
   First Page
  </button>
)}
       
        {/* <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="btn"
        >
          {"<"}
        </button> */}

{!canPreviousPage ? (
  <span className={ButtonStyleDisabledPagination?.data}>
  &lt; Previous Page
  </span>
) : (
  <button onClick={() => previousPage()} className={ButtonStylePagination?.data}>
   &lt; Previous Page
  </button>
)}
        
        <span className={pageNumber?.data}>{tablePageIndex+1 }</span> of
        <span className={pageNumber?.data}>{pageCount }</span> 

{!canNextPage ? (
  <span className={ButtonStyleDisabledPagination?.data}>
   Next Page &gt;
  </span>
) : (
  <button onClick={() => nextPage()} className={ButtonStylePagination?.data}>
  Next Page &gt;
  </button>
)}


        {/* <button className="btn" onClick={() => gotoPage(pageCount - 1)}  disabled={!canNextPage}>
  {'>>'}
</button>{' '} */}

{!canNextPage ? (
  <span className={ButtonStyleDisabledPagination?.data}>
   Last Page
  </span>
) : (
  <button onClick={() => gotoPage(pageCount - 1)} className={ButtonStylePagination?.data}>
  Last Page 
  </button>
  
)}
    

      </div>
 
    </div>
  </div>
  )
}

export default PaginationComponents

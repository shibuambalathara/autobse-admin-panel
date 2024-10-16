


import { Button } from '@material-tailwind/react'
import React, { useMemo } from 'react'
import {useNavigate} from 'react-router-dom'
import { useTable,usePagination,useGlobalFilter } from "react-table"
import {useEmdTableQuery} from '../../utils/graphql'
import SearchUser from '../utils/search'
import format from 'date-fns/format'


const EmdTable = () => {

    const {data,loading,error}=useEmdTableQuery()

    const navigate=useNavigate()
    


const handleUser=(userId)=>{
navigate(`/view-user/${userId}`)
}


    const columns = useMemo(
        () => [
          { Header: "Emd Number", accessor: "emdNo" },
          { Header: "Vehicle buying limit", accessor: "vehicleBuyingLimitIncrement" },
          { Header: "Created At ", accessor: ({createdAt})=>{return format(new Date (createdAt),`dd/MM/yy, HH:mm`)}  },
         
          { Header: "Created By ", accessor:"createdBy.firstName"  },
         

         
          {
            Header: "View User",
            Cell: ({ row }) => (
              <button className="btn btn-info w-28" onClick={()=>handleUser(row.original.user?.id) }>{row.original.user?.firstName} {row.original.user?.lastName}</button>
            )
          },
          
          
          
        ],
        []
      );

      const tableData=useMemo(() => (data ? data.emdUpdates : []), [data]);
      const tableInstance=useTable({
        columns ,
        data: tableData,
      },useGlobalFilter,usePagination);
     
        const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
         
          page,
          prepareRow,
          nextPage,
          previousPage,
          canNextPage,
          canPreviousPage,
          pageOptions,
          pageCount,
          gotoPage,
          setPageSize: setTablePageSize,
          state: { pageIndex: tablePageIndex, pageSize: tablePageSize },
          state,
          setGlobalFilter
        } = tableInstance;
    
        const {globalFilter}=state
    
      if (loading) return <p>Loading...</p>;
      

  return (
    <div className="flex  flex-col w-full justify-around ">
    {/* <Button
      onClick={() => navigate(`/add-emd`)}
      className="m-5 justify-end w-fit bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
     Add Emd
    </Button> */}
    
    <div className=" flex flex-col w-full justify-center m-auto ">
    <div className="mb-2">
  <div className="text-center font-extrabold my-5 text-lg min-w-full">  Emd Data Table </div>
    <SearchUser filter={globalFilter} className="  text-white " setFilter={setGlobalFilter}/>
  </div>
      <table
        className="w-full divide-y divide-gray-200"
        {...getTableProps()}
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  scope="col"
                  className="py-3 pl-4"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="py-3 pl-4 text-center" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center">
            <div className="flex flex-col justify-between mt-4 ">
            <div className="flex justify-center">
          Page{' '}
          <strong>
            {tablePageIndex + 1} of {tableInstance.pageOptions.length}
         
          </strong>{' '}
        </div>
              <div className="space-x-2">
                <button
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                  className="btn "
                >
                  {"<<"}
                </button>
               
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  className="btn"
                >
                  {"<"}
                </button>
                <button
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  className="btn"
                >
                  {" "}
                  {">"}
                </button>
                <button className="btn" onClick={() => gotoPage(pageCount - 1)}  disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
              </div>
         
            </div>
          </div>
  </div>
  </div>
  )
}

export default  EmdTable 



import { Button } from '@material-tailwind/react'
import React, { useMemo } from 'react'
import {useNavigate} from 'react-router-dom'
import { useTable,usePagination,useGlobalFilter } from "react-table"
import {useBidsTableQuery} from '../../utils/graphql'
import SearchUser from '../utils/search'
import format from 'date-fns/format'


const BidsTable = () => {
    const {data,loading,error}=useBidsTableQuery()
    const navigate=useNavigate()

    const handleUserDetails=(userId)=>{

navigate(`/view-user/${userId}`)
    }
    const handleVehicleDetails=(vehicleId)=>{
      navigate(`/edit-vehicle/${vehicleId}`)
    }

    const columns = useMemo(
        () => [
          { Header: "Bids Name", accessor: "name" },
          { Header: "Amount", accessor: "amount" },
          { Header: "createdAt",  accessor: ({createdAt})=>{return format(new Date (createdAt),`dd/MM/yy, HH:mm`)} },
          { Header: "updatedAt", accessor: ({updatedAt})=>{return format(new Date (updatedAt),`dd/MM/yy, HH:mm`)} },
        
         
          {
            Header: "Bidder first Name",
            Cell: ({ row }) => (
              <button className="btn btn-info w-24" onClick={()=>handleUserDetails(row.original.user.id) }>{row.original?.user?.firstName} {row.original?.user?.lastName}</button>
            )
          },
          {
            Header: "Vehicle Details",
            Cell: ({ row }) => (
              <button className="btn btn-secondary" onClick={() => handleVehicleDetails(row.original.bidVehicle.id)}>{row.original.bidVehicle.registrationNumber}</button>
            )
          }
          
        ],
        []
      );

      const tableData=useMemo(() => (data ? data.bids : []), [data]);
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
      

    
    <div className=" flex flex-col w-full justify-center m-auto ">
    <div className="mb-2">
  <div className="text-center font-extrabold my-5 text-lg min-w-full">  Bids Data Table </div>
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
      <div className="flex justify-between mt-4">
      <div>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md mr-2"
        >
          {'<<'}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md mr-2"
        >
          {'<'}
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md mr-2"
          >  {'>'}</button>
          </div>
          </div>
      
    </div>
  </div>
  </div>
  )
}

export default  BidsTable
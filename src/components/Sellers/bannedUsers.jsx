

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import {  useBannedUsersQuery } from "../../utils/graphql";
import { useTable,useSortBy, usePagination, useGlobalFilter } from "react-table";
import SearchUser from "../utils/search";
import TableComponent from "../utils/table";

const BannedUsersComponent = () => {
 const {id}=useParams()
 
  const navigate = useNavigate();

   const { data, loading, error } = useBannedUsersQuery({variables:{where:{id:{equals:id}}}});
 


  const handleViewMore = (id) => {
    navigate(`/view-user/${id}`);
  };
 

  const columns = useMemo(
    () => [
   { Header: " User Name", accessor: "username" ,  className: 'w-1/3',  },
       { Header: "First Name", accessor: "firstName" ,  className: 'w-1/3', },
       { Header: "Last Name", accessor: "lastName" ,  className: 'w-1/3', },


   

      {
        Header: "View more",
        Cell: ({ row }) => (
          <button
            className="btn btn-primary"
            onClick={() => handleViewMore(row.original.id)}
          >
            View More
          </button>
        ),
      },

    ],
    []
  );
   const tableData = useMemo(() => (data ? data?.sellers[0]?.bannedUsers : []), [data]);
 

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
    },
   
    useGlobalFilter,
    useSortBy,
    usePagination,
    
  );

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
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;
  

  return (
    <div className="w-full  h-fit  ">
  

      <div className=" max-w-7xl mx-auto h-fit">
        <div className=" flex flex-col justify-center m-auto w-full">
          <div className="mb-4">
            <div className="text-center font-extrabold my-1  text-2xl w-full">
              {" "}
              {data?.sellers[0].name} {"Banned Users "}
            </div>
            <TableComponent tableData={data?.sellers[0]?.bannedUsers} columns={columns} />

          </div>
        
    
        </div>
      </div>
    </div>

  );
};

export default BannedUsersComponent;

import { Button } from "@material-tailwind/react";
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import {

  useContactUsQuery,
  useDeleteContactUsMutation,
  useUpdateContactUsMutation,
} from "../../utils/graphql";


import Swal from "sweetalert2";
import TableComponent from "../utils/table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FormatDate } from "../utils/dateFormat";

const ViewQueries = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useContactUsQuery();
  
 
  const [updateStatus] = useUpdateContactUsMutation();
  const [deleteEnquiries] = useDeleteContactUsMutation();

  const handleChangeStatus = async (quiryId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "question",
      text: "Change status to solved ?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      const Result = await updateStatus({
        variables: { where: { id: quiryId }, data: { status: "solved" } },
      });

      refetch();
    }
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      deleteEnquiries({
        variables: { where: { id } },
      })
        .then((response) => {
          Swal.fire({
            title: ` Deleted Successfully`,
            icon: "success",
          });

          refetch();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err,
          });
        });
    }
  };

  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Mobile", accessor: "mobile" },
      {
        Header: "Created At ",
        accessor: ({ createdAt }) => {
          return  FormatDate(createdAt);
        },
      },
      {
        Header: "Updated At ",
        accessor: ({ updatedAt }) => {
          return FormatDate(updatedAt);
        },
      },
      { Header: "State", accessor: "email" },
      { Header: "Message", accessor: "message" },

      {
        Header: "Status",
        Cell: ({ row }) =>
          row.original.status === "created" ? (
            <button
              className="btn bg-red-500"
              onClick={() => handleChangeStatus(row.original?.id)}
            >
              Unsolved
            </button>
          ) : (
            <p className="text-green-500 font-bold">Solved</p>
          ),
      },
      // {
      //   Header: "Delete",
      //   Cell: ({ row }) => (
      //     <button
      //       className="text-2xl"
      //       onClick={() => handleDelete(row.original.id)}
      //     >
      //     <FontAwesomeIcon icon={faTrashCan} />
      //     </button>
      //   ),
      // },
    ],
    []
  );

  const tableData = useMemo(() => (data ? data.contactuses : []), [data]);

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
      initialState: {
        sortBy: [
          {
            id: "eventsCount",
            desc: true,
          },
        ],
      },
    },

    useGlobalFilter,
    useSortBy,
    usePagination
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
    <div className="w-full  h-full ">
     
        <div className="   flex flex-col justify-center m-auto w-full">
          <div className="text-center font-extrabold my-5 text-lg w-full">
            Enquiries{" "}
          </div>
       

          <TableComponent tableData={data?.contactuses} columns={columns} />
        </div>
     
    </div>
  );
};

export default ViewQueries;

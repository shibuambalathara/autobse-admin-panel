import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStatesQuery, useUpdateStateMutation } from "../../utils/graphql";
import Swal from "sweetalert2";
import TableComponent from "../utils/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { pageHead, Tablebutton } from "../utils/style";
import EditState from "./editState";
import AutobseLoading from "../utils/autobseLoading";


const ViewStates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(null);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useStatesQuery();
  console.log("state", data);

  const handleEditState = (id,name) => {
    setSelectedStateId(id)
    setName(name)
    setIsModalOpen(true);
  };

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      {
        Header: "Edit State",
        Cell: ({ row }) => (
          <button
            className={`${Tablebutton.data} bg-red-500`}
            onClick={() => handleEditState(row.original?.id,row.original?.name)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        ),
      },
      {
        Header: "View Users",
        Cell: ({ row }) => (
          <a
            className={`${Tablebutton.data} bg-blue-500`}
            href={`/ViewUsersByState/${row.original.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Users
          </a>
        ),
      },
    ],
    []
  );

  if (loading) return( <AutobseLoading/>)
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto h-fit">
        <div className="flex flex-col justify-center m-auto w-full">
          <div className={pageHead.data}>
            STATES
          </div>
          {isModalOpen && (
            <EditState
              id={selectedStateId}
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              refetch={refetch}
              name={name}
            />
          )}
          <TableComponent data={data?.States} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default ViewStates;

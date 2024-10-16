import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, usePagination, useGlobalFilter, useSortBy, Column } from "react-table";
import { useUpdateLocationMutation, useLocationsQuery, Location } from "../../utils/graphql";
import Swal from "sweetalert2";
import TableComponent from "../utils/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

const ViewLocationComponent: React.FC = () => {
  const { data, loading, error, refetch } = useLocationsQuery();
  const [updateLocation] = useUpdateLocationMutation();

  const handleEditLocation = async (name: string, id: string) => {
    const { value: input } = await Swal.fire({
      title: 'Enter Location Name',
      html: '<input id="location" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        const inputElement = document.getElementById('location') as HTMLInputElement;
        return [inputElement.value];
      },
    });

    const newState = input ? input[0] : '';
    
    if (newState) {
      updateLocation({
        variables: { where: { id }, updateLocationInput: { name: newState } },
      })
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: `Location "${name}" changed to "${res?.data?.updateLocation?.name}"`,
          });
          refetch();
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Location not updated',
          });
        });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    });
    
    if (result.isConfirmed) {
      // Perform delete operation here
      Swal.fire({
        icon: 'success',
        title: 'Location deleted',
      });
    }
  };

  const columns: Column<Location>[] = useMemo(
    () => [
      { Header: "City", accessor: "name" },
      { Header: "State", accessor: (row: Location) => row?.state },
      { Header: "Country", accessor: "country" },
      {
        Header: "Edit",
        Cell: ({ row }: { row: { original: Location } }) => (
          <button
            className="btn bg-red-500 text-xl"
            onClick={() => handleEditLocation(row.original.name, row.original.id)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        ),
      },
      {
        Header: "Delete",
        Cell: ({ row }: { row: { original: Location } }) => (
          <button
            className="btn bg-red-500 text-xl"
            onClick={() => handleDelete(row.original.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        ),
      },
    ],
    []
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full h-full">
      <div className="  h-fit">
       
          <div className="text-center font-extrabold my-5 text-lg w-full">
            LOCATIONS
          </div>
          <TableComponent data={data?.locations} columns={columns} />
        </div>
    
    </div>
  );
};

export default ViewLocationComponent;

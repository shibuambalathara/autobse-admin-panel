import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, usePagination, useGlobalFilter, useSortBy, Column } from "react-table";
import { useUpdateLocationMutation, useLocationsQuery, Location as GQLLocation } from "../../utils/graphql"; // Alias the Location type
import TableComponent from "../utils/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { pageHead, Tablebutton } from "../utils/style";
import EditLocation from "./editLocation";
import AutobseLoading from "../utils/autobseLoading";
 // Import the EditLocation component

const ViewLocationComponent: React.FC = () => {
  const { data, loading, error, refetch } = useLocationsQuery();
  const [selectedLocation, setSelectedLocation] = useState<GQLLocation | null>(null); // Use GQLLocation to avoid conflict with DOM Location
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to toggle the Edit modal

  const handleEditLocation = (location: GQLLocation) => {
    setSelectedLocation(location); // Set the selected location for editing
    setIsEditModalOpen(true); // Open the edit modal
  };

  const columns: Column<GQLLocation>[] = useMemo(
    () => [
      { Header: "City", accessor: "name" },
      { Header: "State", accessor: (row: GQLLocation) => row?.state?.name },
      {
        Header: "Edit",
        Cell: ({ row }: { row: { original: GQLLocation } }) => (
          <button
            className={`${Tablebutton.data} btn bg-red-500 text-lg`}
            onClick={() => handleEditLocation(row.original)} // Call handleEditLocation with the selected location
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        ),
      },
    ],
    []
  );

  if (loading)  return (
    <div>
       <AutobseLoading/>
        {/* <LoadingAnimation/> */}
    </div>
   
  );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full h-full">
      <div className="h-fit">
        <div className={pageHead.data}>
          LOCATIONS
        </div>
        <TableComponent data={data?.locations || []} columns={columns} />

        {/* Call the EditLocation component and pass the selected location */}
        {isEditModalOpen && (
          <EditLocation
            isModalOpen={isEditModalOpen}
            setIsModalOpen={setIsEditModalOpen}
            location={selectedLocation} // Pass the selected location
            refetch={refetch} // Pass refetch to update the table after editing
          />
        )}
      </div>
    </div>
  );
};

export default ViewLocationComponent;

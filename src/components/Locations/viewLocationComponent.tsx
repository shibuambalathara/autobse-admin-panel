import React, { useState } from "react";
import { useTable, Column } from "react-table";
import { useLocationsQuery, Location as GQLLocation } from "../../utils/graphql";
import TableComponent from "../utils/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import EditLocation from "./editLocation";
import AutobseLoading from "../utils/autobseLoading";
import DebounceSearchInput from "../utils/globalSearch";
import AddLocation from "./addLocation";


const ViewLocationComponent: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<GQLLocation | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // Immediate input value
  const [searchQuery, setSearchQuery] = useState(""); // Stabilized query for search
// const [locationData, setLocationData]= useState(undefined)
  const { data, loading, error, refetch } = useLocationsQuery({
    variables: { search: searchQuery },
  });

  const handleEditLocation = (location: GQLLocation) => {
   
    setSelectedLocation(location);
    setIsEditModalOpen(true);
  };

  const columns: Column<GQLLocation>[] = [
    { Header: "City", accessor: "name" },
    { Header: "State", accessor: (row: GQLLocation) => row?.state?.name },
    {
      Header: "Edit",
      Cell: ({ row }: { row: { original: GQLLocation } }) => (
        <button
          className="px-3 py-2 bg-red-500 text-white rounded-md"
          onClick={() => handleEditLocation(row.original)}
          title={`Edit ${row.original.name}`}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      ),
    },
  ];

  if (loading) return <AutobseLoading />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="  ">
       <div className='flex place-self-end w-fit'>

<AddLocation refetch={refetch} />
  </div>
      {/* Debounce Search Input */}
      <div className="w-72 ml-28 pl-2">
        <DebounceSearchInput
          placeholder="Search by city or state..."
          value={searchInput}
          onChange={setSearchInput} // Update input immediately
          onSearch={setSearchQuery} // Trigger search after debounce
          className="px-3 py-2 border rounded-md w-full"
        />
      </div>

      {/* Table Component */}
      <TableComponent data={data?.locations || []} columns={columns} global={true}  />

      {/* Edit Modal */}
      {isEditModalOpen && selectedLocation && (
        <EditLocation
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          location={selectedLocation}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ViewLocationComponent;

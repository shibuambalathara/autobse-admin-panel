import React, { useMemo, useState, useCallback } from "react";
import { useTable, usePagination, useGlobalFilter, useSortBy, Column } from "react-table";
import { useLocationsQuery, Location as GQLLocation } from "../../utils/graphql"; // Alias Location type
import TableComponent from "../utils/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import EditLocation from "./editLocation";
import AutobseLoading from "../utils/autobseLoading";
import SearchByGlobal from "../utils/globalSearch";

const ViewLocationComponent: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<GQLLocation | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Holds the current search input value
  const [search, setSearch] = useState(""); // Used to trigger the query
  
  const { data, loading, error, refetch } = useLocationsQuery({
    variables: { search },
  });

  // Handle edit button click
  const handleEditLocation = useCallback((location: GQLLocation) => {
    setSelectedLocation(location);
    setIsEditModalOpen(true);
  }, []);

  // Trigger refetch without clearing the input field
  const handleSearch = useCallback(() => {
    setSearch(searchQuery); // Trigger search with the current query
    refetch({ search: searchQuery }); // Explicitly call refetch if needed
  }, [searchQuery, refetch]);

  // Table columns
  const columns: Column<GQLLocation>[] = useMemo(
    () => [
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
    ],
    [handleEditLocation]
  );

  if (loading) return <AutobseLoading />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="w-full space-y-4 px-16">
      {/* Search Component */}
      <div className="flex items-center space-x-4 ml-8">
        <SearchByGlobal
          value={searchQuery} // Controlled input
          onChange={(value) => setSearchQuery(value)} // Update the search query
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Table Component */}
      <TableComponent data={data?.locations || []} columns={columns} />

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

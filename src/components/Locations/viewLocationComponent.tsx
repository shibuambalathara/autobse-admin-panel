import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter, useSortBy, Column } from "react-table";
import { useLocationsQuery, Location as GQLLocation } from "../../utils/graphql";
import TableComponent from "../utils/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import EditLocation from "./editLocation";
import AutobseLoading from "../utils/autobseLoading";
import { filterStyle } from "../utils/style";

const DEBOUNCE_DELAY = 1000; // Debounce time in milliseconds

const ViewLocationComponent: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<GQLLocation | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // User input value
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced search query

  const { data, loading, error, refetch } = useLocationsQuery({
    variables: { search: debouncedSearch }, // Use the debounced search query
  });

  // Debounce logic for the search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery); // Update debounced search query after delay
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler); // Clear timeout if user types again
    };
  }, [searchQuery]); // Runs when searchQuery changes

  // Handle edit button click
  const handleEditLocation = useCallback((location: GQLLocation) => {
    setSelectedLocation(location);
    setIsEditModalOpen(true);
  }, []);

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
    <div className="w-full space-y-4 px-10">
      {/* Search Input */}
      <div className="flex items-center w-72 ml-14  gap-2">
        <input
          type="text"
          value={searchQuery} // Controlled input
          placeholder="Search by city or state..."
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          className={`${filterStyle.data} w-52`}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")} // Clear the search query
            className=" px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Clear
          </button>
        )}
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

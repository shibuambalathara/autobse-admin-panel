import React, { useEffect, useMemo, useState } from "react";

import {
  useCountsQuery,
  useEventsQuery,
  useLocationsfilterQuery,
  useSellersFilterQuery,
  useUpdateEventMutation,
} from "../../utils/graphql";

import TableComponent from "../utils/table";
import LimitedDataPaginationComponents from "../utils/limitedDataPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faFileArrowDown,
  faFileArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

import { FormatDate } from "../utils/dateFormat";
import CustomButton from "../utils/buttons";
import { pageHead, Tablebutton } from "../utils/style";
import AutobseLoading from "../utils/autobseLoading";
import { useExcelDownload } from "../utils/excelFormat";
import DebounceSearchInput from "../utils/globalSearch";
import CustomFilter from "../utils/costomFilter";

const EventsTableComponent = () => {
  const handleExcelDownload = useExcelDownload();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [eventCount, setEventCount] = useState(0);
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterValues, setFilterValues] = useState({
    startDate: undefined,
    endDate: undefined,
    status: undefined,
    locationId: undefined,
    eventNo: undefined,
    eventCategory: undefined,
    sellerId: undefined,
  });

  const hasFilterValues = Object.values(filterValues).some(
    (value) => value !== undefined
  );

  const variables = useMemo(() => {
    // Check if any filter value is not undefined

    if (searchQuery || hasFilterValues) {
      return {
        search: searchQuery || undefined, // Include searchQuery if it exists
        where: hasFilterValues ? filterValues : undefined, // Include filters only if they exist
      };
    } else {
      // Default pagination logic
      return {
        skip: currentPage * pageSize,
        take: pageSize,
        orderBy: [{ eventNo: "DESC" }],
      };
    }
  }, [searchQuery, filterValues, currentPage, pageSize]);

  const { data: locations } = useLocationsfilterQuery();
  const { data: sellers } = useSellersFilterQuery();

  const { data, loading, error, refetch } = useEventsQuery({
    variables,
    fetchPolicy: "network-only",
  });

  const { data: countData } = useCountsQuery();
  useEffect(() => {
    if (countData && countData.eventsCount !== undefined) {
      setEventCount(countData.eventsCount);
    }
  }, [countData]);
  console.log(data, "data");

  // const [addParticipants] = useUpdateEventMutation();

  useEffect(() => {
    refetch();
  }, [data, filterValues]);

  const showPagination =
    !searchQuery && !hasFilterValues && data?.events.events;

  const handleClearFilters = () => {
    // setSearchQuery("")
    setSearchInput("")
    setFilterValues({
      startDate: undefined,
      endDate: undefined,
      status: undefined,
      eventNo: undefined,
      locationId: undefined,
      eventCategory: undefined,
      sellerId: undefined,
      

    });
    setCurrentPage(0); // Reset to the first page
    refetch(); // Refetch data with cleared filters
  };

  const handleDelete = (id) => {
    // deleteEvent({variables:{where:{id}}})
    // refetch()
  };
  const handleFiltersChange = (name, value) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filterConfig = [
    {
      type: "date",
      label: "Start Date",
      name: "startDate",
    },
    {
      type: "date",
      label: "End Date",
      name: "endDate",
    },
    // {
    //   type: "number",
    //   label: "Event No",
    //   name: "eventNo",
    // },
    {
      type: "select",
      label: "Status",
      name: "status",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "completed", label: "Completed" },
      ],
    },
    {
      type: "select",
      label: "Event Category",
      name: "eventCategory",
      options: [
        { value: "open", label: "Open" },
        { value: "online", label: "Online" },
      ],
    },
    {
      type: "select",
      label: "Locations",
      name: "locationId",
      options: locations?.locations.map((loc) => ({
        value: loc.id,
        label: loc.name,
      })),
    },
    {
      type: "select",
      label: "Sellers",
      name: "sellerId",
      options: sellers?.sellers.map((loc) => ({
        value: loc.id,
        label: loc.name,
      })),
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: "Auction No",
        Cell: ({ row }) =>
          row.original.endDate > new Date().toISOString() ? (
            row.original?.eventCategory === "open" ? (
              <a
                className={`${Tablebutton.data} bg-red-500 `}
                href={`/openAuctionUpdatedByAdmin/${row.original.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.original.eventNo}
              </a>
            ) : (
              <span class="relative  h-3 w-3  ">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-30"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500">
                  {row.original.eventNo}
                </span>
              </span>
            )
          ) : (
            row.original.eventNo
          ),
      },
      { Header: "Seller Name", accessor: "seller.name" },
      { Header: "Location", accessor: "location.name" },
      { Header: "Event Category ", accessor: "eventCategory" },
      //  { Header: "Start Date ", accessor: ({startDate})=>{return format(new Date( startDate),`dd/MM/yy, HH:mm`)} },
      {
        Header: "Start Date",
        accessor: ({ startDate }) => new Date(startDate),
        sortType: "datetime",
        Cell: ({ value }) => FormatDate(value),
      },
      {
        Header: "End Date ",
        accessor: ({ endDate }) => {
          return FormatDate(endDate);
        },
      },
      { Header: "Status ", accessor: "status" },
      // {
      //   Header: "Add Partcipant",
      //   Cell: ({ row }) => (
      //     row.original.endDate>new Date().toISOString() ?       <button className="text-2xl" onClick={() => handleDealer(row.original.id)}><FontAwesomeIcon icon={faUserPlus} /></button>:"Event Completed"
      //   )
      // },
      // {
      //   Header: "View Participants",
      //   Cell: ({ row }) => (
      //     <a className="btn bg-violet-500" href={`/participants/${row.original.id}`} target="_blank" rel="noopener noreferrer">{row.original.participantsCount}</a>

      //     )
      // },

      {
        Header: "Add Vehicles ",
        Cell: ({ row }) => (
          <p className="flex justify-center">
            {row.original.endDate > new Date().toISOString() && (
              <a
                className=" text-xl "
                href={`/add-vehicle/${row.original.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                + <FontAwesomeIcon icon={faCar} />
              </a>
            )}
          </p>
        ),
      },

      {
        Header: "View Vehicles",
        Cell: ({ row }) => {
          const vehicleCount = row.original?.vehiclesCount;

          const isDisabled = vehicleCount === 0;
          const buttonClass = isDisabled
            ? `${Tablebutton.data} bg-gray-400   `
            : `${Tablebutton.data} bg-[#43a5a0]`;

          return isDisabled ? (
            <button className={`${buttonClass} cursor-not-allowed `} disabled>
              {vehicleCount}
            </button>
          ) : (
            <a
              className={buttonClass}
              href={`/view-vehicls/${row.original.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {vehicleCount}
            </a>
          );
        },
      },
      {
        Header: " Deleted Vehicles",
        Cell: ({ row }) => {
          const vehicleCount = row.original?.deletedVehiclesCount;

          const isDisabled = vehicleCount === 0;
          const buttonClass = isDisabled
            ? `${Tablebutton.data} bg-gray-400   `
            : `${Tablebutton.data} bg-red-600`;

          return isDisabled ? (
            <button className={`${buttonClass} cursor-not-allowed `} disabled>
              {vehicleCount}
            </button>
          ) : (
            <a
              className={buttonClass}
              href={`/Deleted-vehicles/${row.original.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {vehicleCount}
            </a>
          );
        },
      },
      {
        Header: "Upload Excel File",
        Cell: ({ row }) => (
          //        <button className="btn btn-info" onClick={()=>handleUploadExcelFile(row.original.id) }>Upload</button>
          <a
            className={`${Tablebutton.data} bg-emerald-500 text-xl hover:bg-emerald-600`}
            href={`/excel-upload/${row.original.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFileArrowUp} />
          </a>
        ),
      },

      {
        Header: "View/Edit Event",
        Cell: ({ row }) => (
          <a
            className={`${Tablebutton.data} bg-cyan-500 text-xl `}
            href={`/edit-event/${row.original.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faCalendarDays} />
          </a>
        ),
      },
      {
        Header: "ACR (Excel)",
        Cell: ({ row }) => (
          <button
            className={`${Tablebutton.data} bg-red-500 text-xl`}
            onClick={() => handleExcelDownload(row.original.id)}
          >
            <FontAwesomeIcon icon={faFileArrowDown} />
          </button>
        ),
      },
      // {
      //   Header:"delete",
      //   Cell: ({ row }) => (
      //     <button className="text-2xl" onClick={() => handleDelete(row.original.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
      //   )
      // }
    ],
    []
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = data?.events?.length;

  if (loading) return <AutobseLoading />;

  return (
    <div className="flex flex-col h-full mx-auto ">
      <h2 className={pageHead.data}>Events</h2>
      <div className="flex flex-wrap place-self-end items-center mr-24 mb-4">
        <CustomButton navigateTo={"/addevent"} buttonText={" Add Event"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-4/5 place-items-end ml-24 pl-3 ">
        {filterConfig.map((filter) => (
          <div key={filter.name} className="w-fit pt-1">
            <CustomFilter
              filters={[filter]}
              values={filterValues}
              onChange={handleFiltersChange}
            />
          </div>
        ))}

        {/* Clear Button */}
        <div className="w-full pt-1 pl-9">
          <button
            className="bg-red-600 text-white h-10 px-6 font-semibold rounded-lg shadow-md transform hover:bg-red-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 p-2 text-sm w-full sm:w-fit"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* <CustomFilter /> */}
      <div className=" sm:w-64   pt-4 ml-36 ">
        <DebounceSearchInput
          placeholder="Search by location or seller name..."
          value={searchInput}
          onChange={setSearchInput} // Update input immediately
          onSearch={setSearchQuery} // Trigger search after debounce
          className="px-3 py-2 border rounded-md w-full text-sm"
        />
      </div>
      <TableComponent
        data={data?.events.events || []}
        columns={columns}
        sortBy="start Date"
        pagination="false"
        global={true}
        limit={false}
      />
      {showPagination && (
        <LimitedDataPaginationComponents
          totalItems={eventCount}
          itemsPerPage={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default EventsTableComponent;

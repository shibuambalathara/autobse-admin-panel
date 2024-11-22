import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountsQuery, useEventsQuery, useUpdateEventMutation } from "../../utils/graphql";
import Report from "./report";
import Swal from "sweetalert2";
import TableComponent from "../utils/table";
import LimitedDataPaginationComponents from "../utils/limitedDataPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faFileArrowDown,
  faFileArrowUp,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

import { FormatDate } from "../utils/dateFormat";
import CustomButton from "../utils/buttons";
import { pageHead, Tablebutton } from "../utils/style";
import AutobseLoading from "../utils/autobseLoading";
import { ConvertToExcelButton, useExcelDownload } from "../utils/excelFormat";


const EventsTableComponent = () => {
  const handleExcelDownload = useExcelDownload();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [eventCount, setEventCount] = useState(0);
  const { data, loading, error, refetch } = useEventsQuery({
    variables: {
      skip: currentPage * pageSize,
      take: pageSize,
      orderBy: [
        {
          eventNo: "DESC",
        },
      ],
    },
  });
  const { data: countData, loading: countLoading, error: countError } = useCountsQuery();
  useEffect(() => {
    if (countData && countData.eventsCount !== undefined) {
      setEventCount(countData.eventsCount);
    }
  }, [countData]);
  console.log(data, "data");

  const [addParticipants] = useUpdateEventMutation();

  useEffect(() => {
    refetch();
  }, [data]);

  const navigate = useNavigate();
  //  const [deleteEvent]=useDeleteEventMutation()

  const handleDealer = async (eventId) => {
    const { value: input } = await Swal.fire({
      title: "Enter Mobile Number",
      html: '<input id="mobile" class="swal2-select"></input>',
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById("mobile").value];
      },
    });

    const mobileNumber = input[0];

    addParticipants({
      variables: {
        where: { id: eventId },
        data: { participants: { connect: { mobile: mobileNumber } } },
      },
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Dealer Added Successfully",
        });
        refetch();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "User Does not Exist",
        });
      });
  };
  const handleDelete = (id) => {
    // deleteEvent({variables:{where:{id}}})
    // refetch()
  };

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
        Cell: ({ row }) =>
          {
            const vehicleCount = row.original?.vehiclesCount
        
          
            const isDisabled = vehicleCount === 0;
            const buttonClass = isDisabled
              ? `${Tablebutton.data} bg-gray-400   `
              : `${Tablebutton.data} bg-[#43a5a0]`;
        
            return isDisabled ? (
              <button
                className={`${buttonClass} cursor-not-allowed `}
                disabled
               
              >
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
        Cell: ({ row }) =>
          {
            const vehicleCount = row.original?.deletedVehiclesCount
        
          
            const isDisabled = vehicleCount === 0;
            const buttonClass = isDisabled
              ? `${Tablebutton.data} bg-gray-400   `
              : `${Tablebutton.data} bg-red-600`;
        
            return isDisabled ? (
              <button
                className={`${buttonClass} cursor-not-allowed `}
                disabled
               
              >
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
        Header: 'ACR (Excel)',
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

  // useEffect(() => {
  //   // const intervalId = setInterval(() => {
  //     refetch();
  //   // }, 2000);

  // }, []);

  if(loading) return (
    
      
    <AutobseLoading/>
    
  )

  return (
    <div className="flex  flex-col w-full justify-around overflow-hidden">
        <div className={pageHead.data}>
            
            Events Data Table
          </div>
      <div className="flex justify-end   m-2 px-20">
        
        <CustomButton navigateTo={"/addevent"} buttonText={" Add Event"} />
        {/* <div>
        <Report/>
        </div> */}
      </div>
      <div className=" flex flex-col w-full justify-center m-auto ">
       
        
       

        <TableComponent
          data={data?.events.events || []}
          columns={columns}
          sortBy="start Date"
          pagination="false"
        />

        <LimitedDataPaginationComponents
          totalItems={eventCount}
          itemsPerPage={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default EventsTableComponent;


import React, { useEffect, useState, useMemo } from "react";
import Loader from "../ui/Loader";
import Datatable from "../ui/Datatable";
// import AlertModal from "../ui/AlertModal";
import moment from "moment";
import { useTable,useSortBy, usePagination, useGlobalFilter } from "react-table";
import SearchUser from "../utils/search";
// import {
//   CalendarIcon,
//   DocumentDownloadIcon,
//   PrinterIcon,
// } from "@heroicons/react/outline";

import { FaDownload } from "react-icons/fa";
import {AiOutlineDownload, } from 'react-icons/ai';

import { useLiveEventsQuery } from "../../utils/graphql";
import { useNavigate } from 'react-router-dom';
const OpenAuctionList = () => {
 
 
    const variables = {
      skip: 0,
      take: 10,
      where: {
        eventCategory: {
          equals: "open",
        },
      },
    };
    const { data, isLoading } = useLiveEventsQuery({ variables });
  
  
  
  
  
    const columns = [
      {
        Header: "Event Date",
        accessor: "startDate",
        Cell: ({ cell: { value } }) => StartDate(value),
      },
      {
        Header: "Seller",
        accessor: "seller.name",
      },
      {  Header: "Event Type",
        accessor: "eventCategory",
      },
      {
        Header: "State",
        accessor: "location.state.name",
      },
      {
        Header: "Location",
        accessor: "location.name",
      },
      {
        Header: "Category",
        accessor: "eventType",
        Cell: ({ cell: { value } }) => RenderEventTypes(value),
      },
      {
        Header: "Closing Date",
        accessor: "endDate",
        Cell: ({ cell: { value } }) => EndDate(value),
      },
      {
        Header: "Details",
        accessor: "id",
        Cell: ({ cell: { value, row } }) => View(value, row.original.eventCategory, row.original.startDate),
      },
      {
        Header: "Download",
        accessor: "ExcelFile",
        Cell: ({ cell: { value } }) => (
          <DownloadButton file={value} allowDownload={true} />
        ),
      },
    ];
  
  
    const showHeadings=true
  
  
  
    // setInterval(function() {
    //   window.location.reload();
    // },9000); // Refresh the page every 10 seconds (10000 milliseconds)
    
    return (
      <>
      <div className="relative bg-white">
        <div className="mx-auto max-w-md text-center  sm:max-w-3xl lg:max-w-7xl">
          {showHeadings && (
            <div className="pt-8 pb-8">
              <h2 className="text-base font-extrabold tracking-wider text-black uppercase">
                Events Calender
              </h2>
              {/* <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Most recent events
              </p>
              <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                Open auction or closed auction!! Know your deal better with list
                of locations, type of auction, date and many more features, An
                updates on our most recent events.
              </p> */}
            </div>
          )}
  
          {isLoading ? (
            <Loader />
          ) : (
            <>
            {!data?.liveEvents?.length && <div className="font-bold sm:text-base md:text-xl text-black uppercase animate-pulse duration-100 text-red-600">No Open Auctions Live </div>}
  {data?.liveEvents?.length > 0 && (
                <>
                  {/* <div className="sm:hidden">
                  {events.map((event, eventIdx) => {
                      return (
                        <MobielViewCard
                          key={eventIdx}
                          event={event}
                          allowDownload={allowDownload}
                        />
                      );
                    })}
                  </div> */}
                  <div className="hidden sm:block">
                    {data && data.liveEvents && 
                    <Datatable
                     
                      tableData={data?.liveEvents}
                      tableColumns={columns}
                    />
  }
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
    );
  };

export default OpenAuctionList


function DownloadButton({ file, allowDownload }) {
    // const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
  
    const showAlertModal = () => {
      setShowAlert(true);
    };
  
    // const redirectToLoginPage = () => {
    //   setShowAlert(false);
    //   navigate('/login');
    // };
    const downloadUrl = `https://api-dev.autobse.com/${file?.file?.url}`;
    return (
      <>
        {allowDownload && (
          <>
            {file && file?.file?.url && (
              <a
              href={downloadUrl}
                
                
              >
                <AiOutlineDownload className="h-8 w-8 text-gray-600 hover:text-green-600" />
              </a>
            )}
          </>)}
        {/* // ) : (
        //   <>
        //     <button onClick={() => showAlertModal()}>
        //       <FaDownload className="h-8 w-8 text-gray-600 hover:text-green-600" />
        //     </button>
        //   </>
        // )} */}
  
        {/* {showAlert && (
          <AlertModal
            title="Authentication Required!"
            description="Please login or register to download the file."
            handleClick={redirectToLoginPage}
            open={showAlert}
            close={() => setShowAlert(false)}
            buttonLabel="Login"
          />
        )} */}
      </>
    );
  }
  
  
  function View(value, eventCategory, startDate) {

  
    return (
      <>
       
          <div>
            <a target="_blank" rel="noopener noreferrer"
        //  href={`/${
        //    eventCategory === "open" && "open-auctions" 
        //  }/${value}?type=l`}
        href={`/openAuctionLive/${value}`}
       >
         <a target="_blank" ><div>
         <span className="text-emerald-600 font-bold">Bid Now</span></div></a>
       </a>
          </div>
        
      </>
    );
  }
  
  function RenderEventTypes(eventTypes) {
    if (eventTypes && eventTypes.length > 0) {
      return (
        <div>
          {eventTypes.map((type, index) => {
            return (
              <div key={`d${index}`}>
                <span>{type.name}</span>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div />;
    }
  }
  
  function StartDate(value) {
  
    return (
      <div>
        <div className="flex space-x-2">
          {/* <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" /> */}
          <div className="space-y-1 font-medium">
            <div className="text-sm text-gray-900 whitespace-nowrap">
              <span>{moment(value).format("MMMM Do, YYYY")}</span>
            </div>
            <div className="text-xs text-gray-500 bg-gray-200 rounded">
              <span className="text-left">
                {moment(value).format("ddd h:mm a")}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function EndDate(value) {
    return (
      <div>
        <div className="flex space-x-2">
          <div className="space-y-1 font-medium">
            <div className="text-sm text-gray-900 whitespace-nowrap">
              <span>{moment(value).format("MMMM Do, YYYY")}</span>
            </div>
            <div className="text-xs text-gray-500 bg-gray-200 rounded">
              <span className="text-left">
                {moment(value).format("ddd h:mm a")}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
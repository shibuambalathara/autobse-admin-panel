
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useDeletedVehiclesQuery,
  useSubscriptionVehicleUpdatesSubscription,
  useSubscriptionBidCreationSubscription,
  useRestorevehicleMutation
} from "../../utils/graphql";
import format from "date-fns/format";
import Swal from "sweetalert2";

import TableComponent from "../utils/table";

import { ConfirmationAlert, SweetalertSuccess} from "../utils/sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { Tablebutton } from "../utils/style";
import { DownloadBidSheetBeforeAuction } from "../bids/bidsheetBeforeAuction";
import { DownloadBidSheetsBeforeAuction } from "../bids/bidsheetfolder";
import { FaSpinner } from "react-icons/fa";
import BidModal from "../bids/bidModal";

const DeletedVehicleTable = () => {
  const { id } = useParams();
  const vehicleSub = useSubscriptionVehicleUpdatesSubscription();
  const bidSub = useSubscriptionBidCreationSubscription();
  console.log(vehicleSub, "subs");
  const [restoreVehicle] =  useRestorevehicleMutation()
 
  
  const [rowData, setRowData] = useState(null);
  const [bidOpen,  setBidOpen] = useState(false);
  const [downlod, setDownlod] = useState(true);
  const [userId, setUserId] = useState("0");
  const variables = {
    orderBy: [
      {
        bidTimeExpire: "ASC",
      },
    ],
    where: {
      id: id,
    },
  };
  const { data, loading,  refetch } = useDeletedVehiclesQuery({
    variables,
  });
  console.log("data per event", data);
 

  const [enable, setEnable] = useState(false);

  
  const handleDelete = async (deleteVehicleId, bidCount) => {
    const result = await ConfirmationAlert();
    if (result.isConfirmed) {
    

        const deleteResult = await restoreVehicle({variables:{where:{id:deleteVehicleId}}})
        if (deleteResult?.data?.deleteVehicle?.id) {

          SweetalertSuccess()
        }
        refetch()
      
    }
  };
  const handleAboutBid = async (bidDetails) => {
    const { currentBidUser, registrationNumber, currentBidAmount } = bidDetails;

    Swal.fire({
      html: `<div>
            <h1>Current Top Bidder </h1>
            <p> Name: ${currentBidUser?.firstName} ${currentBidUser?.lastName} </p>
            <p>Vehicle Number:${registrationNumber}</p>
            <p>Bid Amount:${currentBidAmount}</p>

          </div>`,
    });
  };
  const handleBidSheet = (vehicle) => {
    DownloadBidSheetBeforeAuction(vehicle);
  };
  const handleBidSheets = async (vehicles) => {
    setDownlod(false); // Immediately set to downloading state to show loading spinner
  
    // Add a small delay to ensure the button visually updates before the download begins
    setTimeout(async () => {
      try {
        const res = await DownloadBidSheetsBeforeAuction(vehicles);
  
        if (res) {
          console.log("Download successful", res);
          // Additional success actions if needed
        } else {
          console.error("Download failed");
        }
      } catch (error) {
        console.error("Error downloading bid sheets:", error);
      } finally {
        setDownlod(true); // Reset to default state after download
      }
    }, 100); // Adjust the delay if needed, e.g., 100ms
  };
  

  const handleMessage = (vehicleDetails) => {
    const {
      currentBidUser,
      registrationNumber,
      currentBidAmount,
      coupenDetail,
    } = vehicleDetails;
    Swal.fire({
      html: `<div>
      <h1>Message From Team AutoBse </h1>
      
      <p>Dear: ${currentBidUser?.firstName} ${currentBidUser?.lastName},</p>
      <p>You have successfully Applied coupen:'${coupenDetail.coupenNumber}' for the Vehicle No '${registrationNumber}'
      (Bid Amount:${currentBidAmount}).Your current buying limit are ${currentBidUser.currentVehicleBuyingLimit.vehicleBuyingLimit} Vehicles. 
      </p>
      <p>For more Details Please contact Team AutoBse. </p>
      <p>Thank you.</p>
    </div>`,
    });
  };

  const columns = useMemo(
    () => [
      { Header: "Lot Number", accessor: "lotNumber" },
      { Header: "Vehicle ID", accessor: "vehicleIndexNo" },
      {
        Header: "Vehicle Details",
        accessor: "registrationNumber",
        Cell: ({ row }) => (
          <p
           
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.original.registrationNumber}
          </p>
        ),
      },
      // { Header: "State", accessor: "state" },
      //  { Header: "City", accessor: "city" },
      
      // { Header: "Vehicle Status", accessor: "vehicleEventStatus" },

      { Header: "Bid Status", accessor: "bidStatus" },
    
      { Header: "Bid Now",  Cell: ({ row }) => (
        <>
        <button
        className={`${Tablebutton?.data} bg-blue-500`}
        onClick={() => {
          setBidOpen(true);
          setRowData(row.original);
        }}
      >
        Bid Now
      </button>
      
       
        </>
      ), },

      // {
      //   Header: "Bid Details",
      //   Cell: ({ row }) =>
      //     // <button className="btn btn-accent" onClick={()=>handleBidDetails(row.original.id) }>Bid Details</button>

      //     row.original.totalBids !== 0 ? (
      //       <a
      //         className={`${Tablebutton.data} bg-blue-500`}
      //         href={`/bid-details/${row.original.id}`}
      //         target="_blank"
      //         rel="noopener noreferrer"
      //       >
      //         {row.original.totalBids}
      //       </a>
      //     ) : (
      //       "0"
      //     ),
      // },
      {
        Header: "About Bid",
        Cell: ({ row }) =>
          row.original.totalBids !== 0 ? (
            <button
              className={`${Tablebutton.data} bg-teal-500`}
              onClick={() => handleAboutBid(row.original)}
            >
              About Bid
            </button>
          ) : (
            "No Bids"
          ),
      },
      {
        Header: `Bid sheet  (Before auction)`,
        Cell: ({ row }) => (
          <button
            className={`${Tablebutton?.data} bg-blue-500`}
            onClick={() => handleBidSheet(row.original)}
          >
            BidSheet
          </button>
        ),
        
      },

      // {
      //     Header:"Have Image?",
      //     Cell:({row})=>(
      //       row.original.frontImage.startsWith("http")?"Yes":"No"
      //     )
      // },

      {
        Header: "Vehicle",
        Cell: ({ row }) => (
          <button className="btn btn-error" onClick={() => handleDelete(row.original.id,row.original.totalBids)}>Restore</button>
        )
      }
    ],
    [userId]
  );

  useEffect(() => {
    refetch();
  }, [vehicleSub, bidSub]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
          {bidOpen
      && <BidModal item={rowData} event={data?.event} IsCompleted={true} bidOpen={setBidOpen} bidSubs={bidSub}/>}
    <div className="flex flex-col">
      <div className="mb-2">
        <div className="flex flex-col items-center">
          <div className="text-center font-extrabold my-5 text-lg min-w-full">
            Vehicle Data Table of Event No {data?.event?.eventNo}
          </div>
          <div className=" font-bold ">
            Seller Name: {data?.event?.seller?.name}
          </div>
        </div>
        <div className="flex justify-end px-28">
          <div className="min-w-fit">
            {data?.event?.endDate > new Date().toISOString() && (
              <a
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-300 inline-flex items-center"
                href={`/add-vehicle/${id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                +
                <FontAwesomeIcon icon={faCar} className="ml-2" />
              </a>
            )}
           <button
  className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 ml-2 flex items-center gap-2 ${!downlod ? 'cursor-not-allowed opacity-50' : ''}`}
  onClick={() => handleBidSheets(data?.event?.vehiclesLive)}
  disabled={!downlod} // Disable button when downloading
>
  {downlod ? (
    <span>Download All Bid Sheets</span>
  ) : (
    <>
      <FaSpinner className="animate-spin" /> {/* Show spinner icon */}
      <span>Downloading...</span>
    </>
  )}
</button>
          </div>

        </div>
        
        <div className=" grid-cols-2 grid">
            {data?.event?.endDate > new Date().toISOString() && (
              <a
                className="btn btn-accent text-xl"
                href={`/add-vehicle/${id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                + <FontAwesomeIcon icon={faCar} />
              </a>
            )}
            {data?.event?.eventCategory === "online" && (
              <div className="space-y-1">
                <button
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-green-500 transition-colors duration-300"
                  onClick={() => setEnable(true)}
                >
                  Update end time
                </button>
              </div>
            )}
            
          </div>
        
      </div>

     
      <TableComponent
        data={data?.deletedVehicles||[]}
        columns={columns}
        sortBy="lotNumber"
        order={true}
      />
    </div>
    </>
  );
};

export default DeletedVehicleTable;
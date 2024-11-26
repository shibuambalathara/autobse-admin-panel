
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiAuctionFill } from "react-icons/ri";
import {
  // useBidDetailsPerbidVehicleQuery,
useBidDetailsQuery
  // useDeleteBidMutation,
  // useDeletedBiddataMutation,
} from "../../utils/graphql";
import { DownloadBidHistory } from "./bidsheet";

import format from "date-fns/format";

import Swal from "sweetalert2";

import { ShowPopup } from "../alerts/popUps";

import TableComponent from "../utils/table";
import {  Tablebutton } from "../utils/style";
import { FaUserAlt } from "react-icons/fa";
import AutobseLoading from "../utils/autobseLoading";



const BidDetailsPerbidVehicleComponent = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { data, loading, error, refetch } = useBidDetailsQuery({
    variables: { where: { bidVehicleId:id } },
  });
  console.log(data ,'data');
  

  // const [deleteBid] = useDeleteBidMutation();
  // const [deletedbidData]=useDeletedBiddataMutation()
  const navigate = useNavigate();

//   const handleDeleteBid = async (data) => {
  
//     const response = await Swal.fire({
//       title: "Are you sure?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       cancelButtonText: "Cancel",
//     });
//     if (response.isConfirmed) {

      
//       const result = await deleteBid({ variables: { where: { id:data.id } } });
//       // store deleted bid data details
//       let store=await deletedbidData({variables:{data:{deletedbidbidVehicle:{connect:{id}},amount:data?.amount,user:{connect:{id:data?.user?.id}}}}})
//       // ---------------------

//       if (result?.data) {
       
//         await Swal.fire({
//           title: `  deleted Successfully`,
//           icon: "success",
//         });

//         // try {
//         //   const result = await deleteBid({ variables: { where: { id } } });
       
//         //   ShowPopup("Success!", `successfully Deleted!`, "success", 5000, true);
//         // } catch (err) {
      
//         // }
//       // }

//       refetch();
//     }
//   };
// }
  const handleUserDetails = (id) => {
    navigate(`/view-user/${id}`);
  };

  const handleReport = (bidVehicle) => {
    console.log("repp",bidVehicle);
    
      DownloadBidHistory(bidVehicle);
  };

  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "user.firstName" },
      { Header: "Last Name", accessor: "user.lastName" },
      { Header: "Mobile", accessor: "user.mobile" },
      // {
      //   Header: "Bid Time ",
      //   accessor: ({ createdAt }) => {
      //     return format(new Date(createdAt), `dd/MM/yy, HH:mm:ss`);
      //   },
      // },
      { Header: "Amount", accessor: "amount" },

      {
        Header: "Bidder",
        Cell: ({ row }) => (
          <button
          className={`${Tablebutton.data} bg-blue-600`}
            onClick={() => handleUserDetails(row.original.userId)}
          >
            <RiAuctionFill size={18}/>
          </button>
        ),
      },
      {
        Header: "Created By",
        Cell: ({ row }) => (
          <button
          className={`${Tablebutton.data} bg-blue-600`}
            onClick={() => handleUserDetails(row.original.userId)}
          >
           <FaUserAlt size={18}/>
          </button>
        ),
      },

      // {
      //   Header: "Delete Bid",
      //   Cell: ({ row }) => (
      //     <button
      //       className="btn btn-error"
      //       // onClick={() => handleDeleteBid(row.original)}
      //     >
      //       Delete{" "}
      //     </button>
      //   ),
      // },
    ],
    []
  );

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     refetch(); 
  //   }, 2000);
  
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);
 

  if (loading) return <AutobseLoading/>

 

  return (
    <div className="flex  flex-col w-full justify-around ">
      <div className=" flex flex-col w-full justify-center m-auto ">
        <div className="mb-2 px-20">
          <div className="text-center font-extrabold my-5 text-lg min-w-full">
            {" "}
            Bidder  Details of Lot No:
            <span className="text-red-500">
              {" "}
              {data?.Bids[0]?.bidVehicle?.lotNumber}
            </span>{" "}
            & Auction No:
            <span className="text-red-500">
              {data?.Bids[0]?.bidVehicle?.event?.eventNo}
            </span>{" "}
          </div>
          <div className="grid grid-cols-3 mx-2">
            <div>
              <h1>
                Reg. No :
                <span className="font-bold">
                  {" "}
                  {data?.Bids[0]?.bidVehicle?.registrationNumber}
                </span>
              </h1>
              {/* <h1>
                bidVehicle Event Status :
                <span className="font-bold">
                  {" "}
                  {data?.Bids[0]?.bidVehicle?.bidVehicleEventStatus}
                </span>
              </h1> */}
            </div>
           
            <div className="space-y-4">
              <h1>
                Bid Status :
                <span className="font-bold"> {data?.Bids[0]?.bidVehicle?.bidStatus}</span>
              </h1>
              <a
                className={`${Tablebutton.data }  bg-blue-500 hover:bg-blue-700  font-bold  rounded `}
                target="_blank"
                rel="noopener noreferrer"
                href={`/edit-Vehicle/${data?.Bids[0]?.bidVehicleId}`}
              >
                
                Change Status
              </a>
              <button
                  className={`${Tablebutton.data }  bg-green-500 hover:bg-green-700  font-bold  rounded ml-4 `}
                onClick={(e) => handleReport(data?.Bids[0]?.bidVehicle)}
              >
                Bid Sheet
              </button>
            </div>
            <div >Seller :<span className="font-bold">{data?.Bids[0]?.bidVehicle?.event?.seller?.name}</span></div>
          </div>
        </div>
        <TableComponent data={data?.Bids||[]} columns={columns} sortBy='amount' />
        {/* <Deletedbidtable bidVehicleId={id}/> */}
        
      </div>
    </div>
  );
};

export default BidDetailsPerbidVehicleComponent;

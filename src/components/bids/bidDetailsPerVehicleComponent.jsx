
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiAuctionFill } from "react-icons/ri";
import {
  // useBidDetailsPerbidVehicleQuery,
useBidDetailsQuery,
useDeleteBidMutation
  // useDeleteBidMutation,
  // useDeletedBiddataMutation,
} from "../../utils/graphql";
import { DownloadBidHistory } from "./bidsheet";

import format from "date-fns/format";

import Swal from "sweetalert2";



import TableComponent from "../utils/table";
import {  Tablebutton } from "../utils/style";
import { FaUserAlt } from "react-icons/fa";
import AutobseLoading from "../utils/autobseLoading";
import { ImBin2 } from "react-icons/im";




const BidDetailsPerbidVehicleComponent = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { data, loading, error, refetch } = useBidDetailsQuery({
    variables: { where: { bidVehicleId:id } },
  });
  console.log(data ,'data');
  

  const [deleteBid] = useDeleteBidMutation();
  // const [deletedbidData]=useDeletedBiddataMutation()
  const navigate = useNavigate();

  const handleDeleteBid = async (bidid,data) => {
  
    const response = await Swal.fire({
      title: "Are you sure you want to delete this bid?",
      html: `
        Bid details:<br>
        Bid amount: ${data.amount.toFixed(2)}<br>
        Bidder name: ${data?.user?.firstName} ${data?.user?.lastName || ''}<br>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: '#DD6B55', // Optional: Set confirm button color to red
      cancelButtonColor: '#aaa',     // Optional: Set cancel button color to gray
      confirmButtonText: "Delete Bid",
      cancelButtonText: "Cancel",
      customClass: {
        title: 'text-xl font-semibold',  // Tailwind classes for smaller title size
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary'
      }
    });
    
    
    if (response.isConfirmed) {

      
      const result = await deleteBid({ variables: { where: { id:bidid } } });
      // store deleted bid data details
      // let store =await deletedbidData({variables:{data:{deletedbidbidVehicle:{connect:{id}},amount:data?.amount,user:{connect:{id:data?.user?.id}}}}})
      // ---------------------

      if (result?.data) {
       
        await Swal.fire({
          title: `  deleted Successfully`,
          icon: "success",
        });

        // try {
        //   const result = await deleteBid({ variables: { where: { id } } });
       
        //   ShowPopup("Success!", `successfully Deleted!`, "success", 5000, true);
        // } catch (err) {
      
        // }
      // }

      refetch();
    }
  };
}
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
      {
        Header: "Created At",
        // sortType: "datetime",
        accessor: ({ createdAt }) => {
          return format(new Date(createdAt), `dd/MM/yy, HH:mm:ss`);
        },
      },
      {
        Header: "Updated At",
        // sortType: "datetime",
        accessor: ({ updatedAt }) => {
          return format(new Date(updatedAt), `dd/MM/yy, HH:mm:ss`);
        },
      },
      { Header: "Amount", accessor: "amount" },
      // { Header: "Created At",
      //    accessor: ({ createdAt }) => new Date(startDate),
      // sortType: "datetime",
      // Cell: ({ value }) => FormatDate(value), },
     

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
      {

        
        Header: "Delete Bid",
        Cell: ({ row }) => (
          <button  className={`${Tablebutton.data} bg-red-600`} onClick={() => handleDeleteBid(row.original.id,row.original)}>
          <ImBin2/>
        </button>
        )
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
        <div className="mb-2 pl-28  ">
          <div className="
          justify-center font-extrabold my-5 text-lg min-w-full flex gap-1">
           
            Bidder  Details of Lot No:
            <span className="text-red-500 ml-1">
              
              {data?.Bids[0]?.bidVehicle?.lotNumber}
            </span>
            & Auction No:
            <span className="text-red-500">
              {data?.Bids[0]?.bidVehicle?.event?.eventNo}
            </span>
          </div>
          <div className="grid grid-cols-4 mx-2 items-center">
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
           
            <div className="flex ">
              <h1>
                Bid Status :
                <span className="font-bold"> {data?.Bids[0]?.bidVehicle?.bidStatus}</span>
              </h1>
              
              {/* <button
                  className={`${Tablebutton.data }  bg-green-500 hover:bg-green-700  font-bold  rounded ml-4 `}
                onClick={(e) => handleReport(data?.Bids[0]?.bidVehicle)}
              >
                Bid Sheet
              </button> */}
            </div>
            <div >Seller :<span className="font-bold">{data?.Bids[0]?.bidVehicle?.event?.seller?.name}</span></div>

            <a
                className={`${Tablebutton.data }  bg-blue-500 hover:bg-blue-700  font-bold  rounded mt-2 w-fit `}
                target="_blank"
                rel="noopener noreferrer"
                href={`/edit-Vehicle/${data?.Bids[0]?.bidVehicleId}`}
              >
                
                Change Status
              </a>
          </div>
        </div>
        <TableComponent data={data?.Bids||[]} columns={columns} sortBy='amount' />
        {/* <Deletedbidtable bidVehicleId={id}/> */}
        
      </div>
    </div>
  );
};

export default BidDetailsPerbidVehicleComponent;


import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useBidDetailsPerVehicleQuery,
  useDeleteBidMutation,
  useDeletedBiddataMutation,
} from "../../utils/graphql";
import { DownloadBidHistory } from "./bidsheet";

import format from "date-fns/format";

import Swal from "sweetalert2";

import { ShowPopup } from "../alerts/popUps";

import TableComponent from "../utils/table";
import Deletedbidtable from "./deletedbidtable";


const BidDetailsPerVehicleComponent = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { data, loading, error, refetch } = useBidDetailsPerVehicleQuery({
    variables: { where: { id } },
  });

  const [deleteBid] = useDeleteBidMutation();
  const [deletedbidData]=useDeletedBiddataMutation()
  const navigate = useNavigate();

  const handleDeleteBid = async (data) => {
  
    const response = await Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (response.isConfirmed) {

      
      const result = await deleteBid({ variables: { where: { id:data.id } } });
      // store deleted bid data details
      let store=await deletedbidData({variables:{data:{deletedbidVehicle:{connect:{id}},amount:data?.amount,user:{connect:{id:data?.user?.id}}}}})
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

  const handleReport = (vehicle) => {
      DownloadBidHistory(vehicle);
  };

  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "user.firstName" },
      { Header: "Last Name", accessor: "user.lastName" },
      { Header: "Mobile", accessor: "user.mobile" },
      {
        Header: "Bid Time ",
        accessor: ({ createdAt }) => {
          return format(new Date(createdAt), `dd/MM/yy, HH:mm:ss`);
        },
      },
      { Header: "Amount", accessor: "amount" },

      {
        Header: "View User",
        Cell: ({ row }) => (
          <button
            className="btn btn-info"
            onClick={() => handleUserDetails(row.original.user.id)}
          >
            View User
          </button>
        ),
      },

      {
        Header: "Delete Bid",
        Cell: ({ row }) => (
          <button
            className="btn btn-error"
            onClick={() => handleDeleteBid(row.original)}
          >
            Delete{" "}
          </button>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch(); 
    }, 2000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);
 

  if (loading) return <p>Loading...</p>;

 

  return (
    <div className="flex  flex-col w-full justify-around ">
      <div className=" flex flex-col w-full justify-center m-auto ">
        <div className="mb-2">
          <div className="text-center font-extrabold my-5 text-lg min-w-full">
            {" "}
            Bidders Details of Lot No:
            <span className="text-red-500">
              {" "}
              {data?.vehicle?.vehicleIndexNo}
            </span>{" "}
            & Auction No:
            <span className="text-red-500">
              {data?.vehicle?.event?.eventNo}
            </span>{" "}
          </div>
          <div className="flex justify-between mx-2">
            <div>
              <h1>
                Reg. No :
                <span className="font-bold">
                  {" "}
                  {data?.vehicle?.registrationNumber}
                </span>
              </h1>
              <h1>
                Vehicle Event Status :
                <span className="font-bold">
                  {" "}
                  {data?.vehicle?.vehicleEventStatus}
                </span>
              </h1>
            </div>
            <div >Seller :<span className="font-bold">{data?.vehicle?.event?.seller?.name}</span></div>
            <div className="space-y-2">
              <h1>
                Bid Status :
                <span className="font-bold"> {data?.vehicle?.bidStatus}</span>
              </h1>
              <a
                className="btn bg-sky-600"
                target="_blank"
                rel="noopener noreferrer"
                href={`/edit-vehicle/${data?.vehicle?.id}`}
              >
                {" "}
                Change Status
              </a>
              <button
                className="btn bg-pink-500"
                onClick={(e) => handleReport(data?.vehicle)}
              >
                Bid Sheet
              </button>
            </div>
          </div>
        </div>
        <TableComponent tableData={data?.vehicle?.userVehicleBids} columns={columns} sortBy='amount' />
        <Deletedbidtable vehicleId={id}/>
        
      </div>
    </div>
  );
};

export default BidDetailsPerVehicleComponent;

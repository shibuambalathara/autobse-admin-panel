import React, { useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faUserSlash, faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { EnterBid } from "./enterbid";
import { useCreateBidMutation } from "../../utils/graphql";

interface BidModalProps {
  item: {
    startPrice: number;
    reservePrice: number;
    quoteIncreament: number;
    userVehicleBidsCount?: number;
    myBidRank?: number;
    currentBidAmount: number;
  };
  event: any;
  IsCompleted: boolean;
  bidOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bidsub:any;
}

const BidModal: React.FC<BidModalProps> = ({ item, event, IsCompleted, bidOpen,bidsub }) => {
    console.log(item,"hh");
    
  const [callCreateBid] = useCreateBidMutation();
 
  const handleBidSubmission = useCallback(
    async (amount: number,mobile: string, vehicleId: string) => {
      try {
        await callCreateBid({
          variables: {
            bidVehicleId: vehicleId,
            createBidInput: { amount: Number(amount) },
            userUniqueInput: {
                mobile: mobile
              }
          },
        });
        Swal.fire("Success!", "Your bid has been submitted.", "success");
      } catch (e: any) {
        const errorMessage =
          e.response?.errors?.map((err: any) => err.message).join(", ") ||
          e.message ||
          "An error occurred. Please try again.";
        Swal.fire(errorMessage);
      }
    },
    [callCreateBid]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-11/12 md:w-1/3 p-4 relative">
        {/* Close Button */}
        <button
          onClick={() => bidOpen(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        
        {/* Bid Details Content */}
        <div className="px-4 py-2">
          <h2 className="text-base text-gray-900 text-center font-roboto font-bold">
            CREATE BID
          </h2>
          <div className="space-y-2 mt-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-roboto font-medium text-sm text-[#646464]">
                Start Price
              </span>
              <span className="font-bold text-base">{item?.startPrice?`₹ ${item?.startPrice}`:""}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-roboto font-medium text-sm text-[#646464]">
                Current Bid Amount
              </span>
              <span className="font-bold text-base">₹ {item?.currentBidAmount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-roboto font-medium text-sm text-[#646464]">
                Quote Increment
              </span>
              <span className="font-bold text-base">₹ {item?.quoteIncreament}</span>
            </div>
            
          </div>
        </div>
        
        {/* Enter Bid Section */}
        <div>
          {IsCompleted && (
            <EnterBid row={item} call={handleBidSubmission} event={event} bidSub={bidsub} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BidModal;

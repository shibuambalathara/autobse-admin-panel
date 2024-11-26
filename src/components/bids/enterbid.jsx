import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { labelStyle } from "../utils/style";
import { input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

export const EnterBid = ({ row, call, event,bidSub }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [bidAmount, setBidAmount] = useState("");
  const [mobile, setMobile] = useState("");
console.log(bidAmount);

  useEffect(() => {
    const calculateBidAmount = () => {
     
        if (row?.currentBidAmount) {
          return row.currentBidAmount + +row.quoteIncreament;
        } else {
          return row?.startPrice || row?.quoteIncreament;
        }
    
    };
    setBidAmount(calculateBidAmount().toString());
  }, [event?.bidLock, row,bidSub]);

  const onSubmit = () => {
    if (parseInt(bidAmount) === 0) {
      call(row.startPrice, mobile, row.id);
    } else if (
      event?.bidLock === "locked" &&
      row?.currentBidAmount >= parseInt(bidAmount)
    ) {
      Swal.fire({
        title: "Bid amount should be greater than last bid",
        confirmButtonText: "OK",
        icon: "warning",
        position: "center",
      });
    } else if (parseInt(bidAmount) % row.quoteIncreament !== 0) {
      Swal.fire({
        title: "Bid amount should be a multiple of quote increment.",
        confirmButtonText: "OK",
        icon: "warning",
        position: "center",
      });
    } else if (row.startPrice > parseInt(bidAmount)) {
      Swal.fire({
        title: "Bid amount should be greater than start price.",
        confirmButtonText: "OK",
        icon: "warning",
        position: "center",
      });
    } else if (parseInt(bidAmount) > 2147483647) {
      Swal.fire({
        title: "Bid amount exceeded the limit.",
        confirmButtonText: "OK",
        icon: "warning",
        position: "center",
      });
    } else {
      call(bidAmount, mobile, row.id);
    }
  };

  return (
    <div className="border rounded px-6 py-3">
      <label className={`${labelStyle.data} text-sm mt-2`} htmlFor="mobile">
        Mobile
      </label>
      <input
        {...register("mobile", {
          required: true,
          minLength: 10,
          maxLength: 10,
        })}
        id="mobile"
        className="w-full border border-gray-400 px-5 py-2 placeholder-gray-500 focus:outline-none rounded-md mb-2"
        placeholder="Enter mobile number"
        onChange={(e) => {
          setMobile(e.target.value.replace(/\D/g, ""));
        }}
      />
      {errors.mobile && <p className="text-red-500 text-sm">Invalid mobile number.</p>}

      <label className={`${labelStyle.data} text-sm mt-2`} htmlFor="amount">
        Amount
      </label>
      <input
        id="amount"
        className="w-full border border-gray-400 px-5 py-2 placeholder-gray-500 focus:outline-none rounded-md mb-2"
        placeholder="Enter amount"
        value={bidAmount}
        onChange={(e) => {
          
          setBidAmount(e.target.value.replace(/\D/g, ""));
        }}
      />
       {errors.mobile && <p className="text-red-500 text-sm">Please enter an amount</p>}


      <button
        type="button"
        className="mt-2 w-full flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        onClick={handleSubmit(onSubmit)}
      >
        Bid Now
      </button>
    </div>
  );
};

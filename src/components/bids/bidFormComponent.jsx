import React from 'react'
import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
const BidFormComponent = () => {
  return (
    <div className="max-w-7xl mx-auto h-fit  my-10 bg-slate-100 ">
    <div className="bg-slate-200 py-8 flex justify-center items-center">
      <h1 className="font-bold ">EDIT BID</h1>
    </div>

    <div className="bg-gray-0 max-w-6xl ml-5 h-full mx-auto mt-5">
      <form action="w-full">
        <div className="space-y-5">
          <div>
            <label htmlFor="">Amount</label>
            <Input className="max-w-[560px] border-gray-400 rounded mt-2 py-2 px-2 outline-none shadow text-gray-700  hover:bg-white " />
          </div>
          <div className="flex flex-col">
            <label className="t" htmlFor=" ">
              User{" "}
            </label>
            <select
              name=""
              id=""
              placeholder="select"
              className="w-full max-w-[560px] bg-slate-200  border border-gray-300 rounded mt-2 py-1 px-4 outline-none shadow text-gray-700  hover:bg-white "
            >
              {/* <option value="" selected placeholder="select">select </option> */}
              <option value="">Registration </option>
              <option value="">EMD</option>
              <option value="">Refund</option>
              <option value="">Other</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="t" htmlFor=" ">
              Bid Vehicle{" "}
            </label>
            <select
              name=""
              id=""
              placeholder="select"
              className="w-full max-w-[560px] bg-slate-200  border border-gray-300 rounded mt-2 py-1 px-4 outline-none shadow text-gray-700  hover:bg-white "
            >
              {/* <option value="" selected placeholder="select">select </option> */}
              <option value="">Registration </option>
              <option value="">EMD</option>
              <option value="">Refund</option>
              <option value="">Other</option>
            </select>
          </div>
          <div>
            <button className="btn btn-success mb-5">Create Bid</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}

export default BidFormComponent
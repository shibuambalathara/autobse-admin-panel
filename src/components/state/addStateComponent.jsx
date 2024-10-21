import React from "react";
import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

const AddStateComponent = () => {
  return (
    <div className="max-w-7xl mx-auto h-fit my-10 bg-slate-50">
      <div className="bg-slate-100 py-8 flex justify-center items-center">
        <h1 className="font-bold">ADD STATE</h1>
      </div>
      <div className="max-w-6xl mx-auto my-5 ">
        <form className="w-full" action="">
          <div className="space-y-5 w-full ">
            <div className="flex flex-col ">
              <label htmlFor="">Name</label>
              <Input className="max-w-[560px] border-gray-400 rounded mt-2 py-2 px-2 outline-none shadow text-gray-700  hover:bg-white " />
            </div>
            <div className="flex flex-col relative">
                <label htmlFor="">Users</label>
                <div class="absolute inset-y-12   right-[618px] flex items-center ">
                  <div class="h-5 w-1 border bg-gray-400 "></div>
                </div>
            <select
              name=""
              id=""
              placeholder="select"
              className="w-full max-w-[560px] flex flex-col bg-slate-200  border border-gray-300 rounded mt-2 py-1 px-4 outline-none shadow text-gray-700  hover:bg-white "
            >
              {/* <option value="" selected placeholder="select">select </option> */}
              <option value="">Registration </option>
              <option value="">EMD</option>
              <option value="">Refund</option>
              <option value="">Other</option>
            </select> 
            </div>
            <div>
                <button className="btn btn-success mb-5 hover:bg-green-400">create State</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStateComponent;

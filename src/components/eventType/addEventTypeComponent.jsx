import React from "react";
import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
const AddEventTypeComponent = () => {
  return (
    <div className="max-w-7xl mx-auto h-full my-10 bg-slate-100">
      <div className="bg-slate-200 py-8 flex justify-center items-center">
        <h1 className="font-bold">ADD EVENT TYPE</h1>
      </div>
      <div className="max-w-6xl mx-auto mt-5 bg-slate-100 ">
        <form action="w-full">
          <div className="space-y-5">
            <div>
              <label htmlFor="">Name</label>
              <Input className="max-w-[560px] border-gray-400 rounded mt-2 py-2 px-2 outline-none shadow text-gray-700  hover:bg-white " />
            </div>
            <div className="flex flex-col relative">
              <label className="t" htmlFor=" ">
                Users{" "}
              </label>
              <div class="absolute inset-y-12   right-[618px] flex items-center ">
                <div class="h-5 w-1 border bg-gray-400 "></div>
              </div>
              <select
                name=""
                id=""
                placeholder="select"
                className="w-full max-w-[560px] bg-slate-200  border border-gray-300 rounded mt-2 py-1 px-4 outline-none shadow text-gray-700  hover:bg-white "
              >
                <option value=""> </option>
              </select>
            </div>
            <div>
                <button>Create Event Type</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventTypeComponent;

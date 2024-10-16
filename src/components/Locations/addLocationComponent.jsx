import React,{useState} from "react";
import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useAddLocationMutation,useStatesQuery } from "../../utils/graphql";
import States from "../../pages/states";

const AddLocationComponent = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [createLocation,{loading,error}]=useAddLocationMutation()

  const states= useStatesQuery()

  


  const onSubmit = async (dataOnSubmit) => {
   

    const data={
      country:dataOnSubmit?.country,
      name:dataOnSubmit?.name,
       state:{connect:{id:dataOnSubmit?.state}}
      

    }

   
    try { 
      const result=await createLocation({variables:{data}})

    } catch (error) {
      
    }


    setSuccessMsg("User registration is successful.");
    reset();
  }

  return (
    <div className="max-w-6xl mx-auto h-fit  my-10 bg-slate-100 ">
      <div className="bg-slate-200 py-8 flex justify-center items-center">
        <h1 className="font-bold ">ADD LOCATION</h1>
      </div>

      <div className="bg-gray-0 max-w-6xl ml-5 h-full mx-auto mt-5">
        <form action="w-full" onSubmit={handleSubmit(onSubmit)} >
          <div className="space-y-5">
            <div>
              <label htmlFor="">City</label>
              <Input {...register("name", { required: true })} className="max-w-[560px] border-gray-400 rounded mt-2 py-2 px-2 outline-none shadow text-gray-700  hover:bg-white " />
              <p className="text-red-500">
                  {" "}
                  {errors.name && <span> Name is required</span>}
                </p>
            </div>
            <div>
              <label htmlFor="">Country</label>
              <Input {...register("country", { required: true })} className="max-w-[560px] border-gray-400 rounded mt-2 py-2 px-2 outline-none shadow text-gray-700  hover:bg-white " />
              <p className="text-red-500">
                  {" "}
                  {errors.country && <span>Country name is required</span>}
                </p>
            </div>
            <div className="flex flex-col relative">
              <label className="t" htmlFor=" ">
                State{" "}
              </label>
              <div className="absolute inset-y-12   right-[595px] flex items-center ">
                <div className="h-5 w-1 border bg-gray-400 "></div>
              </div>
              <select
              {...register("state",{required:true})}
               
                placeholder="select"
                className="w-full max-w-[560px] bg-slate-200  border border-gray-300 rounded mt-2 py-1 px-4 outline-none shadow text-gray-700  hover:bg-white "
              >
                <option value="">Select </option>
                {states?.data?.states.map((item)=>(
                <option key={item.name} value={item.id}>{item.name}
                 </option>))}
                
              </select>
              <p className="text-red-500"> {errors.state&& <span>State required</span>}</p>
            </div>
            {/* <div>
              <label htmlFor="">City</label>
              <Input {...register("name", { required: true })} className="max-w-[560px] border-gray-400 rounded mt-2 py-2 px-2 outline-none shadow text-gray-700  hover:bg-white " />
              <p className="text-red-500">
                  {" "}
                  {errors.name && <span> City is required</span>}
                </p>
            </div> */}

            <div>
              <button className="btn btn-success mb-5">Create Location</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationComponent;

import React, { useState } from 'react'
import { useForm } from "react-hook-form";
const SearchByNumber = ({inputData}) => {




  

    const {
        register,
        handleSubmit,
        watch,
        reset,
        getValues,
        setValue,
        formState: { errors },
      } = useForm(); 
    
  return (
    <div className=" ">
    <div>
    
        <div className="flex space-x-2">
          <div className="">
          <div className="   align-middle">
       <p className="my-auto">   Search By Mobile</p>
            <input
              placeholder=" Enter mobile Number"
              type="number"
              className="p-3  input input-bordered input-secondary w-64"
              {...register("mobile", {
                required: true,
                minLength: 10,
                maxLength: 10,
              })}
              onChange={(e) => {
                const value = e.target.value;
           
                if (value.length === 10) {
               setValue('mobile',(value))
                 inputData(parseInt(value))
                }
             
              }}
            />
      <p className="text-red-500">
              {" "}
              {errors.mobile  && <span>Please Enter 10 digits..</span>}
            </p>
          </div>
          </div>
        </div>
   
  
   
    </div>
  </div>
  )
}

export default SearchByNumber
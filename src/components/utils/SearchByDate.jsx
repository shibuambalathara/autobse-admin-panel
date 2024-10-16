import React, { useState } from 'react'
import { useForm } from "react-hook-form";

const SearchByDate = ({setDate}) => {
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
    <div className='flex justify-between'>
                
    <div className="  align-middle">
<p className="my-auto">   Search By Reg. Date</p>
    <input type='date'
  placeholder=" Enter mobile Number"

  className="p-3  input input-bordered input-secondary w-64"
  {...register("startDate", {
    required: true,
   
  })}
  onChange={(e) => {
      const value = e.target.value
      const date=new Date(value)
      const isoDate=date.toISOString()
      
   // setValue("startDate",(value));
 setDate(isoDate)
   
 
  }}
/>
     <p className="text-red-500">
    {" "}
    {errors.mobile && <span>Please Enter 10 digits</span>}
  </p>
  </div>

</div>
  )
}

export default SearchByDate
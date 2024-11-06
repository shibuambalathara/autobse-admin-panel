import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { filter, filterStyle } from './style';

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
    <div className={`${filter.div}`}>
        <h2 className={`${filter.h2}`}>Search By Reg </h2>
    <input type='date'


  className={`${filterStyle.data}`}
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
  )
}

export default SearchByDate
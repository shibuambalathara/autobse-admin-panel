import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { filter, filterStyle } from './style';

const SeachByRole = ({setRole,value}) => {
    const {
        register,
       
        setValue,
        formState: { errors },
      } = useForm();
  return (
  
 
 <div className={`${filter.div}`}>
        <h2 className={`${filter.h2}`}>Search By Role</h2>

         <select
    {...register("role", { required: true })}
    placeholder="select"
    className={`${filterStyle.data}`}
    value={value}
    onChange={(e) => {
      const value = e.target.value;
      setValue("role",value);
      setRole(value)
   
    }}
  >
    <option value="">Select Role </option>
  
  <option value="admin">Admin </option>
  <option value="staff">Staff </option>
  <option value="dealer">Dealer </option>
 
  </select>
    
   
    <div>
    </div>

</div>
  )
}

export default SeachByRole
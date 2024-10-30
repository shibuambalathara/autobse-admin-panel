import React from 'react';
import { useForm } from "react-hook-form";

const SearchByNumber = ({ inputData }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

  return (
   
      <div className='flex flex-col  w-64'>
        <h2 className=" font-semibold mb-1 text-sm  text-start">Search By Mobile</h2>
        <input
          placeholder="Enter mobile number"
          type="number"
          className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          {...register("mobile", {
            required: true,
            minLength: 10,
            maxLength: 10,
          })}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length === 10) {
              setValue('mobile', value);
              inputData(parseInt(value));
            }
          }}
        />
        {errors.mobile && (
          <p className="text-red-500 mt-2 text-center">Please enter 10 digits.</p>
        )}
      </div>
 
  );
};

export default SearchByNumber;

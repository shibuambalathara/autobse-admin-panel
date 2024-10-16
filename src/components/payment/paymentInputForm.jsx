import React, { useState } from "react";
import { usePaymentsSearchQuery } from "../../utils/graphql";
import { useForm } from "react-hook-form";
const PaymentInputForm = ({ onSubmit, inputType }) => {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div className="">
        {inputType !== "select" && (
          <div className="   align-middle">
            <p className="my-auto"> Select From Date:</p>
            <input
              type="date"
              className="p-3  input input-bordered input-secondary w-64"
              {...register("startDate", {
                required: true,
              })}
              onChange={(e) => {
                const value = e.target.value;
                const date = new Date(value);
                const isoDate = date.toISOString();

                setValue("startDate", value);
                // setDate(isoDate)
                onSubmit(isoDate);
              }}
            />
          </div>
        )}
        {inputType === "select" && (
          <div className="space-x-1 flex  align-middle">
            <p className="my-auto"> Search By Payment For :</p>
            <select
              {...register("paymentFor", {
                required: true,
              })}
              onChange={(e) => {
                const value = e.target.value;
                setValue("paymentFor", value);
                onSubmit(value);
              }}
              className="p-3 input input-bordered input-secondary w-64"
            >
              <option value="">Select</option>
              <option value="registrations">Registration</option>
              <option value="emd">EMD</option>
              <option value="refund">Refund</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default PaymentInputForm;

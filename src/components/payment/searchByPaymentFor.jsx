import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { usePaymentsSearchQuery } from '../../utils/graphql';
import { paymentsFor } from '../utils/constantValues';

const SeachByPaymentFor = ({Response}) => {
  
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
  const { data, loading } = usePaymentsSearchQuery({
    variables: { where: { paymentFor: { equals: selectedPaymentOption } } },
  });

 

if(selectedPaymentOption){

  Response(data?.payments)
}


    const {
        register,
     
        setValue,
        formState: { errors },
      } = useForm();

   

      const handlePaymentOptionChange = (selectedOption) => {
        setValue('paymentOption', selectedOption);
        setSelectedPaymentOption(selectedOption);
      };


  return (
    <div className='flex justify-between'>
    <div className='align-middle'>
      <p className='my-auto'>Select Payment Category</p>

      <select
        {...register('paymentOption', { required: true })}
        placeholder='select'
        className='input input-bordered input-secondary w-64 '
        onChange={(e) => handlePaymentOptionChange(e.target.value)}
      >
        {paymentsFor.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    <div></div>
  </div>
  )
}

export default SeachByPaymentFor
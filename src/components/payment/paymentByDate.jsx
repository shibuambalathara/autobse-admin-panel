import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { usePaymentDetailsQuery, usePaymentsSearchQuery } from '../../utils/graphql';
import TableComponent from '../utils/table';
import PaymentInputForm from './paymentInputForm';
import PaymentTable from './paymentTable';
import PaginationComponents from '../utils/pagination';
const PaymentByDate = ({Response}) => {
  const [startDate,setDate]=useState('0')
    const{data,loading}=usePaymentsSearchQuery({variables:{where:{createdAt:{gte:startDate}}}})


    const onDateChange =(dateOnSubmit) => {
      
setDate(dateOnSubmit)

    }
    if(loading)return<div>Loading.......</div>
    if(data){
   
      Response(data?.payments)
    }
  return (
   
      <div className='flex justify-between'>

        <PaymentInputForm onSubmit={onDateChange} />
        
    

  
     
            
    </div>
  )
}

export default PaymentByDate
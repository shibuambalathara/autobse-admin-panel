import React, { useState } from 'react'
import PaymentTableComponent from '../components/payment/allPayment'
import PaymentByDate from '../components/payment/paymentByDate'

import SeachByPaymentFor from '../components/payment/searchByPaymentFor';
import PaymentTable from '../components/payment/paymentTable';


const Payments = () => {
  const [paymentDataExists, setPaymentDataExists] = useState(false);
  const [response,setResponseData]=useState('')
  const handlePaymentData = (hasData:any) => {
    setPaymentDataExists(hasData);
  };
  const handleResponse=(res:any)=>{

setResponseData(res)
  }


  return (
     <div className=' w-full'>
        <div className="text-center font-extrabold my-5 text-lg">
         {" "}
         Payment Data Table{" "}
       </div>
    {/* 
   
    //   <div className='space-y-2'>
    //   <PaymentByDate onDataCheck={handlePaymentData}/>
    //   <PaymentBypaymentFor onDataCheck={handlePaymentData}/>
    //    {!paymentDataExists && <PaymentTableComponent/>}
    //    </div> */}
    
    <div className="flex my-2 justify-evenly  shadow-xl">
 {/* <SeachByPaymentFor Response={handleResponse}  />
 <PaymentByDate Response={handleResponse}/> */}
 </div>
 <div>
{response ==='' && <PaymentTableComponent/>}
{response && <PaymentTable data={response}/>}
 </div>
    
    </div>
  )
}

export default Payments
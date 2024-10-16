
import React, { useEffect, useMemo, useState } from "react";
import format from 'date-fns/format'
import { useNavigate,useParams } from "react-router-dom";
import { useTable,useSortBy, usePagination, useGlobalFilter } from "react-table";

import Swal from "sweetalert2";
import {   useEmdUpdatesPerPaymentQuery } from "../../utils/graphql";
import TableComponent from "../utils/table";


const EmdDetails = () => {
  const {id}=useParams()

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const { data, loading, error,refetch } =useEmdUpdatesPerPaymentQuery({variables:{ where: {payment:{id: {equals:id}}}}});
 // const [changeStatus]=useMutationTokenDetailMutation()



const handleMessage=(emdUpdates)=>{
 
  const {user,payment,vehicleBuyingLimitIncrement,}=emdUpdates
  const formatedDate=format(new Date(payment.coupenDetail[0].createdAt),`dd/MM/yy, HH:mm`)
  
  Swal.fire({
    html: `<div>
        <h1>Message From Team AutoBse</h1>
        
        <p>Dear: ${user.firstName} ${user.lastName},</p>
        <p>You have ${vehicleBuyingLimitIncrement} Buying Limit against the payment of Rs.${payment.amount}. Created at ${formatedDate}</p>
       
        <p>Coupons are ${payment.coupenDetail.map((coupen, index) => {
            return `<p>${index + 1}. ${coupen.coupenNumber}</p>`;
        }).join('')}</p>
        <p>For more details, please contact Team AutoBse.</p>
        <p>Thank you.</p>
      </div>`
});
}



  


  const columns = useMemo(
    () => [
      
      { Header: "Emd No", accessor: "emdNo",  className: 'w-1/3', },
       { Header: "vehicle BuyingLimit", accessor: "vehicleBuyingLimitIncrement" ,  className: 'w-1/3', },
  
      {
        Header: "Message",
        Cell: ({ row }) => (
           
             
               <button className="btn bg-teal-500" onClick={()=>handleMessage(row.original) }>Message to:{row.original?.user?.mobile}</button>
    
    
  
 
        )
      },
      {
        Header: "View Token status ",
        Cell: ({ row }) => (
    
          <a className="btn btn-primary w-24" href={`/coupenPerPayment/${row.original?.payment?.id}`} target="_blank" rel="noopener noreferrer">View status</a>
        ),
      },
     
    ],
    []
  );







  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;
  

  return (

    <div className="w-full   ">
    

      <div className=" max-w-7xl mx-auto h-fit">
        <div className=" flex flex-col justify-center m-auto w-full">
          <div className="mb-4">
            <div className="text-center font-extrabold my-1  text-2xl w-full">
              {" "}
              Emd of Amount {data?.emdUpdates[0]?.payment?.amount} of {data?.emdUpdates[0]?.user?.firstName} {data?.emdUpdates[0]?.user?.lastName} {" "}
            </div>
       
          </div>
          
          <TableComponent tableData={ data.emdUpdates} columns={columns}/>
        </div>
      </div>
    </div>
  );
};

export default EmdDetails;



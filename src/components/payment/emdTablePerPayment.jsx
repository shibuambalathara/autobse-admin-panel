


import React, { useMemo } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useEmdTableQuery, usePaymentDetailsQuery} from '../../utils/graphql'
import format from 'date-fns/format'
import TableComponent from '../utils/table'


const EmdTablePerPayment = () => {
const{id}=useParams()
    const {data,loading,error}=usePaymentDetailsQuery({variables:{where:{id}}})

   
    




    const columns = useMemo(
        () => [
          { Header: "Emd Number", accessor: "emdNo" },
          { Header: "Vehicle buying limit", accessor: "vehicleBuyingLimitIncrement" },
          { Header: "Created At ", accessor: ({createdAt})=>{return format(new Date( createdAt),`dd/MM/yy, HH:mm`)} },
         
          { Header: "Created By ", accessor:"createdBy.firstName"  },
         

         
  
          
          
        ],
        []
      );

    
 
    
   
    
      if (loading) return <p>Loading...</p>;
      

  return (
    <div className="flex  flex-col w-full justify-around ">

    
    <div className=" flex flex-col w-full justify-center m-auto ">
    <div className="mb-2">
  <div className="text-center font-extrabold my-5 text-lg min-w-full">  Emd Data Table Of Payment Ref No <span className='text-red-500'>{data?.payment?.refNo}</span>  </div>
  </div>
   
      <TableComponent tableData={data.payment?.emdUpdate} columns={columns}/>

  </div>
  </div>
  )
}

export default  EmdTablePerPayment 
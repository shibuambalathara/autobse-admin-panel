


import React, { useMemo } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useEmdTableQuery} from '../../utils/graphql'
import format from 'date-fns/format'
import TableComponent from '../utils/table'
import { Tablebutton } from '../utils/style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'


const EmdTablePerPayment = () => {
const{id}=useParams()
    const {data,loading,error}=useEmdTableQuery({variables:{where:{id}}})

   
    console.log(data);
    




    const columns = useMemo(
        () => [
          { Header: "Emd Number", accessor: "emdNo" },
          { Header: "Vehicle buying limit", accessor: "vehicleBuyingLimitIncrement" },
          { Header: "Created At ", accessor: ({createdAt})=>{return format(new Date( createdAt),`dd/MM/yy, HH:mm`)} },
         
          {
            Header: "Created By",
            Cell: ({ row }) => {
              return (
                <a
                  className={`${Tablebutton.data} bg-blue-500`}
                  href={`/view-user/${row.original?.createdById}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faUser} />
                </a>
              );
            }
          }
         

         
  
          
          
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
   
      <TableComponent data={data.payment?.emdUpdate} columns={columns}/>

  </div>
  </div>
  )
}

export default  EmdTablePerPayment 
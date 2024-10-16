import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useParticipantsQuery } from '../../utils/graphql'
import TabbleOfUsersOrUser from './tableData'


const UsersPerEvent = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
  
    const {id}=useParams()
    const {data,loading}=useParticipantsQuery({variables:{where:{id}, skip: currentPage * pageSize,take:pageSize,coupenDetailWhere2:{coupenStatus:{equals:"unclaimed"}}}})
    if(loading)return<div>Loading....</div>

  return (
    <div>
         <div className="text-center font-extrabold my-1  text-2xl w-full">
              {" "}
              Dealers List of Event No : {data?.event?.eventNo} {" "}
            </div>
         
        <TabbleOfUsersOrUser users={data?.event?.participants}/>
        <div className="flex justify-center">
            <div className="flex flex-col justify-between mt-4 ">
            <div className="flex justify-center">
          Page{' '}
              <strong>
            {currentPage + 1}
             {/* of {tableInstance.pageOptions.length} */}
         
          </strong>{' '}
        </div>
              <div className="space-x-2">
             
                {currentPage>0 ?  <button className="btn" onClick={(e)=>setCurrentPage(0)}>{" "}{"<<"}</button> :<button disabled></button>}

             {currentPage>0 ?  <button className="btn" onClick={(e)=>setCurrentPage(currentPage-1)}>{" "}{"<"}</button> :<button disabled></button>}
                <button className="btn" onClick={(e)=>setCurrentPage(currentPage+1)}>{" "}{">"}</button> 
         
         
              </div>
         
            </div>
          </div>
    </div>
  )
}

export default UsersPerEvent
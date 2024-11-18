import React, { useMemo } from 'react'
import { useEnquiriesQuery } from '../../utils/graphql'
import { pageHead, Tablebutton } from '../utils/style';

import TableComponent from '../utils/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const ViewEnqui = () => {
    const {data,refetch} = useEnquiriesQuery();    
    console.log("enquiry", data);


    const columns = useMemo(
      () => [
        { Header: "FirstName", accessor: "firstName" },
        {
          Header: "LastName", accessor: "lastName" 
         
        },
          {Header: "Mobile", accessor:"mobile" },

          {
            Header: "Message", accessor:"message" , className: "max-w"
          },
        //   {Header: "CreatedAt", accessor:"mobile"},
         {Header: "UpdatedAt", accessor:"updatedAt"},
         {Header: "State", accessor:"state"},
         {Header: "Status", accessor:"status"},

    
       ],
       []
    );
  



  return (
    
   <div className="w-full h-full">
      <div className="max-w-6xl mx-auto h-fit">
        <div className="flex flex-col justify-center m-auto w-full">
          <div className={pageHead.data}>
            ENQUIRIES
          </div>
          
          <TableComponent data={data?.Enquiries || []} columns={columns} />
        </div>
      </div>
    </div>
 
  )
}

export default ViewEnqui




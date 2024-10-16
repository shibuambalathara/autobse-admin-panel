
import React, { useMemo } from 'react'
import { useDeletedBidsperVehicleQuery } from '../../utils/graphql';
import TableComponent from '../utils/table';
import { useNavigate } from 'react-router-dom';
const Deletedbidtable = (props) => {
    const{data:deletedBids,refetch,loading}=useDeletedBidsperVehicleQuery({variables:{where:{deletedbidVehicle:{id:{equals:props?.vehicleId}}}}})
  
    const navigate=useNavigate()
    const handleUserDetails=(id)=>{
        navigate(`/view-user/${id}`)
      }
    const columns = useMemo(
        () => [
                { Header: "First Name", accessor: "user.firstName" },
                 { Header: "Last Name", accessor: "user.lastName" },
                 { Header: "Mobile", accessor: "user.mobile" },
            //   { Header: "Bid Time ", accessor: ({createdAt})=>{return format(new Date( createdAt),`dd/MM/yy, HH:mm:ss`)} },
          { Header: "Amount", accessor: "amount" },
          // {
          //   Header: "Amount",
          //   Cell: ({ row }) => (
          //     <button className="btn bg-green-400" onClick={()=>handleEditAmount(row.original.id) }>{row.original.amount}</button>

          //   )
          // },
          // {
          //   Header: " token",
          //   Cell: ({ row }) => (
          //     <button className="btn bg-pink-800" >{row.original.user.idNo}</button>

          //   )
          // },
          { Header: "Token", accessor: "user.idNo" },
                
          {
            Header: "View User",
            Cell: ({ row }) => (
              <button className="btn btn-info" onClick={()=>handleUserDetails(row.original.user.id) }>View User</button>
            )
          },
          

        //   {
        //     Header: "Delete Bid",
        //     Cell: ({ row }) => (
             
             
        //       <button className="btn btn-error" onClick={()=>handleDeleteBid(row.original) }>Delete </button>
           
        //     )
        //   },  
         
    
       
          
        ],
        []
      );

     
     
       
    
       
    
      if (loading) return <p>Loading...</p>;
      
      refetch()
  return (
    deletedBids?.deletedBids.length>0 &&
    <div  className='my-16'>
    <h1 className='text-center text-lg'>Deleted Bids</h1>
    <TableComponent tableData={deletedBids?.deletedBids} columns={columns} sortBy='amount'/>
   </div>

  )
}

export default Deletedbidtable
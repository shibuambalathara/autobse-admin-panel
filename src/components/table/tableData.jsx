

import React, { useMemo, } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import TableComponent from "../utils/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { FormatDate } from "../utils/dateFormat";
import { useEditUserMutation } from "../../utils/graphql";

const TabbleOfUsersOrUser = ({users,refetch}) => { 
  console.log("users",users)
  const location = useLocation();
  const currentPageStartWith = location.pathname
  const [updateUser ] = useEditUserMutation();

const handleMessage=(coupen)=>{
const {coupenDetail,firstName,lastName,   currentVehicleBuyingLimit }=coupen

  Swal.fire({
    html: `<div>
        <h1>Message From Team AutoBse</h1>
        
        <p>Dear: ${firstName} ${lastName},</p>
        <p>Thank you for partipating the auction</p>
        <p>You have ${currentVehicleBuyingLimit.vehicleBuyingLimit} Buying Limit </p>
       
        <p>Coupons are ${coupenDetail.map((coupen, index) => {
            return `<p>${index + 1}. ${coupen.coupenNumber}</p>`;
        }).join('')}</p>
        <p>For more details, please contact Team AutoBse.</p>
        <p>Thank you.</p>
      </div>`
});
}
const handleToken=async(id)=>{
console.log("id",id)
const { value: newToken } = await Swal.fire({
  title: "Enter Token Number",
  input: "number",
  inputLabel: "Token number",
 
  showCancelButton: true,
  inputValidator: (value) => {
    if (!value) {
      return "You need to write something!";
    }
  }
});
if (newToken) {
 
  updateUser({variables:{data:{tempToken:+newToken},where:{id}}}).then((res)=>{
     refetch()
    console.log("response",res)
   
    
  })
  .catch((err) => {
    console.log("errorrrr", err);
    Swal.fire({text:"Token Already exist",icon:'error'})
  }
  );
}
}

const handleDelete=async(id)=>{
  const response = await Swal.fire({
    title: "Are you sure?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });
  if (response.isConfirmed) {
    updateUser({variables:{data:{tempToken:null},where:{id}}}).then((res)=>{
      console.log(res)
      refetch()
    })
  }
}



  const columns = useMemo(
    () => [
      { Header: "User ID", accessor: "idNo" ,  className: 'w-1/3',  },
      { Header: "First Name", accessor: "firstName" ,  className: 'w-1/3', },
      { Header: "Last Name", accessor: "lastName" ,  className: 'w-1/3', },
      { Header: "Role", accessor: "role",  className: 'w-1/3', },
      { Header: "Mobile", accessor: "mobile",  className: 'w-1/3',   },
      { Header: "State", accessor: "state",  className: 'w-1/3',   },
      { Header: "Status", accessor: "status",  className: 'w-1/3',   },
      {
        Header: "Created At",
        accessor: ({ createdAt }) => new Date( createdAt),
        sortType: "datetime",
        Cell: ({ value }) => FormatDate(value),
      },

      {
        Header: "Active Bids ",
        Cell: ({ row }) => (
    
          row.original.activeBidsCount!==0 &&     <a className="btn btn-primary" href={`/bids-user/${row.original.id}`} target="_blank" rel="noopener noreferrer">{row.original.activeBidsCount}</a>
        ),
      },
       {
        Header: "Current Buying Limit",
        Cell: ({ row }) => (
          row.original.currentVehicleBuyingLimit.vehicleBuyingLimit!==0 &&     
           <a  className="btn btn-secondary" href={`/buying-limit/${row.original.id}`} target="_blank" rel="noopener noreferrer">{row.original.currentVehicleBuyingLimit.vehicleBuyingLimit}</a>
        ),
      },
      {
        Header: "Payment details",
        Cell: ({ row }) => (
     
  row.original.paymentsCount!==0 &&        <a className="btn  bg-rose-700 w-10" href={`/payment/${row.original.id}`} target="_blank" rel="noopener noreferrer"> {row.original.paymentsCount}</a>

        ),
      },
      {
        Header: "View Coupens",
        Cell: ({ row }) => (
     
          row.original.coupenDetailCount  &&   <a className="btn bg-red-500 w-16" href={`/coupenPerUser/${row.original.id}`} target="_blank" rel="noopener noreferrer">{row.original.coupenDetailCount}</a>

        ),
      },

   
      {
        Header: "Create Payment",
        Cell: ({ row }) => (
     
     <a className="btn bg-red-500 text-xl" href={`/create-payment/${row.original.id}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCreditCard} /></a>

        ),
      },
      {
        Header: "User Details",
        Cell: ({ row }) => (
      
          <a className=" btn btn-info text-xl" href={`/view-user/${row.original.id}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faUserPen} /></a>






        ),
      },
      {Header:'Token',
      Cell: ({ row }) => (
        <div className="flex">
       <button className="rounded-md p-1 text-white bg-green-700" onClick={() => handleToken(row.original?.id)}>CREATE/UPDATE</button>
{   row?.original?.tempToken &&   <button className="rounded-md p-1 text-red-500 " onClick={() => handleDelete(row.original?.id)}><FontAwesomeIcon icon={faTrash} /></button>
}       </div>
    )
    },
    {Header:'Token',accessor: "tempToken",  className: 'w-1/3',},
      
      ...(currentPageStartWith === '/users' ? [] : [  {
  Header: "Message",
  Cell: ({ row }) => (
    row?.original?.coupenDetail &&  <button className="btn bg-yellow-500" onClick={() => handleMessage(row.original)}>
      Message To {row.original.mobile}
    </button>
  )
     
}
])
    
    ],
    [users]
  );
  







  

  return (
    <div className="w-full    ">
    

      <div className=" max-w-7xl mx-auto h-fit">
        <div className=" flex flex-col justify-center m-auto w-full">
      
          {/* <div className="flex justify-end text-end space-x-2">
           <p className="font-bold">Count:<span>{users.length}</span></p><span className="text-red-500"> <button onClick={()=>ConvertToExcel(users)}> <FontAwesomeIcon icon={faFileArrowDown} size="xl"/></button></span>
         </div> */}
          <TableComponent tableData={users}  columns={columns} sortBy='idNo'/>
        </div>
      </div>
    </div>
  
  
  );
};

export default TabbleOfUsersOrUser;

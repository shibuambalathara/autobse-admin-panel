
import React, { useMemo, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteStateMutation,useStatesQuery, useUpdateStateMutation} from "../../utils/graphql";

import Swal from "sweetalert2";
import TableComponent from "../utils/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";


const ViewStates = () => {
 
  const navigate = useNavigate();
  const { data, loading, error,refetch } = useStatesQuery();
  console.log("state",data);
  
  const [updateState]=useUpdateStateMutation()
 
 
  // const handleRemoveState=async(stateId)=>{

  //   const result = await Swal.fire({
  //     title: 'Are you sure?',
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'Cancel',
  //   });

  //   if (result.isConfirmed) {
  //     const deleteResult = await deleteState({
  //       variables: { where: { id: stateId } },
  //     });
  
  //     if (deleteResult?.data?.deleteState?.id) {
  //       await Swal.fire({
  //         title: `The state ${deleteResult?.data?.deleteState?.name} deleted Successfully`,
  //         icon: 'success',
  //       });
       
  //       refetch()
  //     }
  //   }
  
  // }
  const handleEditState = async (state, id) => {
    const { value: input } = await Swal.fire({
      title: 'Enter State Name',
      html: '<input id="state" class="swal2-select"></input>',
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById('state').value];
      },
    });
  
    const newState = input[0];
  
    updateState({
      variables: { where: { id }, data: { name: newState } },
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'State Name Updated Successfully',
        });
        refetch();
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'State name Not Updated',
        });
      });
  };
  
 

  

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
    //  { Header: "Users", accessor:  (user) => user.users.map(user =><span className=" "> { user.firstName},</span>) },
      // { Header: "Locations", accessor:(location) => location.locations.map(location => location.name).join(', ') },
      {
        Header: "Edit State",
        Cell: ({ row }) => (
          <button className="btn bg-red-500 text-xl" onClick={() => handleEditState(row.original?.name,row.original?.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
        )
      },
      {
        Header: "View Users",
        Cell: ({ row }) => (
          <a  className="btn btn-secondary" href={`/ViewUsersByState/${row.original.id}`} target="_blank" rel="noopener noreferrer">View Users</a>
          )
      },
      // {
      //   Header: "Remove State",
      //   Cell: ({ row }) => (
      //     <button className="btn btn-error" onClick={() => handleRemoveState(row.original?.id)}>Remove</button>
      //   )
      // },
    ],
    []
  );


  

 


   
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;

  return (
    <div className="w-full  h-full ">
   
    <div className="  max-w-6xl mx-auto h-fit ">
      <div className="   flex flex-col justify-center m-auto w-full">
       
          <div className="text-center font-extrabold my-5 text-lg w-full">
            STATES{" "}
          </div>
       
       

   
        <TableComponent data={data?.States}columns={columns}/>
  
      </div>
    </div>
  </div>
  )
}

export default ViewStates
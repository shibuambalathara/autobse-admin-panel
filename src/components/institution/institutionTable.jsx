import React, { useMemo } from 'react'
import Swal from "sweetalert2";
import { useCreateInstitutionMutation, useDeleteInstitutionMutation, useInstitutionsQuery, useUpdateInstitutionMutation } from '../../utils/graphql';
import TableComponent from '../utils/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const InstitutionTable = () => {
const {data,refetch,loading}=useInstitutionsQuery()

const [addInstitution]=useCreateInstitutionMutation()
const [updateInstitution]=useUpdateInstitutionMutation()
const [deleteInstution]=useDeleteInstitutionMutation()

const columns=useMemo(
    () =>[
      { Header: "Name", accessor: "name" },
      {Header:'Edit',  Cell: ({ row }) => (<button onClick={()=>handleEditIntitution(row.original)} ><FontAwesomeIcon icon={faPenToSquare} /></button>)},
      {Header:'Delete',  Cell: ({ row }) => (<button onClick={()=>handleDeleteIntitution(row.original)} ><FontAwesomeIcon icon={faTrash}  /></button>)}

    ],[])

    const handleAddIntitution=async()=>{
        const {value:institution} = await Swal.fire({
            title: "Add Institution",
            icon: "info",
         
            input:'text',
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          });
          if (institution) {
        
            addInstitution({variables:{data:{name:institution}}})
            }
      
             refetch();
          }
          const handleEditIntitution=async(row)=>{
            
             const {value:institution} = await Swal.fire({
                 title: "Edit Institution",
                icon: "info",
             
                 input:'text',
                 inputValue:row.name,
                 showCancelButton: true,
                 confirmButtonText: "Yes",
                 cancelButtonText: "Cancel",
               });
               
              if (institution) {

                updateInstitution({variables:{where:{id:row?.id},data:{name:institution}}}).then(()=>{

                  refetch();
                })
                 }
          
              }
              const handleDeleteIntitution=async(row)=>{
               
                 const {value:institution} = await Swal.fire({
                     title: "Delete Institution",
                    icon: "question",
                 
                    text:`Do You want to Delete ${row.name} ?`,
                     
                     showCancelButton: true,
                     confirmButtonText: "Yes",
                     cancelButtonText: "Cancel",
                   });
                 
                  if (institution) {
    
                    deleteInstution({variables:{where:{id:row?.id}}}).then(()=>{

                      refetch();
                    })
                     }
              
                  }
    if(loading){return(<div>Loading...</div>)}
  return (
    <div className='w-full'>
        <div className='text-end m-5'>

        <button className='btn bg-red-500' onClick={()=>handleAddIntitution()}>Add Institution</button>
        </div>
        <div className="text-center font-extrabold my-5 text-lg min-w-full">  Institution  Table </div>


<TableComponent  tableData={data?.institutions} columns={columns} sortBy='listingId'/>
</div>

  )
}

export default InstitutionTable
import React, { useMemo } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useBidDetailsPerVehicleQuery, useDeleteBidMutation, useDeletedBiddataMutation, useDeletedBidsperVehicleQuery, useUpdateBidMutation,} from '../../utils/graphql'
import format from 'date-fns/format'

import Swal from "sweetalert2";

import { ShowPopup } from '../alerts/popUps';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import TableComponent from '../utils/table'





const ParticipantsList = (props) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
    const {id}=useParams()
    const {data,loading,error,refetch}=useBidDetailsPerVehicleQuery({variables:{where:{id:props?.vehicleId}}})
 
    const[changeToken]=useUpdateBidMutation()
   
    const [deleteBid]=useDeleteBidMutation()
    const [deletedbidData]=useDeletedBiddataMutation()
    const navigate=useNavigate()



    const handleDeleteBid=async(data)=>{
      const response = await Swal.fire({
        title: 'Are you sure?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
      });
      if (response.isConfirmed) {
        const result=await  deleteBid({variables:{where:{id:data?.id}}})
        // store deleted bid data details
       let store=await deletedbidData({variables:{data:{deletedbidVehicle:{connect:{id:props?.vehicleId}},amount:data?.amount,user:{connect:{id:data?.user?.id}}}}})
      // ---------------------

        if (result?.data) {
         
          await Swal.fire({
            title: `  deleted Successfully`,
            icon: 'success',
          });
       

      try{

        const result=await deleteBid({variables:{where:{id}}})
        
        ShowPopup("Success!", `successfully Deleted!`,"success", 5000, true);
      }
      catch(err){
        alert(err)
      }

    }

   
     
      refetch()
    }
  }
    const handleUserDetails=(id)=>{
      navigate(`/view-user/${id}`)
    }


  //   const handleReport=(report)=>{
   
  //   const arr=[]
  //   arr.push(report)
  //  const take =arr.map((element)=>({
  //    Auction_No:element.event.eventNo,
  //    Lot_no:element.vehicleIndexNo,
  //    RegistrationNumber:element.registrationNumber,
  //   }))
  

  
  //      report=report?.userVehicleBids.map((element)=>({
        
  //      Bidder_First_Name:element.user.firstName,
  //       Last_Name:element.user.lastName,
  //       Mobile:element.user.mobile,
  //       Amount:element.amount,
  //       Bid_Time:format(new Date (element.createdAt),`dd/MM/yy, HH:mm:ss`)
       
  //     }))
  //     report.sort(function(a, b) {
  //       return b.Amount - a.Amount;
  //     });
     
  //     const combined=[...take,...report]
  //     const convertToExcel = (jsonToExcel) => {
  //       const worksheet = XLSX.utils.json_to_sheet(combined);
  //       const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        
  //       const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //       const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  //       FileSaver.saveAs(excelData, `Bid-Report of Lot No: ${data?.vehicle?.vehicleIndexNo}.xlsx`);
  //     }
      
     
  //     convertToExcel();
   
  //    }
     const handleEditBid=async(id)=>{
      
    const {value:text }=  await Swal.fire({
        input: 'text',
        inputLabel: 'Change  Token',
        inputPlaceholder: 'Enter the Token',
       
      })
      if(text  ){
  
   changeToken({variables:{data: {user:{connect:{tempToken:+text}},bidVehicle:{connect:{id:props?.vehicleId}}},where:{id}}}).then((resolve)=>{
Swal.fire({icon:'success',
  title:'successfully Updated'})
   })
   .catch((err)=>{
    alert(err)
    Swal.fire({title:'Something went wrong'})
   })
  
   
      
        
      }

      
     }

     const handleEditAmount=async(id)=>{
      alert(id)
      const {value:text }=  await Swal.fire({
          input: 'text',
          inputLabel: 'Change Amount',
          inputPlaceholder: 'Enter the Amount',
         
        })
        if(text  ){
    
     changeToken({variables:{data: {amount:+text,bidVehicle:{connect:{id:props?.vehicleId}}},where:{id}}}).then((resolve)=>{
  Swal.fire({icon:'success',
    title:'successfully Updated'})
     })
     .catch((err)=>{
      
      Swal.fire({title:'Something went wrong'})
     })
    
     
        
          
        }
  
        
       }


    const columns = useMemo(
        () => [
                { Header: "First Name", accessor: "user.firstName" },
                { Header: "Last Name", accessor: "user.lastName" },
                { Header: "Mobile", accessor: "user.mobile" },
              { Header: "Bid Time ", accessor: ({createdAt})=>{return format(new Date( createdAt),`dd/MM/yy, HH:mm:ss`)} },
          { Header: "Amount", accessor: "amount" },
          // {
          //   Header: "Amount",
          //   Cell: ({ row }) => (
          //     <button className="btn bg-green-400" onClick={()=>handleEditAmount(row.original.id) }>{row.original.amount}</button>

          //   )
          // },
          {
            Header: "Change token",
            Cell: ({ row }) => (
              <button className="btn bg-pink-800" onClick={()=>handleEditBid(row.original.id) }>{row.original.user.tempToken}</button>

            )
          },
                
          {
            Header: "View User",
            Cell: ({ row }) => (
              <button className="btn btn-info" onClick={()=>handleUserDetails(row.original.user.id) }>View User</button>
            )
          },
          

          {
            Header: "Delete Bid",
            Cell: ({ row }) => (
             
             
              <button className="btn btn-error" onClick={()=>handleDeleteBid(row.original) }>Delete </button>
           
            )
          },  
         
    
       
          
        ],
        []
      );

     
     
       
    
       
    
      if (loading) return <p>Loading...</p>;
      
      refetch()
   
   
  return (



<TableComponent tableData={data?.vehicle?.userVehicleBids} columns={columns} sortBy='amount'/>


  )
}

export default  ParticipantsList 




import React, {  useEffect, useMemo,useState } from 'react'
import { useParams} from 'react-router-dom'
import {  useEventVehiclesQuery, useSubscriptionVehicleUpdatesSubscription} from '../../utils/graphql'
import format from 'date-fns/format'
import Swal from "sweetalert2";

import TableComponent from '../utils/table'
import {UpdateBidTime, UpdateEventEndTime} from './updateBidTime';
import { ConfirmationAlert, SweetalertSuccess } from '../utils/sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';




const VehicleDetailsPerEventComponent = () => {
   
    const{id}=useParams()
const vehicleSub = useSubscriptionVehicleUpdatesSubscription()
console.log(vehicleSub ,'subs');

    const [userId,setUserId]=useState('0')
    const [updateDate,setUpdateDate]=useState({date:null,id:null,updateItem:null})
    
    const {data,loading,error,refetch}=useEventVehiclesQuery({variables:{where:{id}}})
    console.log("data per event",data)
    // const[updateEventEndTime]=useUpdateEventMutation()
    // const [updateBidTime]=useUpdateVehicleMutation()
    // const [updateCoupen]=useUpdateCoupenMutation()
    const [enable,setEnable]=useState(false)
    
    
  //   const [DeleteVehicle]=useDeleteVehicleMutation();
  //   const {data:coupens} =useCoupensperUserQuery({variables:{  where: {
  //     userDetail: {
  //       id: {
  //         equals: userId
  //       },
      
  //     },
  //     coupenStatus:{equals:"unclaimed"}
  //   }
  // }})

// const handleChangeStartTime=async(update)=>{
//    const isodate=new Date(update).toISOString()
//   const result=await ConfirmationAlert()
//   if(updateDate?.updateItem==='startTime' && result?.isConfirmed)
//   {
//       updateBidTime({variables:{where:{id:updateDate?.id},data:{bidStartTime:isodate}}})
     
//     }
//     if(updateDate?.updateItem==='endtime' && result?.isConfirmed)
//     {
//         updateBidTime({variables:{where:{id:updateDate?.id},data:{bidTimeExpire:isodate}}})
       
//       }
//     refetch()
//     setUpdateDate({data:null,id:null,updateItem:null})
// }
const handleChangeEndTime=async(extendTime)=>{
  if (data?.event?.vehicles) {
 const splitted= extendTime.split(':')
 const hour=splitted[0]*60*60*1000
 const minute=splitted[1]*60*1000
 const clock=hour+minute
 const result=await ConfirmationAlert()

 if (result?.isConfirmed) {
   const response=await Swal.fire({input:'select',  inputOptions: {
    'increase': 'Increase',
    'decrease': 'Decrease',
     }, title:'Time Inrease / Decrease'})
    let updated
     const updatedVehicles = data?.event?.vehicles.map((vehicle) => {
       
  updated=     response?.value==='increase' ?      new Date( new Date (vehicle?.bidTimeExpire).getTime()+clock): new Date( new Date (vehicle?.bidTimeExpire).getTime()-clock)

      // updateBidTime({variables:{data:{bidTimeExpire:updated.toISOString()},where:{id:vehicle?.id}}})
     
        });
        //  updateEventEndTime({variables:{data:{endDate:updated},where:{id}}})
   }
  }
}



    const handleDelete=async(deleteVehicleId,bidCount)=>{
const result = await ConfirmationAlert()
// if (result.isConfirmed) {
//   if(bidCount!==0){
// alert("this vehicle have bid record ")
//   }
//   else{

//     // const deleteResult = await DeleteVehicle({variables:{where:{id:deleteVehicleId}}})
//     if (deleteResult?.data?.deleteVehicle?.id) {
    
//       SweetalertSuccess()
//     }
//     refetch()
//   }    
// }
    }
    const handleAboutBid=async(bidDetails)=>{
      
      const { currentBidUser, registrationNumber,currentBidAmount      } = bidDetails;
     
      Swal.fire({
        html: `<div>
            <h1>Current Top Bidder </h1>
            <p> Name: ${currentBidUser?.firstName} ${currentBidUser?.lastName} </p>
            <p>Vehicle Number:${registrationNumber}</p>
            <p>Bid Amount:${currentBidAmount
            }</p>

          </div>`

      })
    }
    const handleCoupen=async(bidDetails)=>{
      const { currentBidUser,id      } = bidDetails;
      setUserId(currentBidUser?.id)
      // if(coupens && userId===currentBidUser?.id){
      //   const { value: input } = await Swal.fire({
      //     title: 'Select Coupen',
      //     html:
      //     '<select id="coupenId" class="swal2-select">'+
      //     coupens?.coupens.map(coupen => `<option value="${coupen.id}">${coupen.coupenNumber}</option>`).join('') +
      //     '</select>',
           
            
       
      //     focusConfirm: false,
      //     preConfirm: () => {
      //       return [
            
      //         document.getElementById('coupenId').value
      //       ];
      //     }
      //   });
      //   const CoupenId=input[0]
       
      //   updateCoupen({variables:{where: {"id":CoupenId},
      //   data: {coupenStatus:"applied",vehicleDetail:{connect:{id}}}
      // }}).then(()=>{
      //   refetch()
      // })
      // }
    }
  
     
    
    const handleMessage=(vehicleDetails)=>{
      const {currentBidUser,registrationNumber,currentBidAmount,coupenDetail}=vehicleDetails
Swal.fire({
  html: `<div>
      <h1>Message From Team AutoBse </h1>
      
      <p>Dear: ${currentBidUser?.firstName} ${currentBidUser?.lastName},</p>
      <p>You have successfully Applied coupen:'${coupenDetail.coupenNumber}' for the Vehicle No '${registrationNumber}'
      (Bid Amount:${currentBidAmount}).Your current buying limit are ${currentBidUser.currentVehicleBuyingLimit.vehicleBuyingLimit} Vehicles. 
      </p>
      <p>For more Details Please contact Team AutoBse. </p>
      <p>Thank you.</p>
    </div>`

})
    }

    const columns = useMemo(
        () => [
          {Header:"Lot Number",accessor:"lotNumber"},
          { Header: "Vehicle ID", accessor: "vehicleIndexNo" },
          {
            Header: "Vehicle Details",accessor: "registrationNumber",
            Cell: ({ row }) => (
              <a className="btn bg-sky-500 w-24" href={`/edit-vehicle/${row.original.id}`} target="_blank" rel="noopener noreferrer">{row.original.registrationNumber}</a>

              )
          },
          { Header: "State", accessor: "state" },
         { Header: "City", accessor: "city" },
      
         { Header: "Vehicle Status", accessor: "vehicleEventStatus" },
         
          { Header: "Bid Status", accessor: "bidStatus" },
          { Header: "Bid Start Time", accessor: ({bidStartTime,id})=>{return <button onClick={()=>setUpdateDate({date: bidStartTime,id,updateItem:'startTime'})} className='btn bg-rose-500'> {format(new Date (bidStartTime),`dd/MM/yy,  HH:mm:ss`)}</button>}  },
          
           { Header: "Bid Time Expire", accessor: ({bidTimeExpire,id})=>{return <button onClick={()=>setUpdateDate({date: bidTimeExpire,id,updateItem:'endtime'})} className='btn bg-orange-500'>{format(new Date (bidTimeExpire),`dd/MM/yy,  HH:mm:ss`)}</button>   }},

        {
          Header: "Bid Details",
          Cell: ({ row }) => (
            // <button className="btn btn-accent" onClick={()=>handleBidDetails(row.original.id) }>Bid Details</button>
          
    row.original.totalBids !==0 ?        <a className="btn btn-primary" href={`/bid-details/${row.original.id}`} target="_blank" rel="noopener noreferrer"> view {row.original.totalBids}</a>:'0'
            )
        },
        {
          Header: "About Bid",
          Cell: ({ row }) => (
            row.original.totalBids !==0 ? <button className="btn bg-teal-500" onClick={() => handleAboutBid(row.original)}>About Bid</button>   :"No Bids"
            )
        },
         
      
          {
            Header: "Apply Coupen",
            Cell: ({ row }) => (
              row.original.totalBids !==0 ? ( row.original.coupenDetail ? <button onClick={()=>handleMessage(row.original)} className='btn bg-yellow-500'>Message to { row.original.currentBidUser.mobile}</button>   : <button className="btn bg-red-500" onClick={() => handleCoupen(row.original)}>Apply Coupen</button>):"0"
              )
          },
          // {
          //     Header:"Have Image?",
          //     Cell:({row})=>(
          //       row.original.frontImage.startsWith("http")?"Yes":"No"
          //     )
          // },
         
     
          // {
          //   Header: "Vehicle",
          //   Cell: ({ row }) => (
          //     <button className="btn btn-error" onClick={() => handleDelete(row.original.id,row.original.totalBids)}>Remove</button>
          //   )
          // }
          
        ],
        [userId]
      );

     
 
      useEffect(() => {
       
          refetch(); 
     
        
      }, [ vehicleSub]);
    
    
      if (loading) return <p>Loading...</p>;

  

  return (
    <div className="flex     ">

    
    <div className=" flex flex-col    ">
    <div className="mb-2 ">
  <div className="text-center font-extrabold my-5 text-lg min-w-full">  Vehicle Data Table of Event No {data?.event?.eventNo} </div>
  
   
     <div className='flex justify-between'>
    <div className='min-w-fit '>
    {/* <h1 >Event Status # <span className='font-bold'>{data?.event?.status}</span></h1>
    <h1 >No Of Vehicles # <span className='font-bold'>{data?.event?.vehiclesCount}</span></h1>
    <h1>Event Category # <span className='font-bold'>{data?.event?.eventCategory}</span></h1>
    <h1>Event End Date # <span className='font-bold'>{format(new Date (data?.event?.endDate),`dd/MM/yy,  HH:mm`)}</span></h1> */}
    
        </div>
    <div className='h-1 font-bold'>Seller Name :{data?.event?.seller?.name}</div>
      <div className='space-y-1'>
       {
   (data?.event?.endDate >new Date().toISOString())   &&
      <a className="btn btn-accent text-xl" href={`/add-vehicle/${id}`} target="_blank" rel="noopener noreferrer">+ <FontAwesomeIcon icon={faCar}  /></a>} 
{  data?.event?.eventCategory==='online' &&<div className='space-y-1'>
<div className='space-y-1'>
     <button className='w-full btn bg-red-500 hover:bg-green-500' onClick={()=>setEnable(true)}>Update end time</button>
     </div>
     <div>

{/* <button className='w-fit btn bg-red-500 hover:bg-green-500' onClick={()=>setEnable(true)}>Update start time</button> */}
     </div>
</div>}
      </div>
        </div>
    </div>
{/* {updateDate?.date &&<UpdateBidTime currentDate={updateDate?.date} handleChangeStartTime={handleChangeStartTime}/>} */}
{/* {enable && <UpdateEventEndTime handleChangeEndTime={handleChangeEndTime}/>} */}

      <TableComponent data={data?.event?.vehicles} columns={columns} sortBy='lotNumber' order={true}/> 

  </div>
  </div>
  )
}

export default  VehicleDetailsPerEventComponent 



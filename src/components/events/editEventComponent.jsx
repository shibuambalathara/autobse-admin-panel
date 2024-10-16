import React, { useState,useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { useForm,Controller } from "react-hook-form";
import Select from 'react-select'
import{useSellersItemQuery,useEventTypesQuery,useLocationsQuery,useEventQuery,useEditEventMutation}from '../../utils/graphql'
import {  useParams } from "react-router-dom";
import { ShowPopup } from '../alerts/popUps';
import { formStyle, headerStyle, inputStyle, labelAndInputDiv, pageStyle } from "../utils/style";

const EditEventComponent =() => {
const[startDatedata,setStartDate]=useState('')
const[isoStartDate,setIsoStartDate]=useState()


const[endDatedata,setEndDate]=useState('')
const[isoEndDatedata,setIsoEndDate]=useState('')

 const {id}=useParams()
 
 const sellersItem=useSellersItemQuery()
 const eventType=useEventTypesQuery()
 const location=useLocationsQuery()
 const [editEvent,response]=useEditEventMutation({variables:{where:{id}}})
 const {data,loading,error}=useEventQuery({variables:{where:{id}}})




useEffect(()=>{
  if(data?.event?.startDate){
    const dateObj = new Date(data?.event?.startDate);
const year = dateObj.getFullYear();
const month = String(dateObj.getMonth() + 1).padStart(2, '0');
const day = String(dateObj.getDate()).padStart(2, '0');
const hours = String(dateObj.getHours()).padStart(2, '0');
const minutes = String(dateObj.getMinutes()).padStart(2, '0');

const formattedString = `${year}-${month}-${day}T${hours}:${minutes}`;
setStartDate(formattedString)
setIsoStartDate(data?.event?.startDate)


}
if(data?.event?.endDate){
  const dateObj = new Date(data?.event?.endDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  
  const formattedString = `${year}-${month}-${day}T${hours}:${minutes}`;
  
  setEndDate(formattedString)
  setIsoEndDate(data?.event?.endDate)
}
},[data])

const handleStartDateToIso=(date)=>{

  setIsoStartDate( new Date(date).toISOString())
 
 }
 const handleEndDateToIso=(date)=>{
  
  setIsoEndDate( new Date(date).toISOString())
 
 }





  const { register, handleSubmit,control, watch, formState: { errors } } = useForm();
  
  const onSubmit =async dataOnSubmit =>{

    const eventData={
      eventCategory:dataOnSubmit?.eventCategory,  
      startDate:isoStartDate,
      endDate:isoEndDatedata,
      noOfBids:+dataOnSubmit?.noOfBids,
      seller:{connect:{id:dataOnSubmit?.sellerName ||""}},
     
      eventType: {
        set: dataOnSubmit?.eventId?.map((event) => ({id: event.value}))
      },
      location :{connect:{id:dataOnSubmit?.location ||""}},
      status:dataOnSubmit?.status,
      
      termsAndConditions:dataOnSubmit?.conditions,
      bidLock:dataOnSubmit?.lockedOrNot,
      isSpecialEvent:dataOnSubmit?.special,
      extraTimeTrigerIn:+dataOnSubmit?.timeTriger,
      extraTime:+dataOnSubmit?.extraTime,
      vehicleLiveTimeIn:+dataOnSubmit?.liveTime,
      gapInBetweenVehicles:+dataOnSubmit?.gap,
      
    }
    if (dataOnSubmit.downloadable[0] && dataOnSubmit.downloadable.length) {
      eventData["downloadableFile"] = { upload: dataOnSubmit.downloadable[0] };
    }
    try {
      const result= editEvent({variables:{data:eventData}})
      if(result){
       ShowPopup("Success!", `Event updated  successfully!`, "success", 5000, true);
      }
      
       
    
   
      } catch (error) {
       if(error){
         ShowPopup("Failed !", `${error.message}!`, "Error", 5000, true);


        }
      }
   
  





  }




 if(loading ||location.loading||sellersItem.loading|| eventType.loading) return<p>Loading........</p>
 if(error) {
  ShowPopup("Failed !", `${error.message}!`, "Error", 5000, true);
 }

  return (
    <div className={`${pageStyle.data}`}>
    <div className="space-y-1 ">
      <div className={`${headerStyle.data}`}>
        <h2 className="text-xl py-3 leading-3 font-bold text-gray-900">
    EDIT EVENT
        </h2>
      </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className={formStyle.data}>
              {response?.error?.message && <p className="text-red-500">{response?.error?.message}</p>}
            <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold" htmlFor="">
                  Event Category
                </label>
                <div class="absolute inset-y-10 - right-32 flex items-center ">
                  <div class="h-5 w-0.5 border bg-gray-400 "></div>
                </div>
                
                <select
                  value={data?.event?.eventCategory}
                  placeholder="select"
                   {...register("eventCategory",{})}
                   className={`${inputStyle.data}`}                >
              <option value={data?.event?.eventCategory}>{data?.event?.eventCategory}</option>
                  {/* <option value="online">Online  </option>
                  <option value="open">Open </option> */}
                </select>
                {/* <p className="text-red-500"> {errors.eventCategory&& <span>Event type required</span>}</p>  */}

              </div>
              <div className=" xl:flex space-x-2">
              <div className={`${labelAndInputDiv.data}`}>
                 <label className="font-bold" htmlFor="">Start Date and Time</label>
                <div className={`${labelAndInputDiv.data}`}>
               
                  <input
                    type="datetime-local"
                    className={`${inputStyle.data}`}  
                 defaultValue={startDatedata}  onChange={(event) => handleStartDateToIso(event.target.value)} 
                    //  {...register("startDate",{})}
                    disabled={data?.event?.vehiclesCount>0}
                  />
 <p className="text-red-500"> {errors.startDate&& <span>Start date and time required</span>}</p> 
                 
                </div>
              </div>
              <div className={`${labelAndInputDiv.data}`}>
                 <label className="font-bold" htmlFor="">End Date and Time</label>
                 <div className={`${labelAndInputDiv.data}`}>
                  <input
                    type="datetime-local"
                    className={`${inputStyle.data}`}  
                    placeholder="mm//dd/yy"
                    defaultValue={endDatedata}
                     onChange={(event) => handleEndDateToIso(event.target.value)}
                // {...register("endDate",{})}
                disabled={data?.event?.vehiclesCount>0}
                  />
               
                  
                   <p className="text-red-500"> {errors.endDate&& <span>End date and time required</span>}</p> 
                </div>
              </div>
</div>
            <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold" htmlFor="">
                  Seller
                </label>
                <div class="absolute inset-y-10 - right-32 flex items-center ">
                  <div class="h-5 w-0.5 border bg-gray-400 "></div>
                </div>
                <select
                  
                  placeholder="select"
                  {...register("sellerName",{})}
                  className={`${inputStyle.data}`}                >
                
                  <option  value={data?.event?.seller?.id}>{data?.event?.seller?.name}</option>
                  {sellersItem?.data?.sellers.map((seller)=>
                 (
                     <option key={seller.id} value={seller.id}>{seller.name}</option>
                 ) )}
                 
                </select>
                <p className="text-red-500"> {errors.sellerName&& <span>Seller Name required</span>}</p> 
              </div>
            <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold" htmlFor="">
                  Event Type
                </label>
            
                

                <Controller
  name="eventId"
  control={control}
  defaultValue={data?.event?.eventType?.map((event) => ({
    label: event.name,
    value: event.id
  }))}
  render={({ field }) => (
    <Select
    className={`${inputStyle.data}`}  
      options={eventType?.data?.eventTypes?.map((event) => ({
        label: event.name,
        value: event.id
      }))}
      {...field}
      isMulti
      getOptionValue={(option) => option.value}
    />
  )}
/>

               
               
                <p className="text-red-500"> {errors.eventId&& <span>Event Name required</span>}</p> 

              </div>
            <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold" htmlFor="">
                  Location
                </label>
                
                <select
                  defaultValue={data?.event?.location?.id}
                  placeholder="select"
                  {...register("location",{})}
                  className={`${inputStyle.data}`}                >
                     <option  value={data?.event?.location?.id}>{data?.event?.location?.name}</option>
                   {location?.data?.locations?.map((location)=>
                 (
                     <option key={location.id} value={location.id}>{location.name}</option>
                 ) )}
                </select>
                <p className="text-red-500"> {errors.location&& <span>location required</span>}</p> 

              </div>
             
             
              <div className={`${labelAndInputDiv.data}`}>
                 <label className="font-bold" htmlFor="">Number of Bids(per User)</label>
                <input
                  type="number"
                  {...register("noOfBids",{})}
                  defaultValue={data?.event?.noOfBids}
                  className={`${inputStyle.data}`}
                />
                 <p className="text-red-500"> {errors.noOfBids&& <span>No of bids Required</span>}</p> 
              </div>
            <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold" htmlFor="">
                 Auction status
                </label>
              
                <select
                  
                  placeholder="select"
                  {...register("status",{})}
                  className={`${inputStyle.data}`}                >
           <option  value={data?.event?.status}>{data?.event?.status}</option>
                  <option value="pending">pending </option>
                  <option value="blocked">blocked</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                  <option value="stop">stop</option>
                  <option value="pause">Pause</option>
                </select>
              </div>
          
             
               <div className="flex flex-col items-start  ">
             
             {data?.event?.downloadableFile?.url ?   <a href={`https://api.autobse.com${data?.event?.downloadableFile?.url}`}> <span className="text-red-500">Click here for down load the excel file</span></a>: <span className="text-red-500">Currently there is no excel file for download</span>}
                <label>Downloadable File</label>
                <input type="file"
                  {...register("downloadable",{})}
                  className={`${inputStyle.data}`}                  
                 />
              <p className="text-red-500"> {errors.downloadable&& <span>Downloadable file required</span>}</p> 
              </div>
             
          
             
              
            <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold" htmlFor="">
                Bid Amount Smaller than the Winning bid amount is
                </label>
                <div class="absolute inset-y-10 - right-32 flex items-center ">
             
                </div>
                <select
           
                  placeholder="select"
                  {...register("lockedOrNot",{})}
                  className={`${inputStyle.data}`}                >
                  {/* <option value="" selected placeholder="select">select </option> */}
                  <option  value={data?.event?.bidLock}>{data?.event?.bidLock}</option>
                  <option value="locked">locked </option>
                  <option value="unlocked">unlocked</option>
                </select>
              </div>
           
               <div className={`${labelAndInputDiv.data}`}>
                 <label className="font-bold" htmlFor="">Extra Time Trigger in Minutes</label>
                <input
                  type="number"
                  defaultValue={data?.event?.extraTimeTrigerIn}
                  {...register("timeTriger",{})}
                  className={`${inputStyle.data}`}
                />
              </div>
               <div className={`${labelAndInputDiv.data}`}>
                 <label className="font-bold" htmlFor="">Extra Time in minutes</label>
                <input
                  type="number"
                  defaultValue={data?.event?.extraTime}
                  {...register("extraTime",{})}
                  className={`${inputStyle.data}`}
                  disabled={data?.event?.vehiclesCount>0}
                />
              </div>
           {data?.event?.eventCategory==='open' &&    <div className={`${labelAndInputDiv.data}`}>
                 <label className="font-bold" htmlFor="">
                  Open Auction Vehicle Live Time in minutes
                </label>
                <input
                  type="number"
                  defaultValue={data?.event?.vehicleLiveTimeIn}
                  {...register("liveTime",{})}
                  className={`${inputStyle.data}`}
                  disabled={data?.event?.vehiclesCount>0}
                />
              </div>}
              <div className={`${labelAndInputDiv.data}`}>
                 <label className="font-bold" htmlFor="">
                {data?.event?.eventCategory==='open'?  'Open Auction Gap in between vehicles in seconds' : 'Online End Time Gap in Minuts'}
                </label>
                <input
                  type="number"
                  defaultValue={data?.event?.gapInBetweenVehicles}
                  {...register("gap",{})}
                  className={`${inputStyle.data}`}
                  disabled={data?.event?.vehiclesCount>0}
                />
              </div>


           

        
            </div>
            <div className={`${labelAndInputDiv.data}`}>
                 <label className="font-bold" htmlFor="">Terms & Condition</label>
               <textarea
               type="text" 
               defaultValue={data?.event?.termsAndConditions}
                 {...register("conditions",{})}
                 className={`${inputStyle.data} h-40`}
               />
              </div>
              <div className=" text-center my-5">
         <button  className="btn btn-success"> Save Changes </button>
                
               
              </div>
          </form>
       
        </div>
      </div>

  );
};

export default EditEventComponent;

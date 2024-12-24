import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { ShowPopup } from "../alerts/popUps";

import {
  useSellersQuery, 
useVehicleCategoriesQuery,
  useLocationsQuery,
  useCreateEventMutation,
} from "../../utils/graphql";
import { useNavigate } from "react-router-dom";
import { terms } from "./terms&conditions";
import { formStyle, h2Style, headerStyle, inputStyle, labelAndInputDiv, pageStyle, submit } from "../utils/style";
import { fileUploadService } from "../utils/restApi";
import { InputFields } from "../utils/formField";
import { auctionStatuses, eventCategories, eventLock } from "../utils/constantValues";

const AddEventComponent = () => {
  
  const navigate = useNavigate();
  const sellersItem = useSellersQuery();
  const eventType = useVehicleCategoriesQuery();
  console.log(eventType);
  
  const location = useLocationsQuery();
  const [addEvent, { data }] =  useCreateEventMutation();
  const [category, setCategory] = useState("online");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async(dataOnSubmit) => {
    // Convert the start and end date to ISO format
    const isoStartDate = new Date(dataOnSubmit?.startDate).toISOString();
    const isoEndDate = new Date(dataOnSubmit?.endDate).toISOString();
  
    // Convert certain form values to numbers as needed
    const noOfBids = +dataOnSubmit?.noOfBids;
    const extraTimeTrigger = +dataOnSubmit?.timeTriger;
    const extraTime = +dataOnSubmit?.extraTime;
    const gap = +dataOnSubmit?.gap;
    const liveTime = +dataOnSubmit?.liveTime;
  
    // Prepare the createEventInput object
    const createEventInput = {
      eventCategory: dataOnSubmit?.eventCategory, // "online" or "open" selected via state
      startDate: isoStartDate,
      endDate: isoEndDate,
      noOfBids: noOfBids,
      status: dataOnSubmit?.status,
      termsAndConditions: dataOnSubmit?.conditions,
      bidLock: dataOnSubmit?.lockedOrNot,
      isSpecialEvent: dataOnSubmit?.special,
      extraTimeTrigerIn: extraTimeTrigger,
      extraTime: extraTime,
      vehicleLiveTimeIn: liveTime,
      gapInBetweenVehicles: gap,
      // eventType: {
      //   connect: dataOnSubmit?.eventId?.map((event) => ({ id: event.value})),
      // },
     
    };
  
    const variables = {
      vehicleCategoryId: dataOnSubmit?.eventId || "", // Assuming it's part of form data
      locationId: dataOnSubmit?.location || "", // Assuming it's part of form data
      createEventInput: createEventInput,
      sellerId: dataOnSubmit?.sellerName || "",
    };
    try {
      
      const result= await addEvent({ variables })
      let id =result?.data?.createEvent?.id 
    console.log(result,"result");

    const file = dataOnSubmit?.downloadable[0];
    console.log(file,"file");
    if(file){
    const uploadUrl = `https://api-dev.autobse.com/api/v1/fileupload/vehicle_list_excel/${id}`;
   
  
    const additionalParams = {
      eventId: id, // Add other parameters as needed
    };
  
    const response = await fileUploadService({
      file,
      uploadUrl,
      additionalParams,
   
    });
  
    if (response.success) {
      ShowPopup(
        "Success!",
        ` Excel File Added successfully!`,
        "success",
        5000,
        true
      );
      navigate('/events');
    } else {
      ShowPopup("Failed!", `Document upload failed: ${response.error}`, "error", 8000, true);
    }

  }
   
      ShowPopup(
        "Success!",
        "Event Created Successfully! Upload Excel Now",
        "success",
        5000,
        true
      );
      
      // Navigate to excel upload page
      navigate(`/excel-upload/${id}`);
    }
    catch (error) {
      ShowPopup("Failed!", `${error.message}!`, "error", 5000, true);
    }
    // Make the API call using the create event mutation
    
     
  };
  

  const handleOnClick = () => {
    
    navigate(`/excel-upload/${data.createEvent.id}`);
  };

  return (
    <div className={`${pageStyle.data}`}>
      <div className="space-y-1 ">
        <div className={`${headerStyle.data}`}>
          <h2 className={`${h2Style.data}`}>
            ADD EVENT
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} >
        <div className={`${formStyle.data}`}>
        <InputFields
            label="Event Category"
            required
            register={register("eventCategory", { required: "Event Category  required"})}
            defaultValue={"online"}
            component="select"
            options={eventCategories}
            error={errors.eventCategory}
          />

          <InputFields
          required
            label="Start Date and Time"
            type="datetime-local"
            register={register("startDate", { required: "Start date  required"})}
           
            error={errors.startDate}
          />

          <InputFields
          required
            label="End Date and Time"
            type="datetime-local"
            register={register("endDate", { required: "End date  required"}) }
           
           
            error={errors.endDate}
            
          />



          <InputFields
          required
            label="Seller"
            register={register("sellerName", { required: "Seller  required"})}
           
            component="select"
            options={sellersItem?.data?.sellers?.map((seller) => ({
              label: seller.name,
              value: seller.id,
            }))}
            error={errors.sellerName}
          />

          <InputFields
            label="Vehicle category"
            required
            register={register("eventId", { required: "Vehicle category required" })}
           
            component="select"
            options={eventType?.data?.vehicleCategories?.map((event) => ({
              label: event.name,
              value: event.id,
            }))}
            error={errors.eventId}
          />

          <InputFields
            label="Location"
            register={register("location", { required: "Location required" })}
           required
            component="select"
            options={location?.data?.locations?.map((loc) => ({
              label: loc.name,
              value: loc.id,
            }))}
            error={errors.location}
          />

          <InputFields
            label="Number of Bids (per User)"
            type="number"
            register={register("noOfBids", {
              required: "Number of Bids (per User) required",
              onChange: (e)=>{
                const limit = 4
                e.target.value = e.target.value.replace(/[^0-9]/g,"")
                if (e.target.value.length > limit) {
                  e.target.value = e.target.value.slice(0, limit)
                }
              }
            })}
            defaultValue={10}
            error={errors.noOfBids}
            required
          />

          <InputFields
            label="Auction Status"
            register={register("status", { required: "Auction status required" })}
          required
          defaultValue={"active"}
            component="select"
            options={auctionStatuses}
            error={errors.status}
          />
           <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold">Downloadable File</label>
              <input
                type="file"
                 accept=".xlsx,.xls,.pdf"
                {...register("downloadable", {})}
                className={`${inputStyle.data}`}
              ></input>
              <p className="text-red-500">
                {" "}
                {errors.downloadable && <span>Downloadable file required</span>}
              </p>
            </div>

         
          <InputFields
            label="Bid Lock"
            register={register("lockedOrNot", { required: "Bid Lock is Required"})}
            defaultValue={"locked"}
            component="select"
            options={eventLock}
            error={errors.lockedOrNot}
          />

          <InputFields
            label="Time Trigger (in minutes)"
            
            type="number"
            register={register("timeTriger") }
            defaultValue={2}
            error={errors.timeTriger}
          />

          <InputFields
            label="Extra Time (in minutes)"
            type="number"
            register={register("extraTime")}
            defaultValue={2}
            error={errors.extraTime}
            
          />

          {/* <InputFields
            label="Live Time (in minutes)"
            type="number"
            register={register("liveTime")}
            defaultValue={data?.event?.vehicleLiveTimeIn}
            error={errors.liveTime}
          /> */}

          <InputFields
            label="Gap Between Vehicles (in minutes)"
            type="number"
            register={register("gap")}
            defaultValue={2}
            error={errors.gap}
            
          />
          <div className="col-span-3">
          <InputFields
            label="Terms and Conditions"
            register={register("conditions")}
            defaultValue={terms.data}
            component="textarea"
            error={errors.conditions}
          /> </div>
          </div>
          <div className="text-center m-5 ">
            {!data && <button className={submit.data}> Save </button>}
          </div>
        </form>
        {data && (
          <button onClick={handleOnClick} className={submit.data}>
            {" "}
            Upload Excel file{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddEventComponent;

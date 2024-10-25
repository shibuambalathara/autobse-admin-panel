import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import {
  useSellersQuery,
  useVehicleCategoriesQuery,
  useLocationsQuery,
  useSingleEventQuery,
  useUpdateEventMutation,
} from "../../utils/graphql";
import { useParams,useNavigate  } from "react-router-dom";
import { ShowPopup } from "../alerts/popUps";
import {
  formStyle,
  headerStyle,
  inputStyle,
  labelAndInputDiv,
  pageStyle,
  submit,

} from "../utils/style";
import { InputFields } from "../utils/formField";
import { auctionStatuses, eventCategories, eventLock } from "../utils/constantValues";
import { fileUploadService } from "../utils/restApi";

const EditEventComponent = () => {
  const [startDatedata, setStartDate] = useState("");
  const [isoStartDate, setIsoStartDate] = useState("");

  const [endDatedata, setEndDate] = useState("");
  const [isoEndDatedata, setIsoEndDate] = useState("");
  
  const [firstVehicleEndDate, setFirstVehicleEndDate] = useState("");
  const [pauseDate, setPauseDate] = useState("");
  const [pausedTotalTime, setPausedTotalTime] = useState("");

  const { id } = useParams();

  const sellersItem = useSellersQuery();
  const eventType = useVehicleCategoriesQuery();
  const location = useLocationsQuery();
  const [editEvent] = useUpdateEventMutation({ variables: { where: { id } } });
  const { data, loading, error } = useSingleEventQuery({ variables: { where: { id } } });
const navigate =useNavigate()
  useEffect(() => {
    if (data?.event) {
      const dateObjStart = new Date(data.event.startDate);
      setStartDate(dateObjStart.toISOString().slice(0, 16));
      setIsoStartDate(data.event.startDate);

      const dateObjEnd = new Date(data.event.endDate);
      setEndDate(dateObjEnd.toISOString().slice(0, 16));
      setIsoEndDate(data.event.endDate);
      
      // Set new fields if they exist
      setFirstVehicleEndDate(data.event.firstVehicleEndDate || "");
      setPauseDate(data.event.pauseDate || "");
      setPausedTotalTime(data.event.pausedTotalTime || "");
    }
  }, [data]);

  const handleStartDateToIso = (date) => setIsoStartDate(new Date(date).toISOString());
  const handleEndDateToIso = (date) => setIsoEndDate(new Date(date).toISOString());

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (dataOnSubmit) => {
    const eventData = {
      eventCategory: dataOnSubmit?.eventCategory,
      // startDate: isoStartDate,
      // endDate: isoEndDatedata,
      // firstVehicleEndDate: firstVehicleEndDate, // New field
      // pauseDate: pauseDate, // New field
      // pausedTotalTime: pausedTotalTime, // New field
      noOfBids: +dataOnSubmit?.noOfBids,
      sellerId: dataOnSubmit?.sellerName || "",
      vehicleCategoryId: dataOnSubmit?.eventId || "",
      locationId: dataOnSubmit?.location || "",
      status: dataOnSubmit?.status,
      termsAndConditions: dataOnSubmit?.conditions,
      bidLock: dataOnSubmit?.lockedOrNot,
      // extraTimeTrigerIn: +dataOnSubmit?.timeTriger,
      // extraTime: +dataOnSubmit?.extraTime,
      // // vehicleLiveTimeIn: +dataOnSubmit?.liveTime,
      // gapInBetweenVehicles: +dataOnSubmit?.gap,
    };

    try {
      const result = await editEvent({ variables: { updateEventInput: eventData } });
      if (result) {
        ShowPopup("Success!", "Event updated successfully!", "success", 5000, true);
      
      
        const file = dataOnSubmit?.downloadable[0];
        console.log(file,"file");
        
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
            `${dataOnSubmit?.uploadFileName} Excel File Added successfully!`,
            "success",
            5000,
            true
          );
          navigate('/events');
        } else {
          ShowPopup("Failed!", `Document upload failed: ${response.error}`, "error", 5000, true);
        }
  
      }

    } catch (error) {
      ShowPopup("Failed!", `${error.message}!`, "error", 5000, true);
    }
  };

  if (loading || location.loading || sellersItem.loading || eventType.loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    ShowPopup("Failed!", `${error.message}!`, "error", 5000, true);
  }

  return (
    <div className={`${pageStyle.data}`}>
      <div className="space-y-1">
        <div className={`${headerStyle.data}`}>
          <h2 className="text-xl py-3 leading-3 font-bold text-gray-900">EDIT EVENT</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={`${formStyle.data}`}>
          <InputFields
            label="Event Category"
            register={register("eventCategory")}
            defaultValue={data?.event?.eventCategory}
            component="select"
            options={eventCategories}
            error={errors.eventCategory}
          />

          <InputFields
            label="Start Date and Time"
            type="datetime-local"
            register={register("startDate")}
            defaultValue={startDatedata}
            onChange={(e) => handleStartDateToIso(e.target.value)}
            error={errors.startDate}
          />

          <InputFields
            label="End Date and Time"
            type="datetime-local"
            register={register("endDate")}
            defaultValue={endDatedata}
            onChange={(e) => handleEndDateToIso(e.target.value)}
            error={errors.endDate}
          />



          <InputFields
            label="Seller"
            register={register("sellerName", { required: true })}
            defaultValue={data?.event?.seller?.id}
            component="select"
            options={sellersItem?.data?.sellers?.map((seller) => ({
              label: seller.name,
              value: seller.id,
            }))}
            error={errors.sellerName}
          />

          <InputFields
            label="Vehicle category"
            register={register("eventId", { required: true })}
            defaultValue={data?.event?.vehicleCategoryId}
            component="select"
            options={eventType?.data?.vehicleCategories?.map((event) => ({
              label: event.name,
              value: event.id,
            }))}
            error={errors.eventId}
          />

          <InputFields
            label="Location"
            register={register("location", { required: true })}
            defaultValue={data?.event?.locationId}
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
            register={register("noOfBids", { required: true })}
            defaultValue={data?.event?.noOfBids}
            error={errors.noOfBids}
          />

          <InputFields
            label="Auction Status"
            register={register("status", { required: true })}
            defaultValue={data?.event?.status}
            component="select"
            options={auctionStatuses}
            error={errors.status}
          />
           <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold">Downloadable File</label>
              <input
                type="file"
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
            register={register("lockedOrNot", { required: true })}
            defaultValue={data?.event?.bidLock}
            component="select"
            options={eventLock}
            error={errors.lockedOrNot}
          />

          <InputFields
            label="Time Trigger (in minutes)"
            type="number"
            register={register("timeTriger")}
            defaultValue={data?.event?.extraTimeTrigerIn}
            error={errors.timeTriger}
          />

          <InputFields
            label="Extra Time (in minutes)"
            type="number"
            register={register("extraTime")}
            defaultValue={data?.event?.extraTime}
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
            defaultValue={data?.event?.gapInBetweenVehicles}
            error={errors.gap}
          />
          <div className="col-span-3">
          <InputFields
            label="Terms and Conditions"
            register={register("conditions")}
            defaultValue={data?.event?.termsAndConditions}
            component="textarea"
            error={errors.conditions}
          />
          </div>
 

          <button type="submit" className={`${submit.data} col-span-3 w-40 text-center`}>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditEventComponent;

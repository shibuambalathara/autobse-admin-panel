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
import { formStyle, h2Style, headerStyle, inputStyle, labelAndInputDiv, pageStyle } from "../utils/style";

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

  const onSubmit = (dataOnSubmit) => {
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
      eventCategory: category, // "online" or "open" selected via state
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
  
    // Include the downloadable file if present
    // if (dataOnSubmit.downloadable?.length) {
    //   createEventInput["downloadableFile"] = { upload: dataOnSubmit.downloadable[0] };
    // }
  
    // Prepare the variables for the mutation
    const variables = {
      vehicleCategoryId: dataOnSubmit?.eventId || "", // Assuming it's part of form data
      locationId: dataOnSubmit?.location || "", // Assuming it's part of form data
      createEventInput: createEventInput,
      sellerId: dataOnSubmit?.sellerName || "",
    };
  
    // Make the API call using the create event mutation
    addEvent({ variables })
      .then((result) => {
        // Show success popup if the event is created successfully
        ShowPopup(
          "Success!",
          "Event Created Successfully! Upload Excel Now",
          "success",
          5000,
          true
        );
        
        // Navigate to excel upload page
        navigate(`/excel-upload/${result?.data?.createEvent?.id}`);
      })
      .catch((error) => {
        // Show error popup in case of any issues
        ShowPopup("Failed!", error.message, "error", 5000, true);
      });
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

        <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyle.data}`}>
            <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold" htmlFor="">
                Event Category
              </label>
              <div></div>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                placeholder="select"
                //  {...register("eventCategory",{required:true})}
                className={`${inputStyle.data}`}
              >
                <option value="online">Online Auction </option>
                <option value="open">Open Auction</option>
              </select>
              <p className="text-red-500">
                {" "}
                {errors.eventCategory && <span>Event type required</span>}
              </p>
            </div>
            <div className=" xl:flex space-x-2">
              <div className={`${labelAndInputDiv.data}`}>
                <label htmlFor="" className="font-bold">
                  Start Date and Time
                </label>
                <div className={`${labelAndInputDiv.data}`}>
                  <input
                    type="datetime-local"
                    className={`${inputStyle.data}`}
                    {...register("startDate", { required: true })}
                  />
                  <p className="text-red-500">
                    {" "}
                    {errors.startDate && (
                      <span>Start date and time required</span>
                    )}
                  </p>
                </div>
              </div>
              <div className={`${labelAndInputDiv.data}`}>
                <label htmlFor="" className="font-bold">
                  End Date and Time
                </label>
                <div className={`${labelAndInputDiv.data}`}>
                  <input
                    type="datetime-local"
                    className={`${inputStyle.data}`}
                    placeholder="mm//dd/yy"
                    {...register("endDate", { required: true })}
                  />

                  <p className="text-red-500">
                    {" "}
                    {errors.endDate && <span>End date and time required</span>}
                  </p>
                </div>
              </div>
            </div>
            <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold" htmlFor="">
                Seller
              </label>

              <select
                placeholder="select"
                {...register("sellerName", { required: true })}
                className={`${inputStyle.data}`}
              >
                <option value="">Select</option>
                {sellersItem?.data?.sellers.map((seller) => (
                  <option key={seller.id} value={seller.id}>
                    {seller.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500">
                {" "}
                {errors.sellerName && <span>Seller Name required</span>}
              </p>
            </div>
            <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold" htmlFor="">
              Event Type
              </label>

              <select
                placeholder="select"
                {...register("eventId", { required: true })}
                className={`${inputStyle.data}`}
              >
                <option value="">Select</option>
                {eventType?.data?.vehicleCategories?.map((event) => (
                  <option key={event.name} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500">
                {" "}
                {errors.sellerName && <span>vehicleCategorie Name required</span>}
              </p>
            </div>
            {/* <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold" htmlFor="">
                Event Type
              </label>

              <Controller
                name="eventId"
                control={control}
                render={({ field }) => (
                  <Select
                    className={`${inputStyle.data}`}
                    options={eventType?.data?.vehicleCategories?.map((event) => ({
                      label: event.name,
                      value: event.id,
                    }))}
                    {...field}
                    isMulti
                    getOptionValue={(option) => option.value}
                  />
                )}
              />

              <p className="text-red-500">
                {" "}
                {errors.event && <span>Event Name required</span>}
              </p>
            </div> */}
            <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold" htmlFor="">
                Location
              </label>

              <select
                placeholder="select"
                {...register("location", { required: true })}
                className={`${inputStyle.data}`}
              >
                <option value="">Select</option>
                {location?.data?.locations?.map((location) => (
                  <option key={location.name} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500">
                {" "}
                {errors.location && <span>location required</span>}
              </p>
            </div>

            <div className="w-full ">
              <div>
                <label htmlFor="" className="font-bold">
                  Number of Bids(per User)
                </label>
              </div>
              <input
                type="number"
                defaultValue={10}
                {...register("noOfBids", { required: true })}
                className={`${inputStyle.data}`}             
                 />

              <p className="text-red-500">
                {" "}
                {errors.noOfBids && <span>No of bids Required</span>}
              </p>
            </div>
            <div className={`${labelAndInputDiv.data}`}>
              <label className="font-bold" htmlFor="">
                Auction status
              </label>

              <select
                placeholder="select"
                {...register("status", {})}
                className={`${inputStyle.data}`}
              >
                





                <option value="Active">Active</option>
                <option value="Pending">Pending </option>
                <option value="Blocked">Blocked</option>
                <option value="Inactive">Inactive</option>
                <option value="Stop">Stop</option>
                Pause
              </select>
            </div>

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

            {category === "online" && (
              <div className="flex flex-col  relative ">
                <label className="font-bold" htmlFor="">
                  Bids Amount Smaller than the Winning bid amount is
                </label>

                <select
                  placeholder="select"
                  {...register("lockedOrNot", {})}
                  className={`${inputStyle.data}`}
                >
                  {/* <option value="" selected placeholder="select">select </option> */}
                  <option value="Locked">Locked </option>
                  <option value="Unlocked">Unlocked</option>
                </select>
              </div>
            )}
            <div className={`${labelAndInputDiv.data}`}>
              <label htmlFor="" className="font-bold">
                Extra Time Trigger in Minutes
              </label>
              <input
                type="number"
                defaultValue={2}
                {...register("timeTriger", {})}
                className={`${inputStyle.data}`}
              />
            </div>
            <div className={`${labelAndInputDiv.data}`}>
              <div>
                <label htmlFor="" className="font-bold">
                  Extra Time in minutes
                </label>
              </div>
              <input
                type="number"
                defaultValue={2}
                {...register("extraTime", {})}
                className={`${inputStyle.data}`}
              />
            </div>

            {/* <div className="flex space-x-6">
                <input type="checkbox"   {...register("special",{})}
                 className="checkbox checkbox-success hover:bg-white" />
                <label htmlFor="">Is this a special event ?</label>
              </div> */}

            {category === "open" && (
              <div className="w-full max-w-xl">
                <label htmlFor="" className="font-bold">
                  Open Auction Vehicle Live Time in minutes
                </label>
                <input
                  type="number"
                  defaultValue={3}
                  {...register("liveTime", {})}
                  className={`${inputStyle.data}`}
                />
              </div>
            )}
            <div className={`${labelAndInputDiv.data}`}>
              <label htmlFor="" className="font-bold">
                {category === "open"
                  ? "Open Auction Gap in between vehicles in seconds"
                  : "Online End Time Gap in Minuts"}
              </label>
              <input
                type="number"
                defaultValue={2}
                {...register("gap", {})}
                className={`${inputStyle.data}`}
              />
            </div>
          </div>
          <div className={`${labelAndInputDiv.data}`}>
            <label htmlFor="" className="font-bold">
              Terms & Condition
            </label>
            <textarea
              type="text"
              defaultValue={terms.data}
              {...register("conditions", {})}
              className={`${inputStyle.data} h-40`}            />
          </div>
          <div className="text-center m-5 ">
            {!data && <button className="btn btn-success px-10"> Save </button>}
          </div>
        </form>
        {data && (
          <button onClick={handleOnClick} className="btn w-fit btn-secondary">
            {" "}
            Upload Excel file{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddEventComponent;

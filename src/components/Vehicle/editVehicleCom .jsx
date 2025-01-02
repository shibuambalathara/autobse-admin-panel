import {  useEffect, useState } from "react";
import  { FormFieldInput, ImageMaping, InputFields, } from "../utils/formField";
import ImageUpload from "../upload/imageUpload";

import { indianStates } from "../../utils/data";
import { formStyle, h2Style, headerStyle, pageStyle, submit } from "../utils/style";
import AutobseLoading from "../utils/autobseLoading";
import  { EditButton } from "../buttons/button";
import { bidStatusOptions } from "../utils/constantValues";
const fields = [
  { label: "Registration", name: "regNo", type: "text", required: true },
  { label: "Loan Agreement Number", name: "loanANum", type: "text", required: true },
  { label: "Registered Owner Name", name: "regOwnerName", type: "text" },
  { label: "Fuel", name: "fuel", type: "text" },
  { label: "Type", name: "type", type: "text" },
  { label: "RC Status", name: "rcStatus", type: "text" },
  { label: "Year Of Manufacture", name: "yearOfManuFacture", type: "text" },
  { label: "Ownership", name: "Ownership", type: "number" },
  { label: "Quote Increament", name: "quoteInc", type: "number" },
  { label: "Mileage", name: "mileage", type: "number" },
  { label: "KM Reading", name: "kmReading", type: "number" },
  { label: "Insurance Status", name: "insuranceStatus", type: "text" },
  { label: "Yard Location", name: "yardLocation", type: "text" },
  { label: "Start Price", name: "startPrice", type: "number" },
  { label: "Reserve Price", name: "reservePrice", type: "number" },
  { label: "Repo Date", name: "repoDate", type: "text" },
  { label: "Vehicle Location", name: "vehicleLocation", type: "text" },
  { label: "Vehicle Remarks", name: "vehicleRemarks", type: "text" },
  { label: "Auction Manager", name: "auctionManager", type: "text" },
  { label: "Approx Parking Charges", name: "approxParkingCharges", type: "number" },
  { label: "Insurance", name: "insurance", type: "text" },
  { label: "Insurance Valid Till", name: "insuranceValidDate", type: "text" },
  { label: "Tax", name: "tax", type: "text" },
  { label: "Tax Validity Date", name: "taxValidityDate", type: "text" },
  { label: "Fitness", name: "fitness", type: "text" },
  { label: "Permit", name: "permit", type: "text" },
  { label: "Engine No", name: "engineNumber", type: "text" },
  { label: "Chassis No", name: "chassisNo", type: "text" },
  { label: "Inspection Link", name: "inspectionLink", type: "text" },
  { label: "Autobse Contact", name: "autobseContact", type: "text" },
  { label: "Vehicle Condition", name: "vehicleCondition", type: "text" },
  { label: "Shape", name: "shape", type: "text" },
   { label: "Color", type: "text", name: "color", },
     { label: "City", type: "text", name: "city",}, 
{ label: "Area", type: "text", name: "area", },
 { label: "Payment Terms", type: "text", name: "paymentTerms" },
  { label: "Date of Registration", type: "text", name: "dateOfRegistration",  },
   { label: "Hypothication", type: "text", name: "hypothication", }, 
   { label: "Door Count", type: "number", name: "doorCount",  },
    { label: "Gear Box", type: "text", name: "gearBox", },
     { label: "Buyer Fees", type: "number", name: "buyerFees"}, 
     { label: "RTO Fine", type: "number", name: "rtoFine"},
      { label: "Client Contact Person", type: "text", name: "clientContactPerson"},
       { label: "Client Contact No", type: "text", name: "clientContactNo"  },
     { label: "Additional Remarks", type: "text", name: "AdditionalRemarks"}, 
     { label: "Lot Number", type: "number", name: "lotNumber" }, 
     { label: "Climate Control", type: "text", name: "climateControl" }, 
     { label: "Power Steering", type: "text", name: "powerSteering"},
]  
const EditVehicleComponent = ({data,loading,error,handleSubmit,onSubmit,register,errors,images,button,reset}) => {
  console.log(errors);
  
  const [isEditable, setIsEditable] = useState(false);
  // const [downloadUrls, setDownloadUrls] = useState([]);
 
  const handleEdit = () => {
    setIsEditable(!isEditable);
  };
 

  if (loading) return <AutobseLoading/>
  if (error) return <p>Error :</p>;

  return (
    <div className={pageStyle.data}>
    <div className={headerStyle.data}>
   
      <h2 className={`${h2Style.data} flex-1 justify-center flex pl-8`}>VEHICLE DETAILS</h2>
       <EditButton isEditable={isEditable} handleEdit={handleEdit}/>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className={formStyle.data}>
      
    <InputFields    error={errors.bidStatus} label="Bid Status"
             defaultValue={data?.vehicle?.bidStatus}
              register={register("bidStatus")}
              component="select"
              options={bidStatusOptions}
              disabled={!isEditable} />
    {fields.map((field) => (
      <FormFieldInput
        key={field.name}
        disabled={!isEditable}
        label={field.label}
        type={field.type}
        name={field.name}
        register={register}
        error={errors[field.name]}
        required={field.required}
      />
    ))}
        
          <InputFields    error={errors.state} label="State Name"
             defaultValue={data?.vehicle?.state}
              register={register("state")}
              component="select"
              options={indianStates}
              disabled={!isEditable} />
          
        
<ImageMaping images={images}/>
<div className="col-span-3">
  <p className="text-lg font-semibold mb-2">Image URLs:</p>
  <textarea
  disabled={!isEditable}
    defaultValue={formatTextAreaValue(data?.vehicle?.image)}
    {...register("images", {})}
     className="w-3/4 h-44 border border-gray-400 rounded-md p-2 shadow-md text-gray-700 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
</div>

        <div className=" col-span-3">

 <ImageUpload isEditable={isEditable}/>
 </div>
{isEditable&&
 <div className="text-center my-5 col-span-3">
              <button className={submit?.data}>{button}</button>
            </div>} 


        </form>
       
    
    </div>
  );
};

export default EditVehicleComponent;

export function formatTextAreaValue(text) {
  if (!text) return ""; 
  return text.replace(/,/g, ',\n');
}

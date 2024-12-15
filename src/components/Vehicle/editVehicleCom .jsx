import {  useState } from "react";
import  { FormFieldInput, ImageMaping, InputFields, } from "../utils/formField";
import ImageUpload from "../upload/imageUpload";

import { indianStates } from "../../utils/data";
import { formStyle, h2Style, headerStyle, pageStyle, submit } from "../utils/style";
import AutobseLoading from "../utils/autobseLoading";
import  { EditButton } from "../buttons/button";

const EditVehicleComponent = ({data,loading,error,handleSubmit,onSubmit,register,errors,images,button}) => {
  
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
        <FormFieldInput   disabled={!isEditable}  defaultValue={data?.vehicle?.registrationNumber} label="Registration" type="text" name="regNo" register={register} error={errors.regNo} required />
       
        <FormFieldInput   disabled={!isEditable} defaultValue={data?.vehicle?.loanAgreementNo} label="Loan Agreement Number" type="text" name="loanANum" register={register} error={errors.loanANum} required />
        <FormFieldInput   disabled={!isEditable} defaultValue={data?.vehicle?.registeredOwnerName} label="Registered Owner Name" type="text" name="regOwnerName" register={register} error={errors.regOwnerName} />

          <FormFieldInput   disabled={!isEditable} defaultValue={data?.vehicle?.fuel} label="Fuel" type="text" name="fuel" register={register} error={errors.fuel} />
          <FormFieldInput   disabled={!isEditable} defaultValue={data?.vehicle?.type}label="Type" type="text" name="type" register={register} error={errors.type} />
          
          <FormFieldInput   disabled={!isEditable} defaultValue={data?.vehicle?.rcStatus} label="RC Status" type="text" name="rcStatus" register={register} error={errors.rcStatus} />
          <FormFieldInput   disabled={!isEditable} defaultValue={data?.vehicle?.YOM} label="Year Of Manufacture" type="text" name="yearOfManuFacture" register={register} error={errors.yearOfManuFacture} />
          <FormFieldInput   disabled={!isEditable} defaultValue={data?.vehicle?.ownership} label="Ownership" type="number" name="Ownership" register={register} error={errors.Ownership} />
          <FormFieldInput   disabled={!isEditable} defaultValue={data?.vehicle?.quoteIncreament} label="QuoteIncreament" type="number" name="quoteInc" register={register} error={errors.Ownership} />
          <FormFieldInput   disabled={!isEditable} defaultValue={data?.vehicle?.mileage} label="Mileage" type="number" name="mileage" register={register} error={errors.mileage} />
          <FormFieldInput   disabled={!isEditable} defaultValue={data?.vehicle?.kmReading} label="KM Reading" type="number" name="kmReading" register={register} error={errors.kmReading} />
          <FormFieldInput   disabled={!isEditable} label="Insurance Status" type="text" name="insuranceStatus" register={register} error={errors.insuranceStatus} />
          
          <FormFieldInput   disabled={!isEditable} label="Yard Location" type="text" name="yardLocation" register={register} error={errors.yardLocation} />
          <FormFieldInput   disabled={!isEditable} label="Start Price" type="number" name="startPrice" register={register} error={errors.startPrice} />
          <FormFieldInput   disabled={!isEditable} label="Reserve Price" type="number" name="reservePrice" register={register} error={errors.reservePrice} />

          <FormFieldInput   disabled={!isEditable} label="Repo Date" type="text" name="repoDate" register={register} error={errors.repoDate} />
          <FormFieldInput   disabled={!isEditable} label="Vehicle Location" type="text" name="vehicleLocation" register={register} error={errors.vehicleLocation} />
          <FormFieldInput   disabled={!isEditable} label="Vehicle Remarks" type="text" name="vehicleRemarks" register={register} error={errors.vehicleRemarks} />
          
          <FormFieldInput   disabled={!isEditable} label="Auction Manager" type="text" name="autionManager" register={register} error={errors.autionManager} />
          <FormFieldInput   disabled={!isEditable} label="Approx Parking Charges" type="number" name="approxParkingCharges" register={register} error={errors.approxParkingCharges} />
          <FormFieldInput   disabled={!isEditable} label="Insurance" type="text" name="insurance" register={register} error={errors.insurance} />
          
          <FormFieldInput   disabled={!isEditable} label="Insurance Valid Till" type="text" name="insuranceValidDate" register={register} error={errors.insuranceValidDate} />
          <FormFieldInput   disabled={!isEditable} label="Tax" type="text" name="tax" register={register} error={errors.tax} />
          <FormFieldInput   disabled={!isEditable} label="Tax Validity Date" type="text" name="taxValidityDate" register={register} error={errors.taxValidityDate} />
          
          <FormFieldInput   disabled={!isEditable} label="Fitness" type="text" name="fitness" register={register} error={errors.fitness} />
          <FormFieldInput   disabled={!isEditable} label="Permit" type="text" name="permit" register={register} error={errors.permit} />
          <FormFieldInput   disabled={!isEditable} label="Engine No" type="text" name="engineNumber" register={register} error={errors.engineNumber} />
          
          <FormFieldInput   disabled={!isEditable} label="Chassis No" type="text" name="chassisNo" register={register} error={errors.chassisNo} />
          <FormFieldInput   disabled={!isEditable} label="Inspection Link" type="text" name="inspectionLink" register={register} error={errors.inspectionLink} />
          <FormFieldInput   disabled={!isEditable} label="Autobse Contact" type="text" name="autobseContact" register={register} error={errors.autobseContact} />
          
          <FormFieldInput   disabled={!isEditable} label="Vehicle Condition" type="text" name="vehicleCondition" register={register} error={errors.vehicleCondition} />
          
          <FormFieldInput   disabled={!isEditable} label="Shape" type="text" name="shape" register={register} error={errors.shape} />
          
          <FormFieldInput   disabled={!isEditable} label="Color" type="text" name="color" register={register} error={errors.color} />
          <FormFieldInput   disabled={!isEditable} label="City" type="text" name="city" register={register} error={errors.city} />
          <InputFields    error={errors.state} label="State Name"
             defaultValue={data?.vehicle?.state}
              register={register("state")}
              component="select"
              options={indianStates} />
          
          <FormFieldInput   disabled={!isEditable} label="Area" type="text" name="area" register={register} error={errors.area} />
          <FormFieldInput   disabled={!isEditable} label="Payment Terms" type="text" name="paymentTerms" register={register} error={errors.paymentTerms} />
          <FormFieldInput   disabled={!isEditable} label="Date of Registration" type="text" name="dateOfRegistration" register={register} error={errors.dateOfRegistration} />
          
          <FormFieldInput   disabled={!isEditable} label="Hypothication" type="text" name="hypothication" register={register} error={errors.hypothication} />
         
          <FormFieldInput   disabled={!isEditable} label="Door Count" type="number" name="doorCount" register={register} error={errors.doorCount} />
          
          <FormFieldInput   disabled={!isEditable} label="Gear Box" type="text" name="gearBox" register={register} error={errors.gearBox} />
          <FormFieldInput   disabled={!isEditable} label="Buyer Fees" type="number" name="buyerFees" register={register} error={errors.buyerFees} />
          <FormFieldInput   disabled={!isEditable} label="RTO Fine" type="number" name="rtoFine" register={register} error={errors.rtoFine} />
          
          <FormFieldInput   disabled={!isEditable} label="Client Contact Person" type="text" name="clientContactPerson" register={register} error={errors.clientContactPerson} />
          <FormFieldInput   disabled={!isEditable} label="Client Contact No" type="text" name="clientContactNo" register={register} error={errors.clientContactNo} />
          <FormFieldInput   disabled={!isEditable} label="Additional Remarks" type="text" name="AdditionalRemarks" register={register} error={errors.AdditionalRemarks} />

          <FormFieldInput   disabled={!isEditable} label="Lot Number" type="number" name="lotNumber" register={register} error={errors.lotNumber} />
          <FormFieldInput   disabled={!isEditable} label="Climate Control"  type="text" name="climateControl" register={register} error={errors.climateControl} />
          <FormFieldInput   disabled={!isEditable} label="Power Steering"  type="text" name="powerSteering" register={register} error={errors.powerSteering} />
       
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
 


 <div className="text-center my-5 col-span-3">
              <button className={submit?.data}>{button}</button>
            </div>
        </form>
       
    
    </div>
  );
};

export default EditVehicleComponent;

function formatTextAreaValue(text) {
  if (!text) return ""; 
  return text.replace(/,/g, ',\n');
}

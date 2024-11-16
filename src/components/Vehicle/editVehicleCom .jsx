import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { ShowPopup } from "../alerts/popUps";
import  { FormFieldInput, ImageMaping, StateInput } from "../utils/formField";
import ImageUpload from "../upload/imageUpload";
import { DateConvert } from "../utils/dateFormat";
import { indianStates } from "../../utils/data";
import { formStyle, h2Style, headerStyle, pageStyle, submit } from "../utils/style";

const EditVehicleComponent = ({data,loading,error,handleSubmit,onSubmit,register,errors,images}) => {
  

  // const [downloadUrls, setDownloadUrls] = useState([]);
 
 


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className={pageStyle.data}>
    <div className={headerStyle.data}>
      <h2 className={h2Style.data}>VEHICLE DETAILS</h2>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className={formStyle.data}>
        <FormFieldInput defaultValue={data?.vehicle?.registrationNumber} label="Registration" type="text" name="regNo" register={register} error={errors.regNo} required />
        {/* <div className="flex flex-col">
          <label htmlFor="">Bid Status</label>
          <select {...register("bidStatus", {})} className="w-full bg-slate-200 border border-gray-300 rounded mt-2 py-1 px-4 outline-none shadow text-gray-700 hover:bg-white">
            <option value={data?.vehicle?.bidStatus}>{data?.vehicle?.bidStatus}</option>
            <option value="pending">pending</option>
            <option value="approved">approved</option>
            <option value="fulfilled">fulfilled</option>
            <option value="declined">declined</option>
          </select>
        </div> */}
        <FormFieldInput defaultValue={data?.vehicle?.loanAgreementNo} label="Loan Agreement Number" type="text" name="loanANum" register={register} error={errors.loanANum} required />
        <FormFieldInput defaultValue={data?.vehicle?.registeredOwnerName} label="Registered Owner Name" type="text" name="regOwnerName" register={register} error={errors.regOwnerName} />
        {/* Add additional FormFieldInputs here for other fields */}
        {/* <CatInput options={category?.data?.vehicleCategories} label="Category" type="text" name="category" register={register} error={errors.category} /> */}

          <FormFieldInput defaultValue={data?.vehicle?.fuel} label="Fuel" type="text" name="fuel" register={register} error={errors.fuel} />
          <FormFieldInput defaultValue={data?.vehicle?.type}label="Type" type="text" name="type" register={register} error={errors.type} />
          
          <FormFieldInput defaultValue={data?.vehicle?.rcStatus} label="RC Status" type="text" name="rcStatus" register={register} error={errors.rcStatus} />
          <FormFieldInput defaultValue={data?.vehicle?.YOM} label="Year Of Manufacture" type="text" name="yearOfManuFacture" register={register} error={errors.yearOfManuFacture} />
          <FormFieldInput defaultValue={data?.vehicle?.ownership} label="Ownership" type="number" name="Ownership" register={register} error={errors.Ownership} />
          <FormFieldInput defaultValue={data?.vehicle?.quoteIncreament} label="QuoteIncreament" type="number" name="quoteInc" register={register} error={errors.Ownership} />
          <FormFieldInput defaultValue={data?.vehicle?.mileage} label="Mileage" type="number" name="mileage" register={register} error={errors.mileage} />
          <FormFieldInput defaultValue={data?.vehicle?.kmReading} label="KM Reading" type="number" name="kmReading" register={register} error={errors.kmReading} />
          <FormFieldInput label="Insurance Status" type="text" name="insuranceStatus" register={register} error={errors.insuranceStatus} />
          
          <FormFieldInput label="Yard Location" type="text" name="yardLocation" register={register} error={errors.yardLocation} />
          <FormFieldInput label="Start Price" type="number" name="startPrice" register={register} error={errors.startPrice} />
          <FormFieldInput label="Reserve Price" type="number" name="reservePrice" register={register} error={errors.reservePrice} />

          <FormFieldInput label="Repo Date" type="text" name="repoDate" register={register} error={errors.repoDate} />
          <FormFieldInput label="Vehicle Location" type="text" name="vehicleLocation" register={register} error={errors.vehicleLocation} />
          <FormFieldInput label="Vehicle Remarks" type="text" name="vehicleRemarks" register={register} error={errors.vehicleRemarks} />
          
          <FormFieldInput label="Auction Manager" type="text" name="autionManager" register={register} error={errors.autionManager} />
          <FormFieldInput label="Approx Parking Charges" type="number" name="approxParkingCharges" register={register} error={errors.approxParkingCharges} />
          <FormFieldInput label="Insurance" type="text" name="insurance" register={register} error={errors.insurance} />
          
          <FormFieldInput label="Insurance Valid Till" type="text" name="insuranceValidDate" register={register} error={errors.insuranceValidDate} />
          <FormFieldInput label="Tax" type="text" name="tax" register={register} error={errors.tax} />
          <FormFieldInput label="Tax Validity Date" type="text" name="taxValidityDate" register={register} error={errors.taxValidityDate} />
          
          <FormFieldInput label="Fitness" type="text" name="fitness" register={register} error={errors.fitness} />
          <FormFieldInput label="Permit" type="text" name="permit" register={register} error={errors.permit} />
          <FormFieldInput label="Engine No" type="text" name="engineNumber" register={register} error={errors.engineNumber} />
          
          <FormFieldInput label="Chassis No" type="text" name="chassisNo" register={register} error={errors.chassisNo} />
          <FormFieldInput label="Inspection Link" type="text" name="inspectionLink" register={register} error={errors.inspectionLink} />
          <FormFieldInput label="Autobse Contact" type="text" name="autobseContact" register={register} error={errors.autobseContact} />
          
          <FormFieldInput label="Vehicle Condition" type="text" name="vehicleCondition" register={register} error={errors.vehicleCondition} />
          
          <FormFieldInput label="Shape" type="text" name="shape" register={register} error={errors.shape} />
          
          <FormFieldInput label="Color" type="text" name="color" register={register} error={errors.color} />
          <FormFieldInput label="City" type="text" name="city" register={register} error={errors.city} />
          < StateInput options={indianStates} label="State" type="text" name="state" register={register} error={errors.state} />
          
          <FormFieldInput label="Area" type="text" name="area" register={register} error={errors.area} />
          <FormFieldInput label="Payment Terms" type="text" name="paymentTerms" register={register} error={errors.paymentTerms} />
          <FormFieldInput label="Date of Registration" type="text" name="dateOfRegistration" register={register} error={errors.dateOfRegistration} />
          
          <FormFieldInput label="Hypothication" type="text" name="hypothication" register={register} error={errors.hypothication} />
         
          <FormFieldInput label="Door Count" type="number" name="doorCount" register={register} error={errors.doorCount} />
          
          <FormFieldInput label="Gear Box" type="text" name="gearBox" register={register} error={errors.gearBox} />
          <FormFieldInput label="Buyer Fees" type="number" name="buyerFees" register={register} error={errors.buyerFees} />
          <FormFieldInput label="RTO Fine" type="number" name="rtoFine" register={register} error={errors.rtoFine} />
          
          <FormFieldInput label="Client Contact Person" type="text" name="clientContactPerson" register={register} error={errors.clientContactPerson} />
          <FormFieldInput label="Client Contact No" type="text" name="clientContactNo" register={register} error={errors.clientContactNo} />
          <FormFieldInput label="Additional Remarks" type="text" name="AdditionalRemarks" register={register} error={errors.AdditionalRemarks} />

          <FormFieldInput label="Lot Number" type="number" name="lotNumber" register={register} error={errors.lotNumber} />
          <FormFieldInput label="Climate Control"  type="text" name="climateControl" register={register} error={errors.climateControl} />
          <FormFieldInput label="Power Steering"  type="text" name="powerSteering" register={register} error={errors.powerSteering} />
          {/* <button type="submit" className="mt-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 col-span-3 w-36  justify-self-center">
          Submit
        </button> */}

<ImageMaping images={images}/>
<div className="col-span-3">
  <p className="text-lg font-semibold mb-2">Image URLs:</p>
  <textarea
    defaultValue={formatTextAreaValue(data?.vehicle?.image)}
    {...register("images", {})}
    className="w-3/4 h-44 border border-gray-400 rounded-md p-2 shadow-md text-gray-700 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
</div>

        <div className=" col-span-3">

 <ImageUpload />
 </div>
 


 <div className="text-center my-5 col-span-3">
              <button className={submit?.data}> Save Changes</button>
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

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useVehicleQuery,
  useUpdateVehicleMutation,
  useVehicleCategoriesQuery,
} from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import CheckboxInput, { CatInput, FormFieldInput, ImageMaping, StateInput } from "../utils/formField";
import ImageUpload from "../upload/imageUpload";
import { DateConvert } from "../utils/dateFormat";
import { indianStates } from "../../utils/data";
import { formStyle, h2Style, headerStyle, pageStyle } from "../utils/style";

const EditVehicleComponent = () => {
  const [viewImageUpload, setViewImageUpload] = useState(false);
  const [repoDate, setRepoDate] = useState("");
  const [insuranceValidTill, setInsuranceValidTill] = useState("");
  const [taxValidTill, setTaxValidTill] = useState("");
  const [registrationValidTill, setRegistrationValidTill] = useState("");
  const [images, setImages] = useState([]);
  const { id } = useParams();

  const [downloadUrls, setDownloadUrls] = useState([]);
  const [editVehicle] = useUpdateVehicleMutation({
    variables: { where: { id } },
  });
  const { data, loading, error } = useVehicleQuery({
    variables: { where: { id: id } },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { data: categoryData } = useVehicleCategoriesQuery();
 console.log(data);
 
  useEffect(() => {
    if (data?.vehicle?.repoDt) {
      setRepoDate(DateConvert(data?.vehicle?.repoDt));
    }
    if (data?.vehicle?.insuranceValidTill) {
      setInsuranceValidTill(DateConvert(data?.vehicle?.insuranceValidTill));
    }
    if (data?.vehicle?.taxValidityDate) {
      setTaxValidTill(DateConvert(data?.vehicle?.taxValidityDate));
    }
    if (data?.vehicle?.dateOfRegistration) {
      setRegistrationValidTill(DateConvert(data?.vehicle?.dateOfRegistration));
    }
    if (data?.vehicle?.image) {
      setImages(data?.vehicle?.image.split(","));
    }

    if (data?.vehicle) {
      const vehicle = data.vehicle;
      setValue("regNo", vehicle?.registrationNumber);
      setValue("loanANum", vehicle?.loanAgreementNo);
      setValue("regOwnerName", vehicle?.registeredOwnerName);
      setValue("fuel", vehicle?.fuel);
      setValue("type", vehicle?.type);
      setValue("rcStatus", vehicle?.rcStatus);
      setValue("yearOfManuFacture", vehicle?.YOM);
      setValue("Ownership", vehicle?.ownership);
      setValue("mileage", vehicle?.mileage);
      setValue("kmReading", vehicle?.kmReading);
      setValue("yardLocation", vehicle?.yardLocation);
      setValue("startPrice", vehicle?.startPrice);
      setValue("reservePrice", vehicle?.reservePrice);
      setValue("repoDate", DateConvert(vehicle?.repoDt));
      setValue("insuranceValidDate", DateConvert(vehicle?.insuranceValidTill));
      setValue("taxValidityDate", DateConvert(vehicle?.taxValidityDate));
      setValue("dateOfRegistration", DateConvert(vehicle?.dateOfRegistration));
      setValue("powerSteering", vehicle?.powerSteering);
      setValue("climateControl", vehicle?.climateControl);
      setValue("insuranceStatus", vehicle?.insuranceStatus);
      setValue("vehicleCompanyName", vehicle?.make);
      setValue("model", vehicle?.model);
      setValue("varient", vehicle?.varient);
      setValue("category", vehicle?.category);
      setValue("quoteInc", vehicle?.quoteIncreament);
      setValue("vehicleLocation", vehicle?.veicleLocation);
      setValue("vehicleRemarks", vehicle?.vehicleRemarks);
      setValue("autionManager", vehicle?.auctionManager);
      setValue("approxParkingCharges", vehicle?.parkingCharges);
      setValue("insurance", vehicle?.insurance);
      setValue("tax", vehicle?.tax);
      setValue("fitness", vehicle?.fitness);
      setValue("permit", vehicle?.permit);
      setValue("engineNumber", vehicle?.engineNo);
      setValue("chassisNo", vehicle?.chassisNo);
      setValue("inspectionLink", vehicle?.inspectionLink);
      setValue("autobseContact", vehicle?.autobseContact);
      setValue("autoBseContactPerson", vehicle?.autobse_contact_person);
      setValue("vehicleCondition", vehicle?.vehicleCondition);
      setValue("shape", vehicle?.shape);
      setValue("color", vehicle?.color);
      setValue("state", vehicle?.state);
      setValue("city", vehicle?.city);
      setValue("area", vehicle?.area);
      setValue("paymentTerms", vehicle?.paymentTerms);
      setValue("hypothication", vehicle?.hypothication);
      setValue("doorCount", vehicle?.doorCount);
      setValue("gearBox", vehicle?.gearBox);
      setValue("buyerFees", vehicle?.buyerFees);
      setValue("clientContactNo", vehicle?.clientContactNo);
      setValue("clientContactPerson", vehicle?.clientContactPerson);
      setValue("approxParkingCharges", vehicle?.approxParkingCharges);
      setValue("rtoFine", vehicle?.rtoFine);
      setValue("AdditionalRemarks", vehicle?.additionalRemarks);
      setValue("lotNumber", vehicle?.lotNumber);
    
      
    }
  }, [data, setValue]);


  const onSubmit = async (formData) => {
    const cleanedRightImage = formData?.images.replace(/,\n/g, ',');
    let repo, tax, insuranceValidity, regDate;
    if (formData?.repoDate) repo = new Date(formData?.repoDate).toISOString();
    if (formData?.insuranceValidDate) insuranceValidity = new Date(formData?.insuranceValidDate).toISOString();
    if (formData?.taxValidityDate) tax = new Date(formData?.taxValidityDate).toISOString();
    if (formData?.dateOfRegistration) regDate = new Date(formData?.dateOfRegistration).toISOString();

    const vehicleData = {
      
      registrationNumber: formData?.regNo,
      loanAgreementNo: formData?.loanANum,
      registeredOwnerName: formData?.regOwnerName,
      quoteIncreament: +formData?.quoteInc || null,
      make: formData?.vehicleCompanyName,
      model: formData?.model,
      varient: formData?.varient,
      category: formData?.category,
      fuel: formData?.fuel,
      type: formData?.type,
      rcStatus: formData?.rcStatus,
      YOM: +formData?.yearOfManuFacture || null,
      ownership: +formData?.Ownership || null,
      mileage: +formData?.mileage || null,
      kmReading: +formData?.kmReading || null,
      insuranceStatus: formData?.insuranceStatus,
      yardLocation: formData?.yardLocation,
      startPrice: +formData?.startPrice || 0,
      reservePrice: +formData?.reservePrice || 0,
      repoDt: repo,
      veicleLocation: formData?.vehicleLocation,
      vehicleRemarks: formData?.vehicleRemarks,
      auctionManager: formData?.autionManager,
      parkingCharges: formData?.approxParkingCharges,
      insurance: formData?.insurance,
      insuranceValidTill: insuranceValidity || null,
      tax: formData?.tax,
      taxValidityDate: tax || null,
      fitness: formData?.fitness,
      permit: formData?.permit,
      engineNo: formData?.engineNumber,
      chassisNo: formData?.chassisNo,
      inspectionLink: formData?.inspectionLink,
      autobseContact: formData?.autobseContact,
      autobse_contact_person: formData?.autoBseContactPerson,
      vehicleCondition: formData?.vehicleCondition,
      powerSteering: formData?.powerSteering||"",
      shape: formData?.shape,
      color: formData?.color,
      state: formData?.state,
      city: formData?.city,
      area: formData?.area,
      paymentTerms: formData?.paymentTerms,
      dateOfRegistration: regDate,
      hypothication: formData?.hypothication,
      climateControl: formData?.climateControl||"",
      doorCount: +formData?.doorCount || null,
      gearBox: formData?.gearBox,
      buyerFees: formData?.buyerFees,
      clientContactNo: formData?.clientContactNo,
      clientContactPerson: formData?.clientContactPerson,
      approxParkingCharges: formData?.approxParkingCharges,
      rtoFine: formData?.rtoFine,
      additionalRemarks: formData?.AdditionalRemarks,
      lotNumber: +formData?.lotNumber,
      image:cleanedRightImage
    };

    try {
      const result = await editVehicle({ variables: { updateVehicleInput: vehicleData } });
      if (result) {
        ShowPopup("Success!", `Vehicle ${formData?.regNo} Updated Successfully!`, "success", 5000, true);
      }
    } catch (err) {
      ShowPopup("Failed!", `${err.message}`, "error", 5000, true);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
          <FormFieldInput defaultValue={data?.vehicle?.YOM} label="Year of Manufacture" type="date" name="yearOfManuFacture" register={register} error={errors.yearOfManuFacture} />
          <FormFieldInput defaultValue={data?.vehicle?.ownership} label="Ownership" type="number" name="Ownership" register={register} error={errors.Ownership} />
          <FormFieldInput defaultValue={data?.vehicle?.quoteIncreament} label="QuoteIncreament" type="number" name="quoteInc" register={register} error={errors.Ownership} />
          <FormFieldInput defaultValue={data?.vehicle?.mileage} label="Mileage" type="number" name="mileage" register={register} error={errors.mileage} />
          <FormFieldInput defaultValue={data?.vehicle?.kmReading} label="KM Reading" type="number" name="kmReading" register={register} error={errors.kmReading} />
          <FormFieldInput label="Insurance Status" type="text" name="insuranceStatus" register={register} error={errors.insuranceStatus} />
          
          <FormFieldInput label="Yard Location" type="text" name="yardLocation" register={register} error={errors.yardLocation} />
          <FormFieldInput label="Start Price" type="number" name="startPrice" register={register} error={errors.startPrice} />
          <FormFieldInput label="Reserve Price" type="number" name="reservePrice" register={register} error={errors.reservePrice} />

          <FormFieldInput label="Repo Date" type="date" name="repoDate" register={register} error={errors.repoDate} />
          <FormFieldInput label="Vehicle Location" type="text" name="vehicleLocation" register={register} error={errors.vehicleLocation} />
          <FormFieldInput label="Vehicle Remarks" type="text" name="vehicleRemarks" register={register} error={errors.vehicleRemarks} />
          
          <FormFieldInput label="Auction Manager" type="text" name="autionManager" register={register} error={errors.autionManager} />
          <FormFieldInput label="Approx Parking Charges" type="number" name="approxParkingCharges" register={register} error={errors.approxParkingCharges} />
          <FormFieldInput label="Insurance" type="text" name="insurance" register={register} error={errors.insurance} />
          
          <FormFieldInput label="Insurance Valid Till" type="date" name="insuranceValidDate" register={register} error={errors.insuranceValidDate} />
          <FormFieldInput label="Tax" type="text" name="tax" register={register} error={errors.tax} />
          <FormFieldInput label="Tax Validity Date" type="date" name="taxValidityDate" register={register} error={errors.taxValidityDate} />
          
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
          <FormFieldInput label="Date of Registration" type="date" name="dateOfRegistration" register={register} error={errors.dateOfRegistration} />
          
          <FormFieldInput label="Hypothication" type="text" name="hypothication" register={register} error={errors.hypothication} />
         
          <FormFieldInput label="Door Count" type="number" name="doorCount" register={register} error={errors.doorCount} />
          
          <FormFieldInput label="Gear Box" type="text" name="gearBox" register={register} error={errors.gearBox} />
          <FormFieldInput label="Buyer Fees" type="number" name="buyerFees" register={register} error={errors.buyerFees} />
          <FormFieldInput label="RTO Fine" type="number" name="rtoFine" register={register} error={errors.rtoFine} />
          
          <FormFieldInput label="Client Contact Person" type="text" name="clientContactPerson" register={register} error={errors.clientContactPerson} />
          <FormFieldInput label="Client Contact No" type="text" name="clientContactNo" register={register} error={errors.clientContactNo} />
          <FormFieldInput label="Additional Remarks" type="text" name="AdditionalRemarks" register={register} error={errors.AdditionalRemarks} />

          <FormFieldInput label="Lot Number" type="number" name="lotNumber" register={register} error={errors.lotNumber} />
          <CheckboxInput label="Climate Control" type="checkbox" name="climateControl" register={register} error={errors.climateControl} />
          <CheckboxInput label="Power Steering" type="checkbox" name="powerSteering" register={register} error={errors.powerSteering} />
          {/* <button type="submit" className="mt-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 col-span-3 w-36  justify-self-center">
          Submit
        </button> */}

<ImageMaping images={images}/>

     
<textarea
defaultValue={formatTextAreaValue(data?.vehicle?.frontImage)}
{...register("images", {})}

className="w-3/4 h-40 border-gray-400 rounded m-2 p-2 flex   outline-none shadow text-gray-700 hover:bg-white"
/>
        <div className="w-1/2">

{viewImageUpload && <ImageUpload />}
 </div>
 <button type="button" onClick={()=>setViewImageUpload(!viewImageUpload)} className="btn bg-red-500  col-span-3 text-white text-center">Image Upload</button> 


 <div className="text-center my-5 col-span-3">
              <button className="bg-blue-600 text-white p-4  mb-5"> Save Changes</button>
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

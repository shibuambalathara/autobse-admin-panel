import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { StateNames, useCreateVehicleMutation ,useVehicleCategoriesQuery} from "../../utils/graphql";
import { ShowPopup } from '../alerts/popUps';
import { CatInput, FormFieldInput, SelectInput, StateInput, TextAreaInput } from "../utils/formField";
import { bidStatusOptions } from "../utils/constantValues";
import { formStyle, h2Style, headerStyle, inputStyle, pageStyle } from "../utils/style";
import { indianStates } from "../../utils/data";

const AddVehicleComponent = () => {
  const { id } = useParams();
  const [createVehicle] = useCreateVehicleMutation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const category= useVehicleCategoriesQuery();
  const onSubmit = async (dataOnSubmit) => {
    let repo, tax, insurance;
   
    if (dataOnSubmit?.repoDt) {
      repo = new Date(dataOnSubmit?.repoDt).toISOString();
    }
    if (dataOnSubmit?.insuranceValidTill) {
      insurance = new Date(dataOnSubmit?.insuranceValidTill).toISOString();
    }
    if (dataOnSubmit?.taxValidityDate) {
      tax = new Date(dataOnSubmit?.taxValidityDate).toISOString();
    }

    const vehicle = {
      registrationNumber: dataOnSubmit?.registrationNumber || "",
      loanAgreementNo: dataOnSubmit?.loanAgreementNo || "",
      make: dataOnSubmit?.make || "",
      model: dataOnSubmit?.model || "",
      varient: dataOnSubmit?.varient || "",
      category: dataOnSubmit?.category || "",
      startPrice: dataOnSubmit?.startPrice ? +dataOnSubmit?.startPrice : "",
      lotNumber: dataOnSubmit?.lotNumber ? +dataOnSubmit?.lotNumber : "",
      additionalRemarks: dataOnSubmit?.additionalRemarks || "",
      clientContactNo: dataOnSubmit?.clientContactNo || "",
      clientContactPerson: dataOnSubmit?.clientContactPerson || "",
      approxParkingCharges: dataOnSubmit?.approxParkingCharges ? +dataOnSubmit?.approxParkingCharges : "",
      parkingRate: dataOnSubmit?.parkingRate ? +dataOnSubmit?.parkingRate : "",
      rtoFine: dataOnSubmit?.rtoFine ? +dataOnSubmit?.rtoFine : "",
      buyerFees: dataOnSubmit?.buyerFees ? +dataOnSubmit?.buyerFees : "",
      gearBox: dataOnSubmit?.gearBox || "",
      doorCount: dataOnSubmit?.doorCount ? +dataOnSubmit?.doorCount : "",
      climateControl: dataOnSubmit?.climateControl || "",
      hypothication: dataOnSubmit?.hypothication || "",
      dateOfRegistration: dataOnSubmit?.dateOfRegistration || "",
      paymentTerms: dataOnSubmit?.paymentTerms || "",
      area: dataOnSubmit?.area || "",
      city: dataOnSubmit?.city || "",
      state: dataOnSubmit?.state || "",
      color: dataOnSubmit?.color || "",
      shape: dataOnSubmit?.shape || "",
      powerSteering: dataOnSubmit?.powerSteering || "",
      vehicleCondition: dataOnSubmit?.vehicleCondition || "",
      autobse_contact_person: dataOnSubmit?.autobse_contact_person || "",
      autobseContact: dataOnSubmit?.autobseContact || "",
      inspectionLink: dataOnSubmit?.inspectionLink || "",
      image: dataOnSubmit?.image || "",
      chassisNo: dataOnSubmit?.chassisNo || "",
      engineNo: dataOnSubmit?.engineNo || "",
      permit: dataOnSubmit?.permit || "",
      fitness: dataOnSubmit?.fitness || "",
      taxValidityDate: tax || "",
      tax: dataOnSubmit?.tax || "",
      insuranceValidTill: insurance || "",
      insurance: dataOnSubmit?.insurance || "",
      parkingCharges: dataOnSubmit?.parkingCharges || "",
      auctionManager: dataOnSubmit?.auctionManager || "",
      vehicleRemarks: dataOnSubmit?.vehicleRemarks || "",
      veicleLocation: dataOnSubmit?.veicleLocation || "",
      repoDt: repo || "",
      reservePrice: dataOnSubmit?.reservePrice ? +dataOnSubmit?.reservePrice : "",
      yardLocation: dataOnSubmit?.yardLocation || "",
      insuranceStatus: dataOnSubmit?.insuranceStatus || "",
      kmReading: dataOnSubmit?.kmReading ? +dataOnSubmit?.kmReading : "",
      mileage: dataOnSubmit?.mileage ? +dataOnSubmit?.mileage : "",
      ownership: dataOnSubmit?.ownership ? +dataOnSubmit?.ownership : "",
      YOM: dataOnSubmit?.YOM ? +dataOnSubmit?.YOM : "",
      rcStatus: dataOnSubmit?.rcStatus || "",
      type: dataOnSubmit?.type || "",
      fuel: dataOnSubmit?.fuel || "",
      quoteIncreament: dataOnSubmit?.quoteIncreament ? +dataOnSubmit?.quoteIncreament : "",
      registeredOwnerName: dataOnSubmit?.registeredOwnerName || "",
      startBidAmount: dataOnSubmit?.startBidAmount ? +dataOnSubmit?.startBidAmount : "",
      currentBidAmount: dataOnSubmit?.currentBidAmount ? +dataOnSubmit?.currentBidAmount : "",
      bidAmountUpdate: dataOnSubmit?.bidAmountUpdate ? +dataOnSubmit?.bidAmountUpdate : "",
    };

    // Remove any keys with empty string values
    Object.keys(vehicle).forEach(key => {
      if (vehicle[key] === "") {
        delete vehicle[key];
      }
    });

    try {
      const result = await createVehicle({ variables: { createVehicleInput: vehicle, eventId: id } });
      if (result) {
        ShowPopup("Success!", `${dataOnSubmit?.registrationNumber} Added successfully!`, "success", 5000, true);
      }
    } catch (error) {
      ShowPopup("Failed!", `${error.message}`, "error", 5000, true);
    }
  };

  return (
    <div className={`${pageStyle.data}`}>
      <div className={`${headerStyle.data}`}>
        <h2 className={`${h2Style.data}`}>
          ADD VEHICLE
        </h2>
      </div>
      <div className="h-full mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${formStyle.data}`}>
            <FormFieldInput label="Registration Number" type="text" name="registrationNumber" register={register} error={errors.registrationNumber} required />
            <FormFieldInput label="Loan Agreement No." type="text" name="loanAgreementNo" register={register} error={errors.loanAgreementNo} required />
            <FormFieldInput label="Make" type="text" name="make" register={register} error={errors.make} required />
            <FormFieldInput label="Model" type="text" name="model" register={register} error={errors.model} />
            <FormFieldInput label="Varient" type="text" name="varient" register={register} error={errors.varient} />
            {/* <CatInput options={category?.data?.vehicleCategories} label="Category" type="text" name="category" register={register} error={errors.category} /> */}
            {/* <select
                placeholder="select"
                {...register("category", { required: true })}
                className={`${inputStyle.data}`}
              >
                <option value="">Select</option>
                {category?.data?.vehicleCategories?.map((event) => (
                  <option key={event.name} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </select> */}
            {/* <FormFieldInput label="Category" type="text" name="category" register={register} error={errors.category} /> */}
            <FormFieldInput label="Start Price" type="number" name="startPrice" register={register} error={errors.startPrice} />
            <FormFieldInput label="Lot Number" type="number" name="lotNumber" register={register} error={errors.lotNumber} />
            <TextAreaInput label="Additional Remarks" name="additionalRemarks" register={register} error={errors.additionalRemarks} />
            <FormFieldInput label="Client Contact No." type="text" name="clientContactNo" register={register} error={errors.clientContactNo} />
            <FormFieldInput label="Client Contact Person" type="text" name="clientContactPerson" register={register} error={errors.clientContactPerson} />
            <FormFieldInput label="Approx Parking Charges" type="number" name="approxParkingCharges" register={register} error={errors.approxParkingCharges} />
            <FormFieldInput label="Parking Rate" type="number" name="parkingRate" register={register} error={errors.parkingRate} />
            <FormFieldInput label="RTO Fine" type="number" name="rtoFine" register={register} error={errors.rtoFine} />
            <FormFieldInput label="Buyer Fees" type="number" name="buyerFees" register={register} error={errors.buyerFees} />
            <FormFieldInput label="Gear Box" type="text" name="gearBox" register={register} error={errors.gearBox} />
            <FormFieldInput label="Door Count" type="number" name="doorCount" register={register} error={errors.doorCount} />
            <FormFieldInput label="Climate Control" type="text" name="climateControl" register={register} error={errors.climateControl} />
            <FormFieldInput label="Hypothication" type="text" name="hypothication" register={register} error={errors.hypothication} />
            <FormFieldInput label="Date of Registration" type="date" name="dateOfRegistration" register={register} error={errors.dateOfRegistration} />
            <FormFieldInput label="Payment Terms" type="text" name="paymentTerms" register={register} error={errors.paymentTerms} />
            <FormFieldInput label="Area" type="text" name="area" register={register} error={errors.area} />
            <FormFieldInput label="City" type="text" name="city" register={register} error={errors.city} />
            {/* <FormFieldInput label="State" type="text" name="state" register={register} error={errors.state} /> */}
           < StateInput options={indianStates} label="State" type="text" name="state" register={register} error={errors.state} />
            <FormFieldInput label="Color" type="text" name="color" register={register} error={errors.color} />
            <FormFieldInput label="Shape" type="text" name="shape" register={register} error={errors.shape} />
            <FormFieldInput label="Power Steering" type="text" name="powerSteering" register={register} error={errors.powerSteering} />
            <FormFieldInput label="Vehicle Condition" type="text" name="vehicleCondition" register={register} error={errors.vehicleCondition} />
            <FormFieldInput label="Auction Manager" type="text" name="auctionManager" register={register} error={errors.auctionManager} />
            <FormFieldInput label="Inspection Link" type="text" name="inspectionLink" register={register} error={errors.inspectionLink} />
            <FormFieldInput label="Image URL" type="text" name="image" register={register} error={errors.image} />
            <FormFieldInput label="Chassis Number" type="text" name="chassisNo" register={register} error={errors.chassisNo} />
            <FormFieldInput label="Engine Number" type="text" name="engineNo" register={register} error={errors.engineNo} />
            <FormFieldInput label="Permit" type="text" name="permit" register={register} error={errors.permit} />
            <FormFieldInput label="Fitness" type="text" name="fitness" register={register} error={errors.fitness} />
            <FormFieldInput label="Tax Validity Date" type="date" name="taxValidityDate" register={register} error={errors.taxValidityDate} />
            <FormFieldInput label="Insurance Valid Till" type="date" name="insuranceValidTill" register={register} error={errors.insuranceValidTill} />
            <FormFieldInput label="Parking Charges" type="number" name="parkingCharges" register={register} error={errors.parkingCharges} />
            <FormFieldInput label="Repo Date" type="date" name="repoDt" register={register} error={errors.repoDt} />
            <FormFieldInput label="Reserve Price" type="number" name="reservePrice" register={register} error={errors.reservePrice} />
            <FormFieldInput label="KM Reading" type="number" name="kmReading" register={register} error={errors.kmReading} />
            <FormFieldInput label="Mileage" type="number" name="mileage" register={register} error={errors.mileage} />
            <FormFieldInput label="Ownership" type="number" name="ownership" register={register} error={errors.ownership} />
            <FormFieldInput label="Year of Manufacture (YOM)" type="number" name="YOM" register={register} error={errors.YOM} />
            <FormFieldInput label="RC Status" type="text" name="rcStatus" register={register} error={errors.rcStatus} />
            <FormFieldInput label="Fuel Type" type="text" name="fuel" register={register} error={errors.fuel} />
            <FormFieldInput label="Quote Increament" type="number" name="quoteIncreament" register={register} error={errors.quoteIncreament} />
            <FormFieldInput label="Registered Owner Name" type="text" name="registeredOwnerName" register={register} error={errors.registeredOwnerName} />
            <FormFieldInput label="Start Bid Amount" type="number" name="startBidAmount" register={register} error={errors.startBidAmount} />
            <FormFieldInput label="Current Bid Amount" type="number" name="currentBidAmount" register={register} error={errors.currentBidAmount} />
            <FormFieldInput label="Bid Amount Update" type="number" name="bidAmountUpdate" register={register} error={errors.bidAmountUpdate} />
          </div>
          <div className="flex justify-end mt-6">
            <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-500 transition duration-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleComponent;

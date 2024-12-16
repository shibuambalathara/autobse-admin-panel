import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useVehicleQuery, useUpdateVehicleMutation, useVehicleCategoriesQuery, UpdateVehicleInput } from "../utils/graphql";
import { DateConvert } from "../components/utils/dateFormat";
import EditVehicleComponent, { formatTextAreaValue } from "../components/Vehicle/editVehicleCom ";
import { ShowPopup } from "../components/alerts/popUps";
import { VehicleInput } from "../components/Vehicle/vehicleInterface";


const EditVehicle: React.FC = () => {
  const [viewImageUpload, setViewImageUpload] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();

  const { data: categoryData } = useVehicleCategoriesQuery();
  const { data, loading, error } = useVehicleQuery({ variables: { where: { id } } });
  const [editVehicle] = useUpdateVehicleMutation( );
  
    
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm(
  );
  const { vehicle } = data || {};
  useEffect(() => {
    if (data?.vehicle) {
      Object.entries(data.vehicle).forEach(([key, value]) => {
        if (key === "image" && typeof value === "string") {
          setImages(value.split(","));
        }
        reset({
          regNo: data?.vehicle?.registrationNumber || "",
    loanANum: data?.vehicle?.loanAgreementNo || "",
    regOwnerName: data?.vehicle?.registeredOwnerName || "",
    fuel: data?.vehicle?.fuel || "",
    type: data?.vehicle?.type || "",
    rcStatus: data?.vehicle?.rcStatus || "",
    yearOfManuFacture: data?.vehicle?.YOM || "",
    Ownership: data?.vehicle?.ownership || "",
    quoteInc: data?.vehicle?.quoteIncreament || "",
    mileage: data?.vehicle?.mileage || "",
    kmReading: data?.vehicle?.kmReading || "",
    insuranceStatus: data?.vehicle?.insuranceStatus || "",
    yardLocation: data?.vehicle?.yardLocation || "",
    startPrice: data?.vehicle?.startPrice || "",
    reservePrice: data?.vehicle?.reservePrice || "",
    repoDate: data?.vehicle?.repoDt || "",
    vehicleLocation: data?.vehicle?.veicleLocation || "",
    vehicleRemarks: data?.vehicle?.vehicleRemarks || "",
    auctionManager: data?.vehicle?.auctionManager || "",
    approxParkingCharges: data?.vehicle?.approxParkingCharges || "",
    insurance: data?.vehicle?.insurance || "",
    insuranceValidDate: data?.vehicle?.insuranceValidTill || "",
    tax: data?.vehicle?.tax || "",
    taxValidityDate: data?.vehicle?.taxValidityDate || "",
    fitness: data?.vehicle?.fitness || "",
    permit: data?.vehicle?.permit || "",
    engineNumber: data?.vehicle?.engineNo|| "",
    chassisNo: data?.vehicle?.chassisNo || "",
    inspectionLink: data?.vehicle?.inspectionLink || "",
    autobseContact: data?.vehicle?.autobseContact || "",
    vehicleCondition: data?.vehicle?.vehicleCondition || "",
    shape: data?.vehicle?.shape || "",
    color: data?.vehicle?.color || "",
    city: data?.vehicle?.city || "",
    area: data?.vehicle?.area || "",
    paymentTerms: data?.vehicle?.paymentTerms || "",
    dateOfRegistration: data?.vehicle?.dateOfRegistration || "",
    hypothication: data?.vehicle?.hypothication || "",
    doorCount: data?.vehicle?.doorCount || "",
    gearBox: data?.vehicle?.gearBox || "",
    buyerFees: data?.vehicle?.buyerFees || "",
    rtoFine: data?.vehicle?.rtoFine || "",
    clientContactPerson: data?.vehicle?.clientContactPerson || "",
    clientContactNo: data?.vehicle?.clientContactNo || "",
    AdditionalRemarks: data?.vehicle?.additionalRemarks || "",
    lotNumber: data?.vehicle?.lotNumber || "",
    climateControl: data?.vehicle?.climateControl || "",
    powerSteering: data?.vehicle?.powerSteering || "",
  images:formatTextAreaValue(data?.vehicle?.image)}
        )
      });
    }
  }, [data, setValue]);
 


  const onSubmit = async (formData: any) => {
    const cleanedRightImage = formData?.images?.replace(/,\n/g, ",") || "";
    const vehicleData: any = {
      registrationNumber: formData?.regNo?.trim() || null,
      loanAgreementNo: formData?.loanANum?.trim() || null,
      registeredOwnerName: formData?.regOwnerName?.trim() || null,
      quoteIncreament: formData?.quoteInc ? +formData.quoteInc : null,
      make: formData?.vehicleCompanyName?.trim() || null,
      model: formData?.model?.trim() || null,
      varient: formData?.varient?.trim() || null,
      category: formData?.category || null,
      fuel: formData?.fuel?.trim() || null,
      type: formData?.type?.trim() || null,
      rcStatus: formData?.rcStatus || null,
      YOM: formData?.yearOfManuFacture ? +formData.yearOfManuFacture : null,
      ownership: formData?.Ownership ? +formData.Ownership: null,
      mileage: formData?.mileage ? +formData.mileage : null,
      kmReading: formData?.kmReading ? +formData.kmReading : null,
      insuranceStatus: formData?.insuranceStatus || null,
      yardLocation: formData?.yardLocation?.trim() || null,
      startPrice: formData?.startPrice ? +formData.startPrice : 0,
      reservePrice: formData?.reservePrice ? +formData.reservePrice : 0,
      repoDt: formData?.repoDate || null,
      veicleLocation: formData?.vehicleLocation?.trim() || null,
      vehicleRemarks: formData?.vehicleRemarks?.trim() || null,
      auctionManager: formData?.autionManager?.trim() || null,
      parkingCharges: formData?.approxParkingCharges || null,
      insurance: formData?.insurance?.trim() || null,
      insuranceValidTill: formData?.insuranceValidDate || null,
      tax: formData?.tax?.trim() || null,
      taxValidityDate: formData?.taxValidityDate || null,
      fitness: formData?.fitness?.trim() || null,
      permit: formData?.permit?.trim() || null,
      engineNo: formData?.engineNumber?.trim() || null,
      chassisNo: formData?.chassisNo?.trim() || null,
      inspectionLink: formData?.inspectionLink || null,
      autobseContact: formData?.autobseContact?.trim() || null,
      autobse_contact_person: formData?.autoBseContactPerson?.trim() || null,
      vehicleCondition: formData?.vehicleCondition?.trim() || null,
      powerSteering: formData?.powerSteering || null,
      shape: formData?.shape?.trim() || null,
      color: formData?.color?.trim() || null,
      state: formData?.state?.trim() || null,
      city: formData?.city?.trim() || null,
      area: formData?.area?.trim() || null,
      paymentTerms: formData?.paymentTerms || null,
      dateOfRegistration: formData?.dateOfRegistration || null,
      hypothication: formData?.hypothication || null,
      climateControl: formData?.climateControl || null,
      doorCount: formData?.doorCount ? +formData.doorCount : null,
      gearBox: formData?.gearBox || null,
      buyerFees: formData?.buyerFees || null,
      clientContactNo: formData?.clientContactNo || null,
      clientContactPerson: formData?.clientContactPerson || null,
      approxParkingCharges: formData?.approxParkingCharges || null,
      rtoFine: formData?.rtoFine || null,
      additionalRemarks: formData?.AdditionalRemarks || null,
      lotNumber: formData?.lotNumber ? +formData.lotNumber : null,
      image: cleanedRightImage,
    };
    Object.keys(vehicleData).forEach(
      (key) => vehicleData[key] === null && delete vehicleData[key]
    );
  
    try {
      const result = await editVehicle({ variables:   { where: { id },updateVehicleInput: vehicleData }});
      if (result) {
        ShowPopup("Success!", `Vehicle ${formData?.regNo} Updated Successfully!`, "success", 5000, true);
      }
    } catch (err: any) {
      ShowPopup("Failed!", err.message, "error", 5000, true);
    }
  };

  return (
    <div className="w-full">
      <EditVehicleComponent
      reset={reset}
        data={data}
        loading={loading}
        error={error}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        button={'Update'}
        register={register}
        errors={errors}
        images={images}
      />
    </div>
  );
};

export default EditVehicle;

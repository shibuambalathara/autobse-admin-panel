import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useVehicleQuery, useUpdateVehicleMutation, useVehicleCategoriesQuery, UpdateVehicleInput } from "../utils/graphql";
import { DateConvert } from "../components/utils/dateFormat";
import EditVehicleComponent from "../components/Vehicle/editVehicleCom ";
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
  } = useForm();

  useEffect(() => {
    if (data?.vehicle) {
      Object.entries(data.vehicle).forEach(([key, value]) => {
        if (key === "image" && typeof value === "string") {
          setImages(value.split(","));
        }
        setValue(key as keyof VehicleInput, value as any);
      });
    }
  }, [data, setValue]);
  const onSubmit = async (formData: any) => {
    const cleanedRightImage = formData?.images?.replace(/,\n/g, ",") || "";
    const vehicleData: any = {
      registrationNumber: formData?.regNo || null,
      loanAgreementNo: formData?.loanANum || null,
      registeredOwnerName: formData?.regOwnerName || null,
      quoteIncreament: formData?.quoteInc ? +formData.quoteInc : null,
      make: formData?.vehicleCompanyName || null,
      model: formData?.model || null,
      varient: formData?.varient || null,
      category: formData?.category || null,
      fuel: formData?.fuel || null,
      type: formData?.type || null,
      rcStatus: formData?.rcStatus || null,
      YOM: formData?.yearOfManuFacture ? +formData.yearOfManuFacture : null,
      ownership: formData?.Ownership ? +formData.Ownership : null,
      mileage: formData?.mileage ? +formData.mileage : null,
      kmReading: formData?.kmReading ? +formData.kmReading : null,
      insuranceStatus: formData?.insuranceStatus || null,
      yardLocation: formData?.yardLocation || null,
      startPrice: formData?.startPrice ? +formData.startPrice : 0,
      reservePrice: formData?.reservePrice ? +formData.reservePrice : 0,
      repoDt: formData?.repoDate || null,
      veicleLocation: formData?.vehicleLocation || null,
      vehicleRemarks: formData?.vehicleRemarks || null,
      auctionManager: formData?.autionManager || null,
      parkingCharges: formData?.approxParkingCharges || null,
      insurance: formData?.insurance || null,
      insuranceValidTill: formData?.insuranceValidDate || null,
      tax: formData?.tax || null,
      taxValidityDate: formData?.taxValidityDate || null,
      fitness: formData?.fitness || null,
      permit: formData?.permit || null,
      engineNo: formData?.engineNumber || null,
      chassisNo: formData?.chassisNo || null,
      inspectionLink: formData?.inspectionLink || null,
      autobseContact: formData?.autobseContact || null,
      autobse_contact_person: formData?.autoBseContactPerson || null,
      vehicleCondition: formData?.vehicleCondition || null,
      powerSteering: formData?.powerSteering || null,
      shape: formData?.shape || null,
      color: formData?.color || null,
      state: formData?.state || null,
      city: formData?.city || null,
      area: formData?.area || null,
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

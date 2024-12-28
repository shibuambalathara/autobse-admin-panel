import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useCreateSellerMutation } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import { useNavigate } from "react-router-dom";
import { formStyle, h2Style, headerStyle, pageStyle, submit } from "../utils/style";
import { FormFieldInput } from "../utils/formField";
import { GetErrorMessage } from "../../utils/errorCode";
// import Select from 'react-select';

interface FormValues {
  sellerCompanyName: string;
  gst: string;
  billingContactPerson: string;
  ContactPerson: string;
  mobile: string;
  nationalHead: string;
}

const AddSeller: React.FC = () => {
  const [createSeller] = useCreateSellerMutation();

  const navigate = useNavigate()
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await createSeller({
        variables: {
          createSellerInput: {
            name: data.sellerCompanyName.trim(),
            billingContactPerson: data.billingContactPerson.trim() || "",
            contactPerson: data.ContactPerson.trim() || "",
            GSTNumber: data.gst.trim() || "",
            mobile: data.mobile ? `+91 ${data.mobile.trim()}` : "",
            nationalHead: data.nationalHead.trim() || "",
            logo: "",
          },
        },
      });

      ShowPopup(
        "Success!",
        `${data.sellerCompanyName} added successfully!`,
        "success",
        5000,
        true
      );
      navigate('/sellers');
    } catch (error: any) {
      const graphqlError = error.graphQLErrors[0];
      const message = GetErrorMessage(graphqlError.errorCode)
      ShowPopup("Failed!", `${message}`, "error", 5000, true);
    }


    reset();
  };

  return (
    <div className={`${pageStyle.data}w-full `}>

      <div className={`${headerStyle.data}`}>
        <h2 className={`${h2Style.data}`}>ADD SELLER</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={`${formStyle.data}`} >

        {/* Seller Company Name */}
        <FormFieldInput label="Seller Name" type="text" name="sellerCompanyName" register={register} error={errors.sellerCompanyName} required defaultValue={''} />


        {/* GST Number */}
        <FormFieldInput label="GST Number" type="text" name="gst" register={register} error={errors.gst} defaultValue={''} />




        {/* Billing Contact Person */}
        <FormFieldInput label="Billing Contact Person" type="text" name="billingContactPerson" register={register} error={errors.billingContactPerson} defaultValue={''} />


        {/* Contact Person */}
        <FormFieldInput label="Contact Person" type="text" name="ContactPerson" register={register} error={errors.ContactPerson} defaultValue={''} />



        {/* Mobile */}
        <FormFieldInput label=" Mobile" type="text" name="mobile" register={register} error={errors.mobile} defaultValue={''} />
        <FormFieldInput label=" National Head" type="text" name="nationalHead" register={register} error={errors.nationalHead} defaultValue={''} />
        {/* Event Type (Optional) */}
        {/* <div>
              <label className="block text-gray-700 font-medium mb-1">
                Event Type
              </label>
              <div className="relative">
               
              </div>
            </div> */}


        {/* Submit Button */}
        <div className="flex justify-center my-5 col-span-3">
          <input type="submit" className={`${submit.data}`} />
        </div>
      </form>
    </div>

  );
};

export default AddSeller;

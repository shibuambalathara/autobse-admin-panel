import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useCreateSellerMutation } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import { useNavigate } from "react-router-dom";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
const navigate =useNavigate()
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
            name: data.sellerCompanyName,
            billingContactPerson: data.billingContactPerson || "",
            contactPerson: data.ContactPerson || "",
            GSTNumber: data.gst || "",
            mobile: data.mobile ? `+91 ${data.mobile}` : "",
            nationalHead: data.nationalHead || "",
            logo:  "",
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
      ShowPopup("Failed!", `${error?.message}`, "error", 5000, true);
    }

    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="flex justify-center mx-auto items-center min-h-screen ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
          Add Seller
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seller Company Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Seller Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("sellerCompanyName", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Enter Seller Name"
              />
              {errors.sellerCompanyName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* GST Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                GST Number <span className="text-red-500">*</span>
              </label>
              <input
                {...register("gst", )}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Enter GST Number"
              />
              {errors.gst && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* Billing Contact Person */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Billing Contact Person
              </label>
              <input
                {...register("billingContactPerson")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Enter Billing Contact Person"
              />
            </div>

            {/* Contact Person */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Contact Person
              </label>
              <input
                {...register("ContactPerson")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Enter Contact Person"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Mobile <span className="text-red-500">*</span>
              </label>
              <input
                {...register("mobile",)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Enter Mobile Number"
              />
              {errors.mobile && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* National Head */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                National Head
              </label>
              <input
                {...register("nationalHead")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Enter National Head"
              />
            </div>

            {/* Event Type (Optional) */}
            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">
                Event Type
              </label>
              <div className="relative">
               
              </div>
            </div> */}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Add Seller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSeller;

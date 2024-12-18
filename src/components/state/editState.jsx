import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateStateMutation } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import { indianStates } from "../../utils/data";
import { InputField, InputFields } from "../utils/formField";

const EditState = ({ id, isModalOpen, setIsModalOpen, refetch ,name}) => {
  const [updateState] = useUpdateStateMutation();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (dataOnSubmit) => {
    setLoading(true);
    try {
      await updateState({
        variables: { where: { id }, updateStateInput: { name: dataOnSubmit.name } },
      });
      ShowPopup("Success!", `${dataOnSubmit.name} edited successfully!`, "success", 5000, true);
      refetch();
      reset();
      setIsModalOpen(false);
    } catch (error) {
      ShowPopup("Failed!", `${error.message}`, "error", 5000, true);
    } finally {
      setLoading(false);
    }
  };
  
  return (
<div className="relative flex justify-center items-center">
  {isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[400px] bg-white rounded-xl shadow-xl p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-400 hover:text-red-500 font-bold absolute top-4 right-4 text-2xl"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-center font-extrabold my-5 text-lg w-full">Edit State</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* State Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2" htmlFor="state-name">
              State Name
            </label>
            <InputFields
              label="State Name"
              defaultValue={name}
              register={register("name", { required: "State is Required" })}
              component="select"
              options={indianStates}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white font-medium text-lg py-2 px-10 rounded-lg hover:bg-blue-700 transition duration-150"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>



  );
};

export default EditState;

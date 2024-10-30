import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateStateMutation } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import { indianStates } from "../../utils/data";
import { InputField } from "../utils/formField";

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
          <div className="bg-white rounded-lg shadow-lg p-4 px-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-red-500 font-bold float-right"
            >
              ✕
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <InputField
                label="State Name"
                defaultValue={name}
                register={register("name", { required: "State is required" })}
                component="select"
                options={indianStates}
              />
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Edit State"}
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

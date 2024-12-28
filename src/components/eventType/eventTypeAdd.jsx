import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateVehiclecategoryMutation } from "../../utils/graphql";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { Button } from "../buttons/radix";
import { FaPlusCircle } from "react-icons/fa";
import { GetErrorMessage } from "../../utils/errorCode";
import { ShowPopup } from "../alerts/popUps";

const AddEventType = ({setNewCategory}) => {
  const navigate = useNavigate()
  const [createState,{loading}] = useCreateVehiclecategoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataOnSubmit) => {
    try {
      await createState({
        variables: {
          createVehiclecategoryInput: {
            name: dataOnSubmit?.name.trim(),
          },
        },
      });
      Swal.fire({
        title: "Success!",
        text: `${dataOnSubmit?.name.trim()} added successfully!`,
        icon: "success",
        timer: 3000,
        showConfirmButton: true,
      });
      
      setIsModalOpen(false);
      setNewCategory(true)
    } catch (error) {
      const graphqlError = error.graphQLErrors[0];
      const message = GetErrorMessage(graphqlError.errorCode)
      ShowPopup("Failed!", `${message}`, "error", 5000, true);
    }
  };

  return (
    <div className="w-full max-w-xs  relative flex justify-center items-center mr-20">
      {/* Button to trigger modal */}
      <div className=" flex items-center place-self-end gap-2">
      <Button onClick={() =>setIsModalOpen(true)} size="sm" className="h-8 gap-1">
        <FaPlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Add Category
        </span>
      </Button>
    </div>

      {/* Modal */}

      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-md shadow-md p-6 w-full max-w-md mx-4 relative">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors text-xl"
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Add Vehicle Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-2">Vehicle Category Name</label>
            <input
              {...register("name", { required: true })}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              placeholder="Vehicle Category"
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-2">This field is required</span>
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className={modalStyle.container}>
            <button
              onClick={() => setIsModalOpen(false)}
              className={modalStyle.closeButton}
            >
              ✕
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={modalStyle.inputContainer}>
                <label className={modalStyle.label}>Vehicle Category Name</label>
                <input
                  {...register("name", { required: true })}
                  className={modalStyle.input}
                  type="text"
                  placeholder="Vehicle Category type"
                />
                {errors.name && (
                  <span className={modalStyle.errorText}>This field is required</span>
                )}
              </div>
              <div className={modalStyle.buttonContainer}>
                <button
                  type="submit"
                  className={modalStyle.button}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Vehicle Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AddEventType;

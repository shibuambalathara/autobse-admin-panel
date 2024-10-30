import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateVehiclecategoryMutation } from "../../utils/graphql";
import Swal from "sweetalert2";
import { modalStyle } from "../utils/style"; // Importing the new modal styles

const AddEventType = (load) => {
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
            name: dataOnSubmit?.name,
          },
        },
      });
      Swal.fire({
        title: "Success!",
        text: `${dataOnSubmit?.name} added successfully!`,
        icon: "success",
        timer: 3000,
        showConfirmButton: true,
      });
     
      setIsModalOpen(false);
    //  load()
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full max-w-xs  relative">
      {/* Button to trigger modal */}
      <button
        className="mt-2 w-fit bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Add category
      </button>
      {/* Modal */}
      {isModalOpen && (
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
                <label className={modalStyle.label}>Event Type Name</label>
                <input
                  {...register("name", { required: true })}
                  className={modalStyle.input}
                  type="text"
                  placeholder="Enter event type"
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
                  {loading ? "Adding..." : "Add Event Type"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEventType;

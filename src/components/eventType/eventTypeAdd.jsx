import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateVehiclecategoryMutation } from "../../utils/graphql";
import Swal from "sweetalert2";

const AddEventType = () => {
  const [createState] = useCreateVehiclecategoryMutation();
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
          createVehiclecategoryInput: {  // Update the variable name here
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
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full max-w-xs relative">
      {/* Button to trigger modal */}
      <button 
        className="btn btn-outline btn-secondary" 
        onClick={() => setIsModalOpen(true)}
      >
        Add Event Types
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className=" bg-blue-50  w-96  shadow-lg h-36 ">
            {/* Close button */}
            <button 
              className=" btn-circle absolute right-4 top-4"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            {/* Modal content */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-4 rounded-lg ">
                <label className="text-lg font-semibold text-center text-white  bg-blue-400 ">Event Type Name</label>
                <input
                  {...register("name", { required: true })}
                  className="input input-bordered bg-white text-gray-900 rounded-md h-10 px-5 mx-6"
                  type="text"
                  placeholder="Enter event type"
                />
                {errors.name && (
                  <span className="text-red-400">This field is required</span>
                )}

                {/* Submit button */}
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-secondary bg-white px-3 py-1 hover:bg-gray-100"
                  >
                    Add Event Type
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEventType;

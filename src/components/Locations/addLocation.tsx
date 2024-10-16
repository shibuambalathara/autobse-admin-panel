import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { StateNames, useCreateLocationMutation } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import { indianStates } from "../../utils/data";

// Define the data structure for the form input
type FormInputs = {
  name: string;
  
  state: StateNames;
};

const AddLocation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const [createLocation, { loading, error }] = useCreateLocationMutation();

  const onSubmit: SubmitHandler<FormInputs> = async (dataOnSubmit) => {
    const data = {
    
      name: dataOnSubmit?.name,
      state:dataOnSubmit?.state , // Assuming the state is a relationship field
    };

    try {
      await createLocation({ variables: { createLocationInput: data } }); // Pass the correct input key
      ShowPopup("Success!", `Location added successfully!`, "success", 5000, true);
      setIsModalOpen(false); // Close the modal after successful submission
      reset(); // Reset the form after submission
    } catch (error: any) {
      ShowPopup("Failed!", `${error.message}`, "error", 5000, true);
    }
  };

  return (
    <div className="relative flex justify-center items-center w-40 h-10 border mr-20 ">
      {/* Add Location Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-outline btn-secondary"
      >
        Add Location
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box relative w-96 bg-white p-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* City */}
              <div className="flex flex-col mb-4">
                <label htmlFor="name">City</label>
                <input
                  {...register("name", { required: true })}
                  className="input input-bordered input-secondary"
                  placeholder="Enter City Name"
                />
                {errors.name && (
                  <p className="text-red-500">City name is required</p>
                )}
              </div>

              {/* Country */}
              {/* <div className="flex flex-col mb-4">
                <label htmlFor="country">Country</label>
                <input
                  {...register("country", { required: true })}
                  className="input input-bordered input-secondary"
                  placeholder="Enter Country Name"
                />
                {errors.country && (
                  <p className="text-red-500">Country name is required</p>
                )}
              </div> */}

              {/* State */}
              <div className="flex flex-col mb-4">
                <label htmlFor="state">State</label>
                <select
                  {...register("state", { required: true })}
                  className="input input-bordered input-secondary"
                >
                  <option value="">Select State</option>
                  {indianStates?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red-500">State is required</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn btn-outline btn-secondary"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Location"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLocation;

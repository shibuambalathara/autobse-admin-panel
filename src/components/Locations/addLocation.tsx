import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { StateNames, useCreateLocationMutation, useStatesQuery } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";

import { modalStyle } from "../utils/style"; // Updated import

// Define the data structure for the form input
type FormInputs = {
  name: string;
  state: StateNames;
};

const AddLocation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allStates = useStatesQuery();
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
       // Assuming the state is a relationship field
    };
    try {
      await createLocation({ variables: { createLocationInput: data,stateId:dataOnSubmit.state } }); // Pass the correct input key
      ShowPopup("Success!", `Location added successfully!`, "success", 5000, true);
      setIsModalOpen(false); // Close the modal after successful submission
      reset(); // Reset the form after submission
    } catch (error: any) {
      ShowPopup("Failed!", `${error.message}`, "error", 5000, true);
    }
  };

  return (
    <div className="relative flex justify-center items-center mr-20">
      {/* Add Location Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-2 w-fit bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Add Location
      </button>
      {/* Modal */} 
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={modalStyle.container}>
            <button
              onClick={() => setIsModalOpen(false)}
              className={modalStyle.closeButton}
            >
              ✕
            </button>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className={modalStyle.inputContainer}>
                <label htmlFor="name" className={modalStyle.label}>City</label>
                <input
                  {...register("name", { required: true })}
                  className={modalStyle.input}
                  placeholder="Enter City Name"
                />
                {errors.name && <p className={modalStyle.errorText}>City name is required</p>}
              </div>

              <div className={modalStyle.inputContainer}>
                <label htmlFor="state" className={modalStyle.label}>State</label>
                <select
                  {...register("state", { required: true })}
                  className={modalStyle.select}
                >
                  <option value="">Select State</option>
                  {allStates?.data?.States?.map((item) => (
                    <option key={item.id} value={item?.id}>{item?.name}</option>
                  ))}
                </select>
                {errors.state && <p className={modalStyle.errorText}>State is required</p>}
              </div>

              <div className={modalStyle.buttonContainer}>
                <button
                  type="submit"
                  className={modalStyle.button}
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

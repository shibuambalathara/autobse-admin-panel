import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { StateNames, useCreateLocationMutation, useStatesQuery } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";


import { InputFields } from "../utils/formField";


type FormInputs = {
  name: string;
  state: StateNames;
};
type addLocationProps = {
  refetch: () => void; 
}
const AddLocation: React.FC<addLocationProps> = ({refetch}) => {
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
      name: dataOnSubmit?.name.trim(),
       // Assuming the state is a relationship field
    };
    try {
      await createLocation({ variables: { createLocationInput: data,stateId:dataOnSubmit.state } });
      refetch() // Pass the correct input key
      ShowPopup("Success!", `Location added successfully!`, "success", 5000, true);
      setIsModalOpen(false); 
      // Close the modal after successful submission
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
    <div className="bg-white rounded-md shadow-md p-6 w-full max-w-md mx-4 relative">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors text-xl font-bold"
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Add Location</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="gap-4 flex flex-col">
      <InputFields
     
            label="City"
            type="text"
            register={register("name", { required: "City required" })}
            
            error={errors.name}
            required
            {...(undefined as any)}
          />

          <InputFields
            label="State"
            register={register("state", { required: "State required" })}
          required
          defaultValue={"active"}
            component="select"
            options={allStates?.data?.States?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            error={errors.state}
            {...(undefined as any)}
          />
        {/* <div className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-gray-700 mb-2">City</label>
            <input
              {...register("name", { required: true })}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter City Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">City name is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="font-medium text-gray-700 mb-2">State</label>
            <select
              {...register("state", { required: true })}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Select State</option>
              {allStates?.data?.States?.map((item) => (
                <option key={item.id} value={item?.id}>{item?.name}</option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-2">State is required</p>
            )}
          </div>
        </div> */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Location"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* {isModalOpen && (
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
      )} */}
    </div>
  );
};

export default AddLocation;

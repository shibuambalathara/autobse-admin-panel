import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { StateNames, useUpdateLocationMutation, useStatesQuery, Location as GQLLocation } from "../../utils/graphql"; // Alias the Location type
import { ShowPopup } from "../alerts/popUps";
import { modalStyle } from "../utils/style";

// Define the data structure for the form input
type FormInputs = {
  name: string;
  state: StateNames; // Ensure state is of type StateNames
};

interface EditLocationProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  location: GQLLocation | null; // The location to edit
  refetch: () => void; // Function to refetch locations after editing
}

const EditLocation: React.FC<EditLocationProps> = ({ isModalOpen, setIsModalOpen, location, refetch }) => {
  const allStates = useStatesQuery();
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormInputs>();
  const [updateLocation, { loading }] = useUpdateLocationMutation();

  // Pre-fill the form with the current location data when it opens
  useEffect(() => {
    if (location) {
      setValue("name", location.name); // Use location.name from the GraphQL type
      setValue("state", location.state?.name as StateNames); // Ensure that the state is passed correctly as StateNames
    }
  }, [location, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = async (dataOnSubmit) => {
    const data = {
      name: dataOnSubmit?.name,
      stateId: dataOnSubmit.state, // Include the stateId inside the updateLocationInput
    };
  
    try {
      await updateLocation({
        variables: {
          where: { id: location?.id }, 
          updateLocationInput: data, // stateId is now part of updateLocationInput
        },
      });
      ShowPopup("Success!", `Location updated successfully!`, "success", 5000, true);
      setIsModalOpen(false); // Close the modal after successful submission
      refetch(); // Refetch the locations
      reset(); // Reset the form after submission
    } catch (error: any) {
      ShowPopup("Failed!", `${error.message}`, "error", 5000, true);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={modalStyle.container}>
        <button onClick={() => setIsModalOpen(false)} className={modalStyle.closeButton}>✕</button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={modalStyle.inputContainer}>
            <label htmlFor="name" className={modalStyle.label}>City</label>
            <input {...register("name", { required: true })} className={modalStyle.input} placeholder="Enter City Name" />
            {errors.name && <p className={modalStyle.errorText}>City name is required</p>}
          </div>

          <div className={modalStyle.inputContainer}>
            <label htmlFor="state" className={modalStyle.label}>State</label>
            <select {...register("state", { required: true })} className={modalStyle.select}>
              <option value="">Select State</option>
              {allStates?.data?.States?.map((item) => (
                <option key={item.id} value={item.id as StateNames}> {/* Ensure value is StateNames */}
                  {item.name}
                </option>
              ))}
            </select>
            {errors.state && <p className={modalStyle.errorText}>State is required</p>}
          </div>

          <div className={modalStyle.buttonContainer}>
            <button type="submit" className={modalStyle.button} disabled={loading}>
              {loading ? "Updating..." : "Update Location"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLocation;

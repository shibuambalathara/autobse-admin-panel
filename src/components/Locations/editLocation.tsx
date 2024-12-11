import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { StateNames, useUpdateLocationMutation, useStatesQuery, Location as GQLLocation } from "../../utils/graphql"; // Alias the Location type
import { ShowPopup } from "../alerts/popUps";
import { modalStyle } from "../utils/style";
import { InputFields } from "../utils/formField";

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

  console.log(location,"loc");
  
  const allStates = useStatesQuery();
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormInputs>();
  const [updateLocation, { loading }] = useUpdateLocationMutation();

  // Pre-fill the form with the current location data when it opens
  useEffect(() => {
    if (location) {
      setValue("name", location.name); // Use location.name from the GraphQL type
      setValue("state", location.state?.id as StateNames); // Ensure that the state is passed correctly as StateNames
    }
  }, [location, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = async (dataOnSubmit) => {
    console.log(dataOnSubmit);
    
    const data = {
      name: dataOnSubmit?.name.trim(),
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
    <div className={`${modalStyle.container} w-96 h-96 p-8 rounded-lg`}>
      <button onClick={() => setIsModalOpen(false)} className={modalStyle.closeButton}>✕</button>
  
      {/* Heading */}
      <h2 className="text-center font-extrabold my-5 text-lg w-full">Update Location</h2>
  
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputFields
     
     label="City"
     type="text"
     register={register("name", { required: "City required" })}
     defaultValue={location?.name}
     error={errors.name}
     required
     {...(undefined as any)}
   />

   <InputFields
     label="State"
     register={register("state", { required: "State required" })}
   required
   defaultValue={location?.state?.id}
     component="select"
     options={allStates?.data?.States?.map((item) => ({
      label: item.name.split('_').join(' '),
       value: item.id,
     }))}
     error={errors.state}
     {...(undefined as any)}
   />
  
        <div className={`${modalStyle.buttonContainer} mt-4`}>
          <button type="submit" className={`${modalStyle.button} text-lg p-3`} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default EditLocation;

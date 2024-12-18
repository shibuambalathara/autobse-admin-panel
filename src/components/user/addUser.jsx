import { useForm } from "react-hook-form";
import { useAddUserMutation } from "../../utils/graphql";
import { ShowPopup } from '../alerts/popUps';
import { useNavigate } from "react-router-dom";
import { indianStates } from "../../utils/data";
import { formStyle, h2Style, headerStyle, submit } from "../utils/style";
import { FormFieldInput, InputFields, PANCardInput, StateInput } from "../utils/formField";
import { useState } from "react";
import FileInput from "../utils/fileInputs";

const AddUser = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  console.log(errors ,"err");
  
  const [createUser, { error }] = useAddUserMutation();
  const onSubmit = async (formData) => {
    const userPayload = {
      firstName: formData.first_Name,
      lastName: formData.last_Name || "",
      email: formData.email || "",
      // username: `auto${formData.mobile}`,
      mobile: formData.mobile,
      pancardNo: formData.pancardNumber,
      // country: formData.country,
      state: formData.state,
    };

    try {
      const result = await createUser({ variables: { data: userPayload } });

      // Extract userId from the response if available
      const newUserId = result.data?.createUser?.id;
      if (!newUserId) {
        throw new Error("User creation failed. No ID returned.");
      }
      setUserId(newUserId);
      ShowPopup("Success!", `${formData.first_Name} added successfully!`, "success", 5000, true);

      // Call uploadDocuments with the new user ID
      await uploadDocuments(formData, newUserId);

      navigate('/users')
    } catch (error) {
      ShowPopup("Failed!", `${error.message}`, "error", 5000, true);
    }
  };

  const uploadDocuments = async (formData, userId) => {
    const formDataPayload = new FormData();

    const appendIfExists = (field, file) => {
      if (file) formDataPayload.append(field, file);
      
      
    }
    appendIfExists("pancard_image", formData.pancardImage?.[0]);
    appendIfExists("aadharcard_front_image", formData.idProof?.[0]);
    appendIfExists("aadharcard_back_image", formData.idBack?.[0]);
    appendIfExists("driving_license_front_image", formData.driving_license_front_image?.[0]);
    appendIfExists("driving_license_back_image", formData.driving_license_back_image?.[0]);

    try {
      const response = await fetch(`https://api-dev.autobse.com/api/v1/fileupload/userprofile/${userId}`, {
        method: "PUT",
       
        body: formDataPayload,
        headers: { "x-apollo-operation-name": "uploadUserProfile" },
      });

      if (!response.ok) throw new Error(`Image upload failed: ${response.status}`);
      const result = await response.json();

      if (result.success) {
        console.log("Document upload successful:", result);
      }
      navigate('/users');
    } catch (error) {
      console.error("Error during document upload:", error);
      ShowPopup("Failed!", `Document upload failed: ${error.message}`, "error", 5000, true);
    }
  };
  return (
    <div className=" bg-white m-auto">
      <div className={`${headerStyle.data}`}>
      <h2 className={`${h2Style.data}`}>ADD USER</h2>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyle.data}`}>
          <FormFieldInput label="First Name" type="text" name="first_Name" register={register} error={errors.first_Name} required />
          <FormFieldInput label="Last Name" type="text" name="last_Name" register={register} error={errors.last_Name} />
          <FormFieldInput label="Email" type="email" name="email" register={register} error={errors.email} />
          <FormFieldInput label="Mobile Number" type="number" name="mobile" register={register} error={errors.mobile} required minLength={10} maxLength={10} />
          <PANCardInput label="Pancard Number" type="text" name="pancardNumber" register={register} error={errors.pancardNumber} clearErrors= {clearErrors} required />
          <FileInput label="Pancard Image" accept="image/*" 
          maxSizeMB={1} register={register("pancardImage", {
            required: "Pancard Image  Required",
            validate: (files) => {
              if (!files?.[0]) {
                return "Pancard Image  Required";
              }
              if (files[0].size > 1 * 1024 * 1024) { // Convert MB to bytes
                return "File size must not exceed 1 MB";
              }
              return true;
            },
          })} fieldName="pancardImage"  required={true} error={errors.pancardImage}/>
         
          {/* <FormFieldInput label="Pancard Image" type="file" name="pancardImage" register={register} error={errors.pancardImage} required/> */}
          <FormFieldInput label="ID Proof Number" type="text" name="IdNumber" register={register} error={errors.IdNumber} minLength={12}  />
          
          <FileInput label="ID Proof (Front)" accept="image/*" 
          maxSizeMB={1} register={register('idProof')} fieldName="idProof"  required={false} error={errors.idProof}/>
           <FileInput label="ID Proof (Back)" accept="image/*" 
          maxSizeMB={1} register={register("idBack")} fieldName="idBack"  required={false} error={errors.idBack}/>
         
          {/* <FormFieldInput label="ID Proof (Front)" type="file" name="idProof" register={register} error={errors.idProof} /> */}
          {/* <FormFieldInput label="ID Proof (Back)" type="file" name="idBack" register={register} error={errors.idBack} /> */}
          {/* <FormFieldInput label="Dealership Image" type="file" name="dealership" register={register} error={errors.dealership} /> */}

          <InputFields
              label="State"
              register={register("state",{required:"State is Required"})}
              component="select"
              options={indianStates}
            error={errors.state}
            required
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />          {/* <FormFieldInput label="City" type="text" name="city" register={register} error={errors.city} /> */}

          

        

          <div className="flex justify-center my-5 col-span-3">
            <input type="submit"  className={`${submit.data}`} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;

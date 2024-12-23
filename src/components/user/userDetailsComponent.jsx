import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  useStatesQuery,
  useUpdateUserMutation,
  useViewUserQuery,
} from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import {
  formStyle,
  h2Style,
  headerStyle,

  pageStyle,
  submit,
} from "../utils/style";
import { indianStates } from "../../utils/data";
import { InputField, InputFields, PANCardInput } from "../utils/formField";
import imageCompression from "browser-image-compression";
import Select from "react-select";

import AutobseLoading from "../utils/autobseLoading";
import { ImageUploadField } from "../image/imageUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEyeSlash, } from "@fortawesome/free-solid-svg-icons";
import { FaTimes } from "react-icons/fa";
import CloseButton, { EditButton } from "../buttons/button";
import { GetErrorMessage } from "../../utils/errorCode";


const UserDetailsComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, loading, error } = useViewUserQuery({
    variables: { where: { id } },
  });



  const imageLabels = {
    pancard_image: "Pancard",
    aadharcard_front_image: "ID Proof front",
    aadharcard_back_image: "ID Proof Back",

    driving_license_front_image: "License Front",
    driving_license_back_image: "License Back",
  };
  const allStates = useStatesQuery();
  const [updateUser] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    control,
  } = useForm();

  console.log(errors, "error");

  const [isEditable, setIsEditable] = useState(false);
  const [fileData, setFileData] = useState({
    pancard_image: { file: null, preview: null },
    aadharcard_front_image: { file: null, preview: null },
    aadharcard_back_image: { file: null, preview: null },
    driving_license_front_image: { file: null, preview: null },
    driving_license_back_image: { file: null, preview: null },
  });



  const handleEdit = () => {
    setIsEditable(!isEditable);
  };
  useEffect(() => {
    if (data) {
      reset({
        ...data.user,
        states: data.user.states.map((state) => ({
          label: state.name,
          value: state.id,
        })),
      });
    }
  }, [data, reset]);
  useEffect(() => {
    // Initialize the fileData state with existing images
    if (data) {
      setFileData({
        pancard_image: { file: null, preview: data.user.pancard_image || null },
        aadharcard_front_image: {
          file: null,
          preview: data.user.aadharcard_front_image || null,
        },
        aadharcard_back_image: {
          file: null,
          preview: data.user.aadharcard_back_image || null,
        },
        driving_license_front_image: {
          file: null,
          preview: data.user.driving_license_front_image || null,
        },
        driving_license_back_image: {
          file: null,
          preview: data.user.driving_license_back_image || null,
        },
      });
    }
  }, [data]);

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        const previewUrl = URL.createObjectURL(compressedFile);

        setFileData((prevState) => ({
          ...prevState,
          [name]: { file: compressedFile, preview: previewUrl },
        }));
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const uploadFile = async () => {
    const formDataPayload = new FormData();
    const value = Object.keys(fileData).some(key => {

      return fileData[key].file
    });


    try {
      if (value) {
        Object.keys(fileData).forEach((key) => {



          formDataPayload.append(key, fileData[key].file);

          return fileData[key].file

        });
        const response = await fetch(
          `https://api-dev.autobse.com/api/v1/fileupload/userprofile/${id}`,
          {
            method: "PUT",
            body: formDataPayload,
          }
        );
        if (!response.ok)
          throw new Error(`Image upload failed: ${response.status}`);
      }
      return console.log
        (`No changes detected, skipping submission.`);

    } catch (error) {
      console.error("Error during document upload:", error);
    }
  };

  const onSubmit = async (dataOnSubmit) => {
    console.log("Submitted Data: ", dataOnSubmit);

    // Helper function to compare and find updated fields
    const getUpdatedFields = (original, updated) => {
      const result = {};

      Object.keys(updated).forEach((key) => {
        const originalValue = original[key];
        const updatedValue = updated[key];

        // Skip unchanged fields
        if (JSON.stringify(originalValue) === JSON.stringify(updatedValue)) return;

        // Add only changed fields
        result[key] = updatedValue;
      });

      return result;
    };

    // Transform `states` into an array of IDs if it has values
    const transformedStates = Array.isArray(dataOnSubmit.states)
      ? dataOnSubmit.states.map((state) => state.label)
      : [];
    console.log(transformedStates, "tar");


    const formData = {
      ...dataOnSubmit,
      ...(transformedStates.length > 0 ? { states: transformedStates } : { states: undefined }), // Only add states if it's not empty
    };
    console.log(formData, "form");


    // Original data fetched from the API
    const originalData = {
      ...data.user,
      states: Array.isArray(data.user.states)
        ? data.user.states.map((state) => state.name)
        : [],
    };

    console.log("Original Data:", originalData);

    // Get only the fields that have been updated
    const payload = getUpdatedFields(originalData, formData);

    // Skip submission if no updates are detected
    if (Object.keys(payload).length === 0) {
      ShowPopup(
        "No changes were detected!",
        ``,
        "question",
        5000,
        true
      );
      try {
        const uploadResponse = await uploadFile();
        console.log("Upload Response:", uploadResponse);
      } catch (error) {
        console.error("Error during file upload:", error);
        ShowPopup("File Upload Failed!", error.message, "error", 5000, true);
      }
      return;
    }

    console.log("Payload to Send: ", payload);

    // API Call to update user and upload file
    try {
      const [updateResponse, uploadResponse] = await Promise.all([
        updateUser({ variables: { where: { id }, data: payload } }),
        uploadFile(),
      ]);

      console.log("Update Response:", updateResponse);
      console.log("Upload Response:", uploadResponse);
      navigate("/users")
      ShowPopup(
        "Success!",
        `The profile of ${dataOnSubmit.firstName} has been successfully updated!`,
        "success",
        5000,
        true
      );
    } catch (error) {
      console.error("Error during user update or file upload:", error);
      const graphqlError = error.graphQLErrors[0];
      const message = GetErrorMessage(graphqlError.errorCode)
      ShowPopup("Update Failed!", message, "error", 5000, true);
    }
  };


  if (loading) return <AutobseLoading />;
  if (error) return <p>Error loading user details</p>;

  return (
    <div className={pageStyle.data}>
      <div className={`${headerStyle.data} `} >

        <h2 className={`${h2Style.data} flex-1 justify-center flex pl-8 `}>
          {data.user.firstName} {data.user.lastName}
        </h2>
        <EditButton isEditable={isEditable} handleEdit={handleEdit} />

      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={formStyle.data}>
          <InputFields
            disabled={!isEditable}
            required={true}
            label="First Name"
            register={register("firstName", {
              required: "First Name Required",
              onChange: (e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z]/g, "")
              },
            })}
            defaultValue={data.user.firstName}
            error={errors.first_Name}
          />
          <InputField
            register={register("lastName", {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z]/g, "")
              },
            })}
            disabled={!isEditable}
            label="Last Name"
            defaultValue={data.user.lastName}
            error={errors.last_Name}
          />
          <InputField
            disabled={!isEditable}
            label="Email"
            type="email"
            register={register("email")}
            defaultValue={data.user.email}
            error={errors.email}
          />
          <InputField
            label="Username"
            // register={register("user_Name")}
            defaultValue={data.user.username}
            error={errors.user_Name}
            disabled={true}
          />
          <InputField
            label="Mobile"
            register={register("mobile", {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "")
                if (e.target.value.length > 10) {
                  e.target.value = e.target.value.slice(0, 10)
                }
              },
            })}
            defaultValue={data.user.mobile}
            error={errors.mobile}
            disabled={true}
          />
          {/* <InputField label="Mobile" type="number" register={register("mobile", { required: "Mobile number is required", minLength: { value: 10, message: "Mobile number must be 10 digits" }, maxLength: { value: 10, message: "Mobile number must be 10 digits" } })} defaultValue={data.user.mobile} error={errors.mobile} /> */}
          <InputField
            disabled={!isEditable}
            label="Business Name"
            register={register("businessName")}
            defaultValue={data.user.businessName}
            error={errors.bussiness}
          />
          <InputField
            disabled={!isEditable}
            label="ID Proof Number"
            register={register("idProofNo", {
              pattern: {
                value: /^[0-9]{12}$/, // 10 digit phone number pattern
                message: "Please enter a valid 12-digit  number",
              },
            })}
            defaultValue={data.user.idProofNo}
            error={errors.idProofNo}
          />
          <InputFields
            disabled={!isEditable}
            required={true}
            error={errors.state}
            label="State"
            defaultValue={data?.user?.state}
            register={register("state", { required: "State is Required" })}
            component="select"
            options={indianStates}
          />
          {/* <InputField label="City" register={register("city")} defaultValue={data.user.city} error={errors.city} /> */}
          <PANCardInput
            disabled={!isEditable}
            label="Pancard No"
            name="pancardNo"
            register={register}
            clearErrors={clearErrors}
            defaultValue={data.user.pancardNo}
            error={errors.pancardNo}
            required
          />
          <InputFields
            disabled={!isEditable}
            label="Role"
            name="role"
            component="select"
            defaultValue={data.user.role}
            register={register("role")}
            error={errors.role}
            options={[
              { value: "admin", label: "Admin" },
              { value: "staff", label: "Staff" },
              { value: "seller", label: "Seller" },
              { value: "dealer", label: "Dealer" },
            ]}
          />

          <InputFields
            disabled={!isEditable}
            label="Status"
            name="status"
            component="select"
            defaultValue={data.user.status}
            register={register("status")}
            error={errors.status}
            options={[
              { value: "pending", label: "Pending" },
              { value: "blocked", label: "Blocked" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
          <div className="flex flex-col  w-full">
            <label className="font-bold" htmlFor="">
              Auction Allowed States <span className="text-red-600">*</span>
            </label>

            <Controller
              name="states"
              control={control}
              defaultValue={data?.user?.states.map((state) => ({
                label: state.name,
                value: state.id,
              }))}
              rules={{
                validate: (value) => value && value.length > 0 || "At least one state must be selected",
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder={!isEditable ? "" : "select..."}
                  // required={true}
                  isDisabled={!isEditable}
                  className="border border-black rounded-md w-full"
                  options={allStates?.data?.States?.map((state) => ({
                    label: state.name.split('_').join(' '),
                    value: state.id,
                  }))}
                  isMulti
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                />
              )}
            />

            <p className="text-red-500">
              {errors.states && <span>{errors.states.message}</span>}
            </p>

          </div>
          <div className="col-span-3  mt-4">
            <div className="col-span-3 gap-10 gap-y-6 grid grid-cols-3 mt-4">
              {Object.keys(imageLabels).map((key, index) => (
                <div>
                  <ImageUploadField
                    disabled={!isEditable}
                    label={imageLabels[key]}
                    preview={fileData[key]?.preview}
                    onEditClick={() =>
                      document.getElementById(`file-input-${index}`).click()
                    }
                    onUploadClick={() =>
                      document.getElementById(`file-input-${index}`).click()
                    }
                  />

                  {/* Image Preview or Gray Background */}
                  {/* {fileData[key]?.preview ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={fileData[key].preview}
                        alt={`${key} preview`}
                        className="object-cover w-full h-64 mt-2 rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute inset-0 h-64 mt-2  bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                        onClick={() =>
                          document.getElementById(`file-input-${index}`).click()
                        }
                      >
                        <FaEdit className="text-2xl" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-64 mt-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                      <button
                        type="button"
                        className="flex items-center justify-center text-gray-500"
                        onClick={() =>
                          document.getElementById(`file-input-${index}`).click()
                        }
                      >
                        <FaUpload className="text-2xl" />
                      </button>
                    </div>
                  )} */}

                  {/* Hidden Input */}
                  <input
                    disabled={!isEditable}
                    type="file"
                    accept="image/*"
                    id={`file-input-${index}`}
                    name={key}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center my-5 col-span-3">
          {isEditable && (
            <button type="submit" className={`${submit.data}`}>
              UPDATE{" "}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserDetailsComponent;

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
import {  faEdit,  faEyeSlash,} from "@fortawesome/free-solid-svg-icons";

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
    control,
  } = useForm();

  console.log(errors, "error");

  const [isUpload, setIsUpload] = useState(false);
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
        first_Name: data.user.firstName,
        last_Name: data.user.lastName,
        email: data.user.email,
        bussiness: data.user.businessName,
        pancardNumber: data.user.pancardNo,
        IdNumber: data.user.idProofNo,
        state: data.user.state,
        role: data.user.role,
        status: data.user.status,
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

    Object.keys(fileData).forEach((key) => {
      if (fileData[key].file) {
        formDataPayload.append(key, fileData[key].file);
      }
    });

    try {
      const response = await fetch(
        `https://api-dev.autobse.com/api/v1/fileupload/userprofile/${id}`,
        {
          method: "PUT",
          body: formDataPayload,
        }
      );
      if (!response.ok)
        throw new Error(`Image upload failed: ${response.status}`);
    } catch (error) {
      console.error("Error during document upload:", error);
    }
  };

  const onSubmit = async (dataOnSubmit) => {
    console.log("submit ", dataOnSubmit);

    const states =
      dataOnSubmit?.states?.length > 0
        ? dataOnSubmit.states.map((state) => state?.label)
        : undefined;

    // Creating the user object with conditional states inclusion
    const user = {
      firstName: dataOnSubmit?.first_Name,
      lastName: dataOnSubmit?.last_Name,
      email: dataOnSubmit?.email,
      // mobile: dataOnSubmit?.mobile,
      businessName: dataOnSubmit?.bussiness,
      pancardNo: dataOnSubmit?.pancardNumber,
      idProofNo: dataOnSubmit?.IdNumber,
      country: dataOnSubmit?.country,
      state: dataOnSubmit?.state,
      // city: dataOnSubmit?.city,
      status: dataOnSubmit?.status,
      role: dataOnSubmit?.role,
      ...(states && { states }), // Only add `states` if it has valid data
    };

    try {
      await updateUser({ variables: { where: { id }, data: user } });
      await uploadFile();
      ShowPopup(
        "Success!",
        `${dataOnSubmit.first_Name} updated successfully!`,
        "success",
        5000,
        true
      );
      navigate("/users"); // Reset form after success
    } catch (err) {
      ShowPopup("User Update Failed!", err.message, "error", 5000, true);
    }
  };

  if (loading) return <AutobseLoading />;
  if (error) return <p>Error loading user details</p>;

  return (
    <div className={pageStyle.data}>
      <div className={`${headerStyle.data} `} >
        <h2 className={`${h2Style.data} flex-1 justify-center flex pl-10 `}>
          {data.user.firstName} {data.user.lastName}
        </h2>
        <div className="   ">
        {!isEditable ? (
          <button
            onClick={handleEdit}
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 ml-5 transition-colors duration-300 place-content-end "
          >
            <FontAwesomeIcon icon={faEdit} className="" /> 
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="flex items-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 ml-5 transition-colors duration-300"
          >
           
            <FontAwesomeIcon icon={faEyeSlash} className="" /> 
          </button>
        )}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={formStyle.data}>
          <InputField
            disabled={!isEditable}
            label="First Name"
            register={register("first_Name", {
              required: "First Name is required",
            })}
            defaultValue={data.user.firstName}
            error={errors.first_Name}
          />
          <InputField
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
            // register={register("mobile")}
            defaultValue={data.user.mobile}
            error={errors.mobile}
            disabled={true}
          />
          {/* <InputField label="Mobile" type="number" register={register("mobile", { required: "Mobile number is required", minLength: { value: 10, message: "Mobile number must be 10 digits" }, maxLength: { value: 10, message: "Mobile number must be 10 digits" } })} defaultValue={data.user.mobile} error={errors.mobile} /> */}
          <InputField
            disabled={!isEditable}
            label="Business Name"
            register={register("bussiness")}
            defaultValue={data.user.businessName}
            error={errors.bussiness}
          />
          <InputField
            disabled={!isEditable}
            label="ID Proof Number"
            register={register("IdNumber", {
              pattern: {
                value: /^[0-9]{12}$/, // 10 digit phone number pattern
                message: "Please enter a valid 12-digit  number",
              },
            })}
            defaultValue={data.user.idProofNo}
            error={errors.IdNumber}
          />
          <InputFields
            disabled={!isEditable}
            required={true}
            error={errors.state}
            label="State"
            defaultValue={data?.user?.state}
            register={register("state", { required: "State is required" })}
            component="select"
            options={indianStates}
          />
          {/* <InputField label="City" register={register("city")} defaultValue={data.user.city} error={errors.city} /> */}
          <PANCardInput
            disabled={!isEditable}
            label="Pancard No"
            name="pancardNumber"
            register={register}
            defaultValue={data.user.pancardNo}
            error={errors.pancardNumber}
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
              Auction Allowed states
            </label>

            <Controller
              // disabled={!isEditable}
              name="states"
              // rules={{ required: "Please select at least one state" }}
              control={control}
              defaultValue={data?.user?.states.map((state) => ({
                label: state.name,
                value: state.id,
              }))}
              render={({ field }) => (
                <Select
                  isDisabled={!isEditable}
                  className={`border border-black fo rounded-md w-full focus:outline-none focus:ring`}
                  option=""
                  options={allStates?.data?.States?.map((state) => ({
                    label: state.name,
                    value: state.id,
                  }))}
                  {...field}
                  isMulti
                  getOptionValue={(option) => option.value}
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

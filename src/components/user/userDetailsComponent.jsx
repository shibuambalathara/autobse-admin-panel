import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useStatesQuery, useUpdateUserMutation, useViewUserQuery ,} from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import { formStyle, h2Style, headerStyle, inputStyle, labelAndInputDiv, pageStyle, submit } from "../utils/style";
import { indianStates } from "../../utils/data";
import { InputField } from "../utils/formField";
import imageCompression from "browser-image-compression";
import Select from "react-select";
import { FaEdit, FaUpload } from "react-icons/fa";


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
  const { register, handleSubmit, formState: { errors }, reset,control } = useForm();
  const [isUpload, setIsUpload] = useState(false);
  const [fileData, setFileData] = useState({
    pancard_image: { file: null, preview: null },
    aadharcard_front_image: { file: null, preview: null },
    aadharcard_back_image: { file: null, preview: null },
    driving_license_front_image: { file: null, preview: null },
    driving_license_back_image: { file: null, preview: null },
  });

  useEffect(() => {
    // Initialize the fileData state with existing images
    if (data) {
      setFileData({
        pancard_image: { file: null, preview: data.user.pancard_image || null },
        aadharcard_front_image: { file: null, preview: data.user.aadharcard_front_image || null },
        aadharcard_back_image: { file: null, preview: data.user.aadharcard_back_image || null },
        driving_license_front_image: { file: null, preview: data.user.driving_license_front_image || null },
        driving_license_back_image: { file: null, preview: data.user.driving_license_back_image || null },
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
      const response = await fetch(`https://api-dev.autobse.com/api/v1/fileupload/userprofile/${id}`, {
        method: "PUT",
        body: formDataPayload,
      });
      if (!response.ok) throw new Error(`Image upload failed: ${response.status}`);
    } catch (error) {
      console.error("Error during document upload:", error);
    }
  };

  const onSubmit = async (dataOnSubmit) => {
    const user = {
      firstName: dataOnSubmit?.first_Name,
      lastName: dataOnSubmit?.last_Name,
      email: dataOnSubmit?.email,
      mobile: dataOnSubmit?.mobile,
      businessName: dataOnSubmit?.bussiness,
      pancardNo: dataOnSubmit?.pancardNumber,
      idProofNo: dataOnSubmit?.IdNumber,
      country: dataOnSubmit?.country,
      state: dataOnSubmit?.state,
      city: dataOnSubmit?.city,
      status: dataOnSubmit?.status,
      role: dataOnSubmit?.role,
      states: 
          dataOnSubmit.states.map((state) => (state?.label )),
      
    };

    try {
      await updateUser({ variables: { where: { id }, data: user } });
       await uploadFile();
      ShowPopup("Success!", `${dataOnSubmit.first_Name} updated successfully!`, "success", 5000, true);
      navigate('/users') // Reset form after success
    } catch (err) {
      ShowPopup("User Update Failed!", err.message, "error", 5000, true);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user details</p>;

  return (
    <div className={pageStyle.data}>
      <div className={headerStyle.data}>
        <h2 className={h2Style.data}>
          {data.user.firstName} {data.user.lastName}
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={formStyle.data}>
          <InputField label="First Name" register={register("first_Name", { required: "First Name is required" })} defaultValue={data.user.firstName} error={errors.first_Name} />
          <InputField label="Last Name" register={register("last_Name", { required: "Last Name is required" })} defaultValue={data.user.lastName} error={errors.last_Name} />
          <InputField label="Email" type="email" register={register("email", { required: "Email is required" })} defaultValue={data.user.email} error={errors.email} />
          <InputField label="Username" register={register("user_Name")} defaultValue={data.user.username} error={errors.user_Name} disabled={true} />
          <InputField label="Mobile" register={register("mobile")} defaultValue={data.user.mobile} error={errors.mobile} disabled={true} />
          {/* <InputField label="Mobile" type="number" register={register("mobile", { required: "Mobile number is required", minLength: { value: 10, message: "Mobile number must be 10 digits" }, maxLength: { value: 10, message: "Mobile number must be 10 digits" } })} defaultValue={data.user.mobile} error={errors.mobile} /> */}
          <InputField label="Business Name" register={register("bussiness")} defaultValue={data.user.businessName} error={errors.bussiness} />
          <InputField label="ID Proof Number" register={register("IdNumber", )} defaultValue={data.user.idProofNo} error={errors.IdNumber} />
          <InputField label="State" register={register("state", { required: "State is required" })} defaultValue={data.user.state} component="select" options={indianStates} />
          <InputField label="City" register={register("city")} defaultValue={data.user.city} error={errors.city} />
          <InputField label="Pancard" register={register("pancardNumber")} defaultValue={data.user.pancardNo} error={errors.pancardNumber} />
          <div className={labelAndInputDiv.data}>
            <label>Role</label>
            <select className={inputStyle.data} {...register("role", { required: "Role is required" })}>
              <option value={data.user.role}>{data.user.role}</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="seller">Seller</option>
              <option value="dealer">Dealer</option>
            </select>
            <p className="text-red-500">{errors.role && <span>{errors.role.message}</span>}</p>
          </div>

          <div className={labelAndInputDiv.data}>
            <label>Status</label>
            <select defaultValue={data.user.status} className={inputStyle.data} {...register("status", { required: "Status is required" })}>
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="blocked">Blocked</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <p className="text-red-500">{errors.status && <span>{errors.status.message}</span>}</p>
          </div>
          <div className="flex flex-col  w-full">
                <label htmlFor="">Auction Allowed states</label>

                <Controller
                  name="states"
                  rules={{ required: "Please select at least one state" }} 
                  control={control}
                  defaultValue={data?.user?.states.map((state) => ({
                    label: state.name,
                    value: state.id,
                  }))}
                  render={({ field }) => (
                    <Select
                    
               className={`${inputStyle.data}`}
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
                 <p className="text-red-500">{errors.states && <span>{errors.states.message}</span>}</p>
              </div>
          <div className="col-span-3  mt-4">
           
           
          <div className="col-span-3 gap-10 gap-y-6 grid grid-cols-3 mt-4">
      {Object.keys(imageLabels).map((key, index) => (
        <div key={index} className="flex flex-col items-center  h-72 w-88 relative group">
          <label className="text-gray-700 text-sm font-bold mb-2">
            {imageLabels[key]} Image
          </label>

          {/* Image Preview or Gray Background */}
          {fileData[key]?.preview ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={fileData[key].preview}
                alt={`${key} preview`}
                className="object-cover w-full h-64 mt-2 rounded-lg"
              />
              <button
               type="button"
                className="absolute inset-0 h-64 mt-2  bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                onClick={() => document.getElementById(`file-input-${index}`).click()}
              >
                <FaEdit className="text-2xl" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-64 mt-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
              <button
              type="button"
                className="flex items-center justify-center text-gray-500"
                onClick={() => document.getElementById(`file-input-${index}`).click()}
              >
                <FaUpload className="text-2xl" />
              </button>
            </div>
          )}

          {/* Hidden Input */}
          <input
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
            <button type="submit"  className={`${submit.data}`} >UPDATE </button>
          </div>
      </form>
    </div>
  );
};

export default UserDetailsComponent;

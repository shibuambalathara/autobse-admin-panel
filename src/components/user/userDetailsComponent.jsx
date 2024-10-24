import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useStatesQuery, useUpdateUserMutation, useViewUserQuery } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import { formStyle, h2Style, headerStyle, inputStyle, labelAndInputDiv, pageStyle } from "../utils/style";
import { indianStates } from "../../utils/data";
import { FormFieldInput, InputField } from "../utils/formField";
import imageCompression from "browser-image-compression";
import Select from "react-select";
const UserDetailsComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { data, loading, error } = useViewUserQuery({
    variables: { where: { id } },
  });
  console.log(data, 'user');
  const allStates = useStatesQuery();
  const [updateUser] = useUpdateUserMutation();
  const { register, handleSubmit, formState: { errors }, reset ,control} = useForm();
  const [isUpload, setIsUpload] = useState(false);
  const [fileData, setFileData] = useState({ pancardImage: null, idProof: null, idBack: null ,licensfront:null ,licensBack:null});

   console.log(fileData,'file');
   
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
        setFileData((prevState) => ({
          ...prevState,
          [name]: compressedFile,
        }));
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };
  const uploadFile = async () => {
    const formDataPayload = new FormData();

    const appendIfExists = (field, file) => {
      if (file) formDataPayload.append(field, file);
    };

    appendIfExists("pancard_image", fileData?.pancardImage);
    appendIfExists("aadharcard_front_image", fileData?.idProofFront);
    appendIfExists("aadharcard_back_image", fileData?.idProofBack);
    appendIfExists("driving_license_front_image", fileData?.licensfront);
    appendIfExists("driving_license_back_image", fileData?.licensBack);
    try {
      const response = await fetch(`https://api-dev.autobse.com/api/v1/fileupload/userprofile/${id}`, {
        method: "PUT",
        body: formDataPayload,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.success) console.log("Document upload successful:", result);
    } catch (error) {
      console.error("Error during document upload:", error);
    }
  };

  const onSubmit = async (dataOnSubmit) => {
    const user = {
      firstName: dataOnSubmit?.first_Name,
      lastName: dataOnSubmit?.last_Name,
      email: dataOnSubmit?.email,
      // username: dataOnSubmit?.user_Name,
      mobile: dataOnSubmit?.mobile,
      businessName: dataOnSubmit?.bussiness,
      pancardNo: dataOnSubmit?.pancardNumber,
      idProofNo: dataOnSubmit?.IdNumber,
      country: dataOnSubmit?.country,
      state: dataOnSubmit?.state,
      city: dataOnSubmit?.city,
      status: dataOnSubmit?.status,
      role: dataOnSubmit?.role,
      // states: {
      //   set: dataOnSubmit.states.map((state) => ({ id: state.value })),
      // },
    };

    try {
      await updateUser({ variables: { where: { id }, data: user } });
     if (isUpload) await uploadFile();
      ShowPopup("Success!", `${dataOnSubmit.first_Name} updated successfully!`, "success", 5000, true);
      reset(); // Reset form after success
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
          <InputField label="Username" register={register("user_Name" )} defaultValue={data.user.username} error={errors.user_Name} disabled={true}/>
          <InputField label="Mobile" type="number" register={register("mobile", { required: "Mobile number is required", minLength: { value: 10, message: "Mobile number must be 10 digits" }, maxLength: { value: 10, message: "Mobile number must be 10 digits" } })} defaultValue={data.user.mobile} error={errors.mobile} />
          <InputField label="Business Name" register={register("bussiness")} defaultValue={data.user.businessName} error={errors.bussiness} />

          {/* <div className={labelAndInputDiv.data}>
            <label htmlFor="idType">ID Proof Type</label>
            <select {...register("idType", { required: "ID proof type is required" })} className={inputStyle.data}>
              <option value="">Select ID Proof Type</option>
              <option value="aadhar">Aadhar</option>
              <option value="drivingLicense">Driving License</option>
            </select>
            <p className="text-red-500">{errors.idType && <span>{errors.idType.message}</span>}</p>
          </div> */}

          <InputField label="ID Proof Number" register={register("IdNumber", { minLength: { value: 8, message: "ID proof number must be at least 8 characters" } })} defaultValue={data.user.idProofNo} error={errors.IdNumber} />
          <InputField label="State" register={register("state", { required: "State is required" })} defaultValue={data.user.state} component="select" options={indianStates} />
          <InputField label="City" register={register("city", )} defaultValue={data.user.city} error={errors.city} />
          <InputField label="Pancard" register={register("pancardNumber")} defaultValue={data.user.pancardNo} error={errors.pancardNumber} />
          {/* <div className="flex flex-col  w-full">
                <label htmlFor="">Auction Allowed states</label>

                <Controller
                  name="states"
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
              </div> */}
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
        <div className="col-span-3 grid grid-cols-2 gap-4 gap-y-10 mt-4">
  <div className="image-container aspect-h-1 aspect-w-1 h-48">
    <h2 className="text-lg font-bold mb-2">PAN Card</h2>
    <img src={data.user.pancard_image} alt="Pancard" class="object-cover w-full h-full rounded-lg" />
  </div>
  {data.user.aadharcard_front_image && (
    <div className="image-container aspect-h-1 aspect-w-1 h-48">
      <h2 className="text-lg font-bold mb-2">Aadhar Card Front</h2>
      <img src={data.user.aadharcard_front_image} alt="Aadhar Front" class="object-cover w-full h-full rounded-lg" />
    </div>
  )}
  {data.user.aadharcard_back_image && (
    <div className="image-container aspect-h-1 aspect-w-1 h-48">
      <h2 className="text-lg font-bold mb-2">Aadhar Card Back</h2>
      <img src={data.user.aadharcard_back_image} alt="Aadhar Back" class="object-cover w-full h-full rounded-lg" />
    </div>
  )}
  {data.user.driving_license_front_image && (
    <div className="image-container aspect-h-1 aspect-w-1 h-48">
      <h2 className="text-lg font-bold mb-2">Driving License Front</h2>
      <img src={data.user.driving_license_front_image} alt="Driving License Front" class="object-cover w-full h-full rounded-lg" />
    </div>
  )}
  {data.user.driving_license_back_image && (
    <div className="image-container aspect-h-1 aspect-w-1 h-48">
      <h2 className="text-lg font-bold mb-2">Driving License Back</h2>
      <img src={data.user.driving_license_back_image} alt="Driving License Back" class="object-cover w-full h-full rounded-lg" />
    </div>
  )}
</div>


<div className="col-span-3 grid grid-cols-2 gap-4 mt-4">
  <label className="flex items-center space-x-2 mt-5 justify-center col-span-3">
    <input
      type="checkbox"
      checked={isUpload}
      onChange={() => setIsUpload(!isUpload)}
      className="form-checkbox h-5 w-5 text-blue-600"
    />
    <span className="text-lg font-bold mb-1">Update Documents</span>
  </label>
  {isUpload && (
    <div className="col-span-3 gap-4 grid grid-cols-3 mt-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">PAN Card Image</label>
        <input
          type="file"
          name="pancardImage"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Aadhar Card Front</label>
        <input
          type="file"
          name="idProofFront"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Aadhar Card Back</label>
        <input
          type="file"
          name="idProofBack"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Driving License Front</label>
        <input
          type="file"
          name="licensfront"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Driving License Back</label>
        <input
          type="file"
          name="licensBack"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
      </div>
    </div>
  )}
</div>

        </div>
<div className="col-span-3 text-center  py-3">
<button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out " disabled={loading}>
  {loading ? "Uploading..." : "Submit"}
</button>
</div>
        

      </form>
    </div>
  );
};



export default UserDetailsComponent;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateUserMutation, useViewUserQuery } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import { formStyle, h2Style, headerStyle, inputStyle, labelAndInputDiv, pageStyle } from "../utils/style";
import { indianStates } from "../../utils/data";

const UserDetailsComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { data, loading, error } = useViewUserQuery({
    variables: { where: { id } },
  });

  const [updateUser] = useUpdateUserMutation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (dataOnSubmit) => {
    const user = {
      firstName: dataOnSubmit.first_Name,
      lastName: dataOnSubmit.last_Name,
      email: dataOnSubmit.email,
      username: dataOnSubmit.user_Name,
      mobile: dataOnSubmit.mobile,
      businessName: dataOnSubmit.bussiness,
      pancardNo: dataOnSubmit.pancardNumber,
      idProofNo: dataOnSubmit.IdNumber,
      country: dataOnSubmit.country,
      state: dataOnSubmit.state,
      city: dataOnSubmit.city,
      status: dataOnSubmit.status,
      role: dataOnSubmit.role
    };

    try {
      await updateUser({ variables: { where: { id }, data: user } });
      ShowPopup("Success!", `${dataOnSubmit.first_Name} updated successfully!`, "success", 5000, true);
      reset(); // Reset form after success
      navigate("/users");
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
          <InputField label="Username" register={register("user_Name", { required: "Username is required" })} defaultValue={data.user.username} error={errors.user_Name} />
          <InputField label="Mobile" type="number" register={register("mobile", { required: "Mobile number is required", minLength: { value: 10, message: "Mobile number must be 10 digits" }, maxLength: { value: 10, message: "Mobile number must be 10 digits" } })} defaultValue={data.user.mobile} error={errors.mobile} />
          <InputField label="Business Name" register={register("bussiness")} defaultValue={data.user.businessName} error={errors.bussiness} />
          
          <div className={labelAndInputDiv.data}>
            <label htmlFor="idType">ID Proof Type</label>
            <select {...register("idType", { required: "ID proof type is required" })} className={inputStyle.data}>
              <option value="">Select ID Proof Type</option>
              <option value="aadhar">Aadhar</option>
              <option value="drivingLicense">Driving License</option>
              <option value="passport">Passport</option>
            </select>
            <p className="text-red-500">{errors.idType && <span>{errors.idType.message}</span>}</p>
          </div>

          <InputField label="ID Proof Number" register={register("IdNumber", { minLength: { value: 8, message: "ID proof number must be at least 8 characters" } })} defaultValue={data.user.idProofNo} error={errors.IdNumber} />
          <InputField label="State" register={register("state", { required: "State is required" })} defaultValue={data.user.state} component="select" options={indianStates} />
          <InputField label="City" register={register("city", { required: "City is required" })} defaultValue={data.user.city} error={errors.city} />
          <InputField label="Pancard" register={register("pancardNumber")} defaultValue={data.user.pancardNo} error={errors.pancardNumber} />
          <InputField label="Country" register={register("country", { required: "Country is required" })} defaultValue={data.user.country} error={errors.country} />
          
          <div className={`${labelAndInputDiv.data}`}>
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

          <div className={`${labelAndInputDiv.data}`}>
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

          
        </div>
        <button type="submit" className="px-4 py-2 border-2 rounded-lg text-white bg-blue-600 text-center w-full ">Update User</button>
      </form>
    </div>
  );
};

const InputField = ({ label, register, defaultValue, error, type = "text", component = "input", options }) => {
  return (
    <div className={labelAndInputDiv.data}>
      <label>{label}</label>
      {component === "select" ? (
        <select {...register} defaultValue={defaultValue} className={inputStyle.data}>
          <option value="">Select</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <input type={type} {...register} defaultValue={defaultValue} className={inputStyle.data} />
      )}
      <p className="text-red-500">{error && <span>{error.message}</span>}</p>
    </div>
  );
};

export default UserDetailsComponent;

import React from 'react';
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import { useSellerQuery, useUpdateSellerMutation } from '../../utils/graphql';
import { ShowPopup } from '../alerts/popUps';

interface SellerFormInputs {
  sellerCompanyName: string;
  billingContactPerson: string;
  contactPerson: string|null|undefined;
  GSTNumber: string;
  mobile: string;
  nationalHead: string;
  logo:string;
}

const InputField = ({
  label,
  defaultValue,
  register,
  errors,
  fieldName,
  type = "text",
  errorMessage = "This field is required",
}: {
  label: string;
  defaultValue: string | undefined|null;
  register: any;
  errors: any;
  fieldName: string;
  type?: string;
  errorMessage?: string;
}) => (
  <div className="w-full sm:w-1/2 px-2">
    <label className="block text-white mb-2">{label}</label>
    <input
      defaultValue={defaultValue}
      type={type}
      className="input input-bordered w-full text-black bg-white"
      {...register(fieldName, { required: true })}
    />
    {errors[fieldName] && <p className="text-red-500">{errorMessage}</p>}
  </div>
);

const Editseller = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading } = useSellerQuery({
    variables: { where: { id: id } },
  });
console.log(data);

  const [EditSeller] = useUpdateSellerMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SellerFormInputs>();

  const onSubmit = async (dataOnSubmit: SellerFormInputs) => {
    try {
      await EditSeller({
        variables: {
          where: { id },
          updateSellerInput: {
            name: dataOnSubmit.sellerCompanyName,
            billingContactPerson: dataOnSubmit.billingContactPerson,
            contactPerson: dataOnSubmit.contactPerson,
            GSTNumber: dataOnSubmit.GSTNumber,
            mobile: dataOnSubmit.mobile,
            nationalHead: dataOnSubmit.nationalHead,
          }
        }
      });
      ShowPopup("Success!", `${dataOnSubmit.sellerCompanyName} Updated successfully!`, "success", 5000, true);
      navigate('/sellers');
    } catch (error: any) {
      ShowPopup("Failed!", `${error?.message || 'Unknown error occurred'}`, "error", 5000, true);
    }
    reset();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-blue-800 p-6 rounded-lg shadow-lg text-white max-w-3xl mx-auto">
      <div className="py-4 bg-blue-700 rounded px-4 text-center shadow-lg">
        <h2 className="text-2xl font-bold">Seller: {data?.seller?.name}</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <div className="flex flex-wrap">
          <InputField
            label="Seller Name"
            defaultValue={data?.seller?.name}
            register={register}
            errors={errors}
            fieldName="sellerCompanyName"
            errorMessage="Seller name is required"
          />
          <InputField
            label="Contact Person Name"
            defaultValue={data?.seller?.contactPerson}
            register={register}
            errors={errors}
            fieldName="contactPerson"
            errorMessage="Contact person name is required"
          />
        </div>

        <div className="flex flex-wrap">
          <InputField
            label="GST Number"
            defaultValue={data?.seller?.GSTNumber}
            register={register}
            errors={errors}
            fieldName="GSTNumber"
            errorMessage="GST number is required"
          />
          <InputField
            label="Mobile"
            defaultValue={data?.seller?.mobile}
            register={register}
            errors={errors}
            fieldName="mobile"
            type="tel"
            errorMessage="Mobile number is required"
          />
        </div>

        <div className="flex flex-wrap">
          <InputField
            label="National Head"
            defaultValue={data?.seller?.nationalHead}
            register={register}
            errors={errors}
            fieldName="nationalHead"
          />
          <InputField
            label="Billing Contact Person"
            defaultValue={data?.seller?.billingContactPerson}
            register={register}
            errors={errors}
            fieldName="billingContactPerson"
          />
          <InputField
            label="Billing Contact Person"
            defaultValue={data?.seller?.logo}
            register={register}
            errors={errors}
            fieldName="Logo"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-primary bg-white text-blue-700 px-6 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>  
  );
};

export default Editseller;

import React from 'react';
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import { useSellerQuery, useUpdateSellerMutation } from '../../utils/graphql';
import { ShowPopup } from '../alerts/popUps';
import { formStyle, h2Style, headerStyle, pageStyle, submit } from '../utils/style';
import { FormFieldInput } from '../utils/formField';

interface SellerFormInputs {
  sellerCompanyName: string;
  billingContactPerson: string;
  contactPerson: string | null | undefined;
  GSTNumber: string;
  mobile: string;
  nationalHead: string;
  logo: string;
}

const Editseller = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading } = useSellerQuery({
    variables: { where: { id: id } },
  });

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
            logo: dataOnSubmit.logo,
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
    <div className={`${pageStyle.data}`}>
      <div className={`${headerStyle.data}`}>
        <h2 className={`${h2Style.data}`}>
          Seller: {data?.seller?.name}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={`${formStyle.data}`}>
       
          <FormFieldInput
            label="Seller Name"
            defaultValue={data?.seller?.name}
            register={register}
            name="sellerCompanyName"
            error={errors.sellerCompanyName}
            type="text"
          />
          <FormFieldInput
            label="Contact Person Name"
            defaultValue={data?.seller?.contactPerson}
            register={register}
            name="contactPerson"
            error={errors.contactPerson}
            type="text"
          />
       

       
          <FormFieldInput
            label="GST Number"
            defaultValue={data?.seller?.GSTNumber}
            register={register}
            name="GSTNumber"
            error={errors.GSTNumber}
            type="text"
          />
          <FormFieldInput
            label="Mobile"
            defaultValue={data?.seller?.mobile}
            register={register}
            name="mobile"
            error={errors.mobile}
            type="tel"
          />
       

       
          <FormFieldInput
            label="National Head"
            defaultValue={data?.seller?.nationalHead}
            register={register}
            name="nationalHead"
            error={errors.nationalHead}
            type="text"
          />
          <FormFieldInput
            label="Billing Contact Person"
            defaultValue={data?.seller?.billingContactPerson}
            register={register}
            name="billingContactPerson"
            error={errors.billingContactPerson}
            type="text"
          />
          <FormFieldInput
            label="Logo URL"
            defaultValue={data?.seller?.logo}
            register={register}
            name="logo"
            error={errors.logo}
            type="url"
          />
      

        <div className="flex justify-center col-span-3">
          <button
            type="submit"
            className={`${submit.data}   `} 
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editseller;

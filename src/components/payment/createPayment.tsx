import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useViewUserQuery, useCreatePaymentMutation, PaymentType, PaymentStatusType } from '../../utils/graphql';
import { ShowPopup } from '../alerts/popUps';
import { formStyle, h2Style, headerStyle, inputStyle, labelAndInputDiv, pageStyle, submit } from '../utils/style';
import { InputFields, SelectInput } from '../utils/formField';
import { paymentsFor } from '../utils/constantValues';
import FileInput from '../utils/fileInputs';

interface PaymentFormInput {
  amount: number;
  description: string;
  paymentFor: PaymentType;
  paymentStatus: string;
  imgForPaymentProof?: FileList;
}

const CreatePayment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useViewUserQuery({ variables: { where: { id: id } } });
  const [addAmount] = useCreatePaymentMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormInput>();

  const uploadDocuments = async (formData: PaymentFormInput, userId: string) => {
    if (!formData.imgForPaymentProof || formData.imgForPaymentProof.length === 0) {
      ShowPopup("Error", "Please upload a payment proof image.", "error", 5000, true);
      return;
    }

    const formDataPayload = new FormData();
    formDataPayload.append("image", formData.imgForPaymentProof[0]);

    try {
      const response = await fetch(`https://api-dev.autobse.com/api/v1/fileupload/paymentImg/${userId}`, {
        method: "PUT",
        body: formDataPayload,
      });

      if (!response.ok) throw new Error(`Image upload failed: ${response.status}`);
      const result = await response.json();

      navigate('/users');
    } catch (error: any) {
      console.error("Error during document upload:", error);
      ShowPopup("Failed!", `Document upload failed: ${error.message}`, "error", 5000, true);
    }
  };


  const onSubmit: SubmitHandler<PaymentFormInput> = async (dataOnSubmit) => {
    const createPaymentInput = {
      amount: +dataOnSubmit.amount,
      description: dataOnSubmit.description || "",
      status: dataOnSubmit.paymentStatus as PaymentStatusType, // Cast to PaymentStatusType
      paymentFor: dataOnSubmit.paymentFor,
    };

    const submissionData = {
      createPaymentInput: createPaymentInput,
      userId: id
    };

    try {
      const result = await addAmount({ variables: submissionData });


      if (result) {
        const newUserId = result.data?.createPayment?.id;
        if (newUserId) {
          await uploadDocuments(dataOnSubmit, newUserId);
        }
        navigate('/users')
        ShowPopup("Success!", `Payment created successfully!`, "success", 5000, true);
      }
    } catch (error: any) {
      ShowPopup("Failed!", `${error.message}`, "error", 5000, true);
    }
  };
  return (
    <div className={`${pageStyle.data}`}>
      <div className={`${headerStyle.data}`}>
        <h2 className={`${h2Style.data}`}>
          Create Payment For {data?.user?.firstName} {data?.user?.lastName}
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyle.data}`}>
          <div className={`${labelAndInputDiv.data}`}>
          <InputFields
            label="Amount"
            component='number'
            error={errors.description}
            register={register("amount", {
              required: true,
              onChange: (e) => {
                const limit = 8
                e.target.value = e.target.value.replace(/[^0-9]/g,"")
                if (e.target.value.length > limit) {
                  e.target.value = e.target.value.slice(0, limit)
                }
              },
            })}
            {...(undefined as any)}
          />
          </div>
           
    

          <div className={`${labelAndInputDiv.data}`}>
            <SelectInput
              required
              label="Payment For"
              name="paymentFor"
              options={paymentsFor}
              register={register}
              defaultValue="Select Payment For"
              error={errors.paymentFor}
            />

          </div>



            <InputFields
          
              label="Description"
              error={errors.description}
              {...register("description")}
              {...(undefined as any)}
            />
      

          <div className={`${labelAndInputDiv.data}`}>
          <InputFields
            label="Payment Status"
            component="select"
            options={[
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ]}
            register={register("paymentStatus", {
              required: "Please select payment status",
            })}
            {...(undefined as any)}
            error={errors.paymentStatus}
          />
          </div>

          <FileInput label="Payment Proof Image" accept="image/*"
            maxSizeMB={1} register={register("imgForPaymentProof")} fieldName="imgForPaymentProof" required={false} />
        {/* </div> */}
        </div>

        <div className="flex justify-center my-5">
          <button type="submit" className={`${submit.data}`}>
            Save
          </button>
        </div>
      
      </form>
    </div>
  );
};

export default CreatePayment;



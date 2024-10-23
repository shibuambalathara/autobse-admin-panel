import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useViewUserQuery, useCreatePaymentMutation } from '../../utils/graphql';
import { ShowPopup } from '../alerts/popUps';
import { formStyle, h2Style, headerStyle, inputStyle, labelAndInputDiv, pageStyle, submit } from '../utils/style';
import { SelectInput } from '../utils/formField';
import { paymentsFor } from '../utils/constantValues';

interface PaymentFormInput {
  amount: number;
  description: string;
  paymentFor: string;
  paymentStatus: string;
  imgForPaymentProof?: FileList;
}

const CreatePayment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useViewUserQuery({ variables: { where: { id: id } } });
  const [addAmount] = useCreatePaymentMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormInput>();

  const onSubmit: SubmitHandler<PaymentFormInput> = async (dataOnSubmit) => {
    // Constructing the data based on the updated input structure
    const createPaymentInput: any = {
      amount: +dataOnSubmit.amount,
      description: dataOnSubmit.description || "",
      status: dataOnSubmit.paymentStatus,
      paymentFor: dataOnSubmit.paymentFor,
      image: "",
    };

    if (dataOnSubmit.imgForPaymentProof && dataOnSubmit.imgForPaymentProof.length) {
      createPaymentInput.image = { upload: dataOnSubmit.imgForPaymentProof[0] };
    }

    const submissionData = {
      createPaymentInput: createPaymentInput,
      userId: id
    };

    try {
      const result = await addAmount({ variables: submissionData  });
      if (result) {
        ShowPopup("Success!", `${dataOnSubmit.paymentFor} created successfully!`, "success", 5000, true);
        navigate('/payment');
      }
    } catch (error: any) {
      ShowPopup("Failed!", `${error.message}`, "failed", 5000, true);
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
          {/* <div className={`${labelAndInputDiv.data}`}>
            <label>User Name</label>
            <input
              value={data?.user?.firstName}
              disabled
              type="text"
              className={`${inputStyle.data}`}
              {...register("IdNumber", { minLength: 8 })}
            />
            {errors.IdNumber && <p className="text-red-500">At least 8 characters required</p>}
          </div> */}

          {/* <div className={`${labelAndInputDiv.data}`}>
            <label>User ID</label>
            <input
              value={data?.user.}
              disabled
              type="text"
              className={`${inputStyle.data}`}
              {...register("IdNumber", { minLength: 8 })}
            />
            {errors.IdNumber && <p className="text-red-500">At least 8 characters required</p>}
          </div> */}

          <div className={`${labelAndInputDiv.data}`}>
            <label>Amount</label>
            <input
              type="number"
              className={`${inputStyle.data}`}
              {...register("amount", { required: true })}
            />
            {errors.amount && <p className="text-red-500">Amount is required</p>}
          </div>

          <div className={`${labelAndInputDiv.data}`}>
            <SelectInput
              label="Payment For"
              name="paymentFor"
              options={paymentsFor}
              register={register}
              defaultValue="" // You can set a default value here, e.g., an empty string or the first option
              error={errors.paymentFor ? "This field cannot be empty" : null}
            />
            {errors.paymentFor && <p className="text-red-500">This field cannot be empty</p>}
          </div>

          <div className={`${labelAndInputDiv.data}`}>
            <label>Description</label>
            <input
              type="text"
              className={`${inputStyle.data}`}
              {...register("description")}
            />
          </div>

          <div className={`${labelAndInputDiv.data}`}>
            <label>Payment Status</label>
            <select
              className={`${inputStyle.data}`}
              {...register("paymentStatus")}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            {errors.paymentStatus && <p className="text-red-500">Please select payment status</p>}
          </div>

          <div className={`${labelAndInputDiv.data}`}>
            <label>Payment Proof Image</label>
            <input
              type="file"
              className={`${inputStyle.data}`}
              {...register("imgForPaymentProof")}
            />
          </div>
        </div>

        <div className="flex justify-center my-5">
          <button type="submit"  className={`${submit.data}`}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePayment;

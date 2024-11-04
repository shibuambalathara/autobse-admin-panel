import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { useViewUserQuery, useUpdatePaymentMutation, usePaymentQuery } from '../../utils/graphql'
import { ShowPopup } from '../alerts/popUps';
import { formStyle, h2Style, headerStyle, inputStyle, labelAndInputDiv, pageStyle, submit } from '../utils/style';
import { SelectInput } from '../utils/formField';
import { paymentsFor } from '../utils/constantValues';
import { getS3ObjectUrl } from '../utils/aws-config';

const UpdatePayment = () => {
  const [paymentUrl, setPaymentUrl] = useState('');
  const { id } = useParams();
  const { data, loading, error } = useViewUserQuery({ variables: { where: { id: id } } });
  const payment = usePaymentQuery({ variables: { where: { id: id } } });
  const [addAmount] = useUpdatePaymentMutation();
  const navigate = useNavigate();

  const fetchImage = async () => {
    if (payment?.data?.payment?.image) {
      setPaymentUrl(payment?.data?.payment?.image);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [payment]);

  const uploadFile = async (dataOnSubmit) => {
    if (dataOnSubmit?.imgForPaymentProof?.[0]) {
      const formDataPayload = new FormData();
      formDataPayload.append("image", dataOnSubmit.imgForPaymentProof[0]);
      try {
        const response = await fetch(`https://api-dev.autobse.com/api/v1/fileupload/paymentImg/${id}`, {
          method: "PUT",
          body: formDataPayload,
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        if (result?.success) {
          setPaymentUrl(result?.res?.image); // Update with new image URL after successful upload
          // ShowPopup("Success!", "Document upload successful", "success", 5000, true);
        }
      } catch (error) {
        console.error("Error during document upload:", error);
        ShowPopup("Error!", "Error during document upload", "error", 5000, true);
      }
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (payment?.data?.payment) {
      const { amount, paymentFor, description, status } = payment.data.payment;
      setValue('amount', amount);
      setValue('paymentFor', paymentFor);
      setValue('description', description);
      setValue('paymentStatus', status);

      if (payment?.data?.payment?.image?.url) {
        getS3ObjectUrl(payment.data.payment.image.url).then(setPaymentUrl);
      }
    }
  }, [payment, setValue]);

  const onSubmit = async (dataOnSubmit) => {
    const updateInput = {
      amount: +dataOnSubmit.amount,
      paymentFor: dataOnSubmit?.paymentFor,
      status: dataOnSubmit?.paymentStatus,
      description: dataOnSubmit?.description,
    };
    try {
      const result = await addAmount({ variables: { updatePaymentInput: updateInput, where:{id: id}  } });
      if (result) {
        ShowPopup("Success!", `${dataOnSubmit?.paymentFor} updated successfully!`, "success", 5000, true);
        await uploadFile(dataOnSubmit); // Call uploadFile after successful mutation
      }
    } catch (error) {
      ShowPopup("Error!", `${error.message} `, "error", 5000, true);
    }
  };

  return (
    <div className={`${pageStyle.data}`}>
      <div className={`${headerStyle.data}`}>
        <h2 className={`${h2Style.data}`}>
          Update Payment Of {payment?.data?.payment?.user?.firstName} {payment?.data?.payment?.user?.lastName}
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyle.data}`}>
          <div className={`${labelAndInputDiv.data}`}>
            <label>First Name</label>
            <input value={payment?.data?.payment?.user?.firstName} disabled type="text" className={`${inputStyle.data}`} />
          </div>
          <div className={`${labelAndInputDiv.data}`}>
            <label>User Name</label>
            <input value={payment?.data?.payment?.user?.username} disabled type="text" className={`${inputStyle.data}`} />
          </div>
          <div className={`${labelAndInputDiv.data}`}>
            <label>Amount</label>
            <input defaultValue={payment?.data?.payment?.amount} type="number" className={`${inputStyle.data}`} {...register("amount")} />
            <p className="text-red-500">{errors.amount && <span>Amount Required</span>}</p>
          </div>
          <div className={`${labelAndInputDiv.data}`}>
            <SelectInput
              label="Payment For"
              name="paymentFor"
              defaultValue={payment?.data?.payment?.paymentFor}
              options={paymentsFor}
              register={register}
            />
            <p className="text-red-500">{errors.paymentFor && <span>This field cannot be empty</span>}</p>
          </div>
          <div className={`${labelAndInputDiv.data}`}>
            <label>Description</label>
            <input defaultValue={payment?.data?.payment?.description} type="text" className={`${inputStyle.data}`} {...register("description")} />
          </div>
          <div className={`${labelAndInputDiv.data}`}>
            <label htmlFor="paymentStatus">Payment Status</label>
            <select className={`${inputStyle.data}`} {...register("paymentStatus", { required: "Please select payment status" })}>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <p className="text-red-500">{errors.paymentStatus && <span>{errors.paymentStatus.message}</span>}</p>
          </div>
          <div className={`${labelAndInputDiv.data}`}>
            <label>Payment Proof Image</label>
            <div>
              <img className={`${inputStyle.data} h-40`} src={paymentUrl} alt="Payment Proof" />
              <input type="file" className={`${inputStyle.data}`} {...register("imgForPaymentProof")} />
            </div>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <button type="submit" className={`${submit.data}`}>Save Changes</button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePayment;

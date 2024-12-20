import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdatePaymentMutation, usePaymentQuery } from '../../utils/graphql'
import { ShowPopup } from '../alerts/popUps';
import { formStyle, h2Style, headerStyle, inputStyle,  pageStyle, submit } from '../utils/style';
import { InputFields, } from '../utils/formField';
import { paymentsFor } from '../utils/constantValues';
import { getS3ObjectUrl } from '../utils/aws-config';
import FileInput from '../utils/fileInputs';

const UpdatePayment = () => {
  const navigate = useNavigate()
  const [paymentUrl, setPaymentUrl] = useState('');
  const { id } = useParams();
  const [userId, pathname, pathId] = id.split("-")


  // const { data, loading, error } = useViewUserQuery({ variables: { where: { id: id } } });
  const payment = usePaymentQuery({ variables: { where: { id: userId } } });
  const [addAmount] = useUpdatePaymentMutation();
  // const navigate = useNavigate();

  const fetchImage = async () => {
    if (payment?.data?.payment?.image) {
      setPaymentUrl(payment?.data?.payment?.image);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [payment]);

  const uploadFile = async (dataOnSubmit) => {
    console.log("image", dataOnSubmit?.imgForPaymentProof?.[0]);

    const file = dataOnSubmit?.imgForPaymentProof?.[0];
    if (!file) return;
    const formDataPayload = new FormData();
    formDataPayload.append("image", dataOnSubmit?.imgForPaymentProof[0]);
    try {
      const response = await fetch(`https://api-dev.autobse.com/api/v1/fileupload/paymentImg/${userId}`, {
        method: "PUT",
        body: formDataPayload,
      });
      if (!response.ok) throw new Error(`Image upload failed: ${response.status}`);
      const result = await response.json();
      console.log(result, 'res');

      if (result?.success) {
        setPaymentUrl(result?.res?.image); // Update with new image URL after successful upload
        // ShowPopup("Success!", "Document upload successful", "success", 5000, true);
      }

    } catch (error) {
      console.error("Error during document upload:", error);
      ShowPopup("Error!", "Error during document upload", "error", 5000, true);
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
      if (payment.data.payment.image?.url) {
        getS3ObjectUrl(payment.data.payment.image.url)
          .then(setPaymentUrl)
          .catch((error) => console.error("Error fetching S3 image URL:", error));
      }
    }
  }, [payment, setValue]);

  const onSubmit = async (dataOnSubmit) => {
    const updateInput = {
      amount: dataOnSubmit.amount,
      paymentFor: dataOnSubmit?.paymentFor,
      status: dataOnSubmit?.paymentStatus,
      description: dataOnSubmit?.description,
    };
    try {
      const result = await addAmount({ variables: { updatePaymentInput: updateInput, where: { id: userId } } });
      if (result) {


        ShowPopup("Success!", `${dataOnSubmit?.paymentFor} updated successfully!`, "success", 5000, true);
        await uploadFile(dataOnSubmit);
        payment.refetch()

        switch (pathname) {
          case 'payment_per_user':
            navigate(`/payment/${pathId}`)
            break;
          case 'vehicle_buy_limit':
            navigate(`/buying-limit/${pathId}`)
            break;
          default:
            console.log('show error page')
            break;
        }
        // Call uploadFile after successful mutation
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
          {/* First Name */}
          <InputFields
            label="First Name"
            defaultValue={payment?.data?.payment?.user?.firstName}
            type="text"
            disabled
          />

          {/* User Name */}
          <InputFields
            label="User Name"
            defaultValue={payment?.data?.payment?.user?.username}
            type="text"
            disabled
          />

          {/* Amount */}
          <InputFields
            label="Amount"
            defaultValue={payment?.data?.payment?.amount}
            // type="text"
            component='number'
            register={register("amount", {
              required: true,
              pattern: {
                value: /^\d+$/, 
                message: "Amount must be an integer number"
              },
            })}
            error={errors.amount} // Display the error message
            
          />

          {/* Payment For */}
          <InputFields
            label="Payment For"
            defaultValue={payment?.data?.payment?.paymentFor}
            component="select"
            options={paymentsFor}
            register={register("paymentFor", { required: "This field cannot be empty" })}
            error={errors.paymentFor}
            disabled
          />

          {/* Description */}
          <InputFields
            label="Description"
            defaultValue={payment?.data?.payment?.description}
            type="text"
            register={register("description")}
          />

          {/* Payment Status */}
          <InputFields
            label="Payment Status"
            component="select"
            defaultValue={payment?.data?.payment?.paymentStatus || "pending"}
            options={[
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ]}
            register={register("paymentStatus", {
              required: "Please select payment status",
            })}
            error={errors.paymentStatus}
          />

          {/* Payment Proof Image */}
          <div className="flex flex-col">

            {paymentUrl &&
              <><label className="font-bold">Payment Proof Image</label>
                <img className={`${inputStyle.data} h-40`} src={paymentUrl} alt="Payment Proof" />
              </>}
            <FileInput label="Update Payment Proof Image" accept="image/*"
              maxSizeMB={1} register={register("imgForPaymentProof")} fieldName="imgForPaymentProof" required={false} />

            {/* <InputFields
            type="file"
            register={register("imgForPaymentProof")}
          /> */}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center my-5">
          <button type="submit" className={`${submit.data}`}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePayment;

import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import{useViewUserQuery,useUpdatePaymentMutation,usePaymentQuery} from '../../utils/graphql'
import { ShowPopup } from '../alerts/popUps';
import { formStyle, h2Style, headerStyle, inputStyle, labelAndInputDiv, pageStyle } from '../utils/style';
import { SelectInput } from '../utils/formField';
import { paymentsFor } from '../utils/constantValues';
import { getS3ObjectUrl } from '../utils/aws-config';
const UpdatePayment = () => {
  const [paymentUrl,setPaymentUrl]=useState('')
  const {id}=useParams()
  const { data, loading, error } = useViewUserQuery({variables: { where: { id: id } }});
  const payment = usePaymentQuery({variables: { where: { id: id } }});
  console.log(payment,"PAYMNT");
  
  const [addAmount]=useUpdatePaymentMutation({variables: { where: { id: id } }})
 const navigate=useNavigate()

//  const fetchImage = async () => {
//  if(payment?.data?.payment?.image?.url){
//   const url= await getS3ObjectUrl(payment?.data?.payment?.image?.url);
//   setPaymentUrl(url)
// }
//  }


//  console.log("payment url",payment?.data?.payment?.image?.url)
// useEffect(() => {
// fetchImage();
// }, [payment]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async(dataOnSubmit) =>{ 
 
  const amount={
   
      amount:+dataOnSubmit.amount,
 paymentFor:dataOnSubmit?.paymentFor,
 status:dataOnSubmit?.paymentStatus,
 description:dataOnSubmit?.description
    

  }
  
  // if(dataOnSubmit.imgForPaymentProof && dataOnSubmit.imgForPaymentProof.length){
  //  amount["image"] = { upload: dataOnSubmit.imgForPaymentProof[0] }
  // } 
  try {
    const result =addAmount({variables: {updatePaymentInput:amount,id:id}})
    if(result){
      ShowPopup("Success!", `${dataOnSubmit?.paymentFor} updated successfully!`, "success", 5000, true);
  //  navigate(`/payment/${payment?.data?.payment?.user?.id}`)

    }
  } catch (error) {
    ShowPopup("Error!", `${error.message} `, "error", 50000, true);
  }
  
  
  };


  // if (loading ||payment?.loading) {

  //   return <div>Loading............</div>;
  // }
  return (
    <div className={`${pageStyle.data}`}>
      <div className={`${headerStyle.data}`}>
        <h2 className={`${h2Style.data}`}>Update Payment Of {payment?.data?.payment?.user?.firstName} {payment?.data?.payment?.user?.lastName}
        </h2>
         </div>
      <form onSubmit={handleSubmit(onSubmit)} >
      <div className={`${formStyle.data}`}>
          
      <div className={`${labelAndInputDiv.data}`}>
              <label htmlFor="">First Name</label>
              <input  value={payment?.data?.payment?.user?.firstName} disabled  type="text"  className={`${inputStyle.data}`} {...register("IdNumber", {minLength:8 })}></input>
              <p className="text-red-500"> {errors.IdNumber && <span>Atleast 8 charators required</span>}</p>
            </div>

            <div className={`${labelAndInputDiv.data}`}>
              <label htmlFor="">User Name</label>
              <input value={payment?.data?.payment?.user?.username} disabled  type="text"  className={`${inputStyle.data}`} {...register("IdNumber", {minLength:8 })}></input>
              <p className="text-red-500"> {errors.IdNumber && <span>Atleast 8 charators required</span>}</p>
            </div>
            
        

       
          
            <div className={`${labelAndInputDiv.data}`}>
            <label htmlFor="">Amount</label>
            <input defaultValue={payment?.data?.payment?.amount}  type="number"  className={`${inputStyle.data}`} {...register("amount", {})}></input>
            <p className="text-red-500"> {errors.amount && <span>Amount Required</span>}</p>
          </div>
          <div className={`${labelAndInputDiv.data}`}>
          <SelectInput label="Payment For" name="paymentFor" defaultValue={payment?.data?.payment?.paymentFor} options={paymentsFor} register={register}/>

    <p className="text-red-500"> {errors.paymentFor && <span>This field cannot empty</span>}</p>

          </div>
     

        
          
          <div className={`${labelAndInputDiv.data}`}>
            <label htmlFor="">Description</label>
            <input defaultValue={payment?.data?.payment?.description}  type="text" className={`${inputStyle.data}`} {...register("description", { })}></input>
            {/* <p className="text-red-500"> {errors.description && <span>Atleast 8 charators required</span>}</p> */}
          </div>
          <div className={`${labelAndInputDiv.data}`}>
            <label htmlFor="">Payment Status</label>
            <select  defaultValue={payment?.data?.payment?.status}    className={`${inputStyle.data}`} {...register("paymentStatus", {})}>
            <option value={payment?.data?.payment?.status}>{payment?.data?.payment?.status}</option>
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
      
    
    </select>
    <p className="text-red-500"> {errors.paymentStatus && <span>Please select Id proof type</span>}</p>

          </div>


          
      
          <div className={`${labelAndInputDiv.data}`}>

              <label  htmlFor="">Payment proof Image</label>
         
        <div className=" ">
             

              <img
                 className={`${inputStyle.data} h-40`}
                 src={paymentUrl}
                alt={paymentUrl}
              />
               <input type="file"  className={`${inputStyle.data}`} {...register("imgForPaymentProof", { })}></input>
            </div>
</div>
</div>
<div className=" flex justify-center my-5">
          <button
            type="submit" 
            className="btn btn-outline btn-primary px-10"
          >Save Changes </button>
        </div>
        </form>
    </div>
  )
}

export default UpdatePayment
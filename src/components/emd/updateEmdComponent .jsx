import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import{useCreateEmdUpdateMutation, useEmdDetailsQuery, useEmdUpdateQuery, usePaymentDetailsQuery, useUpdatePaymentMutation} from '../../utils/graphql'

const UpdateEmdComponent = () => {
  const {id}=useParams()
  const { data, loading, error } =useEmdUpdateQuery ({variables:{where:{id}}});

  


if(data){
  
}
        
  const [addEmd]=useCreateEmdUpdateMutation()
 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (dataOnSubmit) =>{  
const buyingLmt={
payment:{connect:{id}},
 vehicleBuyingLimitIncrement:+dataOnSubmit.buyingLimit
}

   addEmd({variables: {data:buyingLmt}})
  
  };

  if(loading){
    <di>Loading............</di>


  }

 

  return (
    <div className="flex flex-col space-y-10 justify-center align-middle w-full bg-gray-50  my-10">
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full my-5 space-y-10">
         <div className="flex space-x-2 justify-around">
          
            <div className="w-1/3">
              <label htmlFor=""> First Name</label>
              <input  value={data?.emdUpdate?.user?.firstName} disabled  type="text" className="input input-bordered input-secondary w-full "></input>
              <p className="text-red-500"> {errors.IdNumber && <span>Atleast 8 charators required</span>}</p>
            </div>

            <div className="w-1/3">
              <label htmlFor="">User Name</label>
              <input value={data?.emdUpdate?.user?.username} disabled  type="text" className="input input-bordered input-secondary w-full " ></input>
              <p className="text-red-500"> {errors.IdNumber && <span>Atleast 8 charators required</span>}</p>
            </div>
            
          </div>

          <div className="flex space-x-2 justify-around">
          
          <div className="w-1/3">
            <label htmlFor="">Amount</label>
            <input disabled defaultValue={data?.emdUpdate?.payment?.amount}   type="number" className="input input-bordered input-secondary w-full " ></input>
            <p className="text-red-500"> {errors.amount && <span>Amount Required</span>}</p>
          </div>
          <div className="min-w-[300px] w-1/3">
            <label htmlFor="">Payment For</label>
            <select disabled  className="input input-bordered input-secondary w-full ">
            <option  >Emd</option>
          
      

      
    
    </select>
    <p className="text-red-500"> {errors.paymentFor && <span>This field cannot empty</span>}</p>

          </div>
        </div>

          <div className="flex space-x-2 justify-around">
          
          <div className="w-1/3">
            <label htmlFor="">Increment Vehicle Buying Limit</label>
            <input  defaultValue={data?.emdUpdate?.vehicleBuyingLimitIncrement}   type="number" className="input input-bordered input-secondary w-full " {...register("buyingLimit", {required:true })}></input>
            <p className="text-red-500"> {errors.buyingLimit && <span>Buying Limit Required</span>}</p>
          </div>
          <div className="min-w-[300px] w-1/3">
          <label  htmlFor="">Payment proof Image</label>
         
          <img
                className="w-full h-36 border py-1"
                 src={`https://api.autobse.com${data?.emdUpdate?.payment?.image?.url}`}
                alt="No ID proof_Image"
              />
          </div>


          
        </div>
        <div className="flex flex-col space-x-2 justify-center w-1/3 ml-28">

       
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

export default UpdateEmdComponent
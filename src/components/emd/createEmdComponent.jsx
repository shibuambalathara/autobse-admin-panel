
import { useForm } from "react-hook-form";

import { useParams } from 'react-router-dom';
import{ useCreateEmdUpdateMutation,  usePaymentDetailsQuery} from '../../utils/graphql'
import { ShowPopup } from '../alerts/popUps';
import Swal from "sweetalert2";
import { h2Style, headerStyle, pageStyle } from "../utils/style";
const CreateEmdComponent = () => {
  const {id}=useParams()
  const { data, loading } =usePaymentDetailsQuery ({variables:{where:{id}}});

 




if(data){
  
}
        
  const [addEmd]=useCreateEmdUpdateMutation()


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit =async (dataOnSubmit) =>{  
const buyingLmt={
payment:{connect:{id}},
 vehicleBuyingLimitIncrement:+dataOnSubmit.buyingLimit
}

try {
  const {data} =await addEmd({variables: {data:buyingLmt}})
  

  if(data){
    
   


     Swal.fire({
       icon: "success",
      title:'Buying limit Updated Successfully',
 
    });

  }
} catch (error) {
  ShowPopup("Failed!", `${error.message}`, "error", 5000, true);
}
  
  
  };

  if(loading){
    <di>Loading............</di>


  }

 

  return (
    <div className={`${pageStyle.data}`}>
         <div className={`${headerStyle.data}`}>
        <h2 className={`${h2Style.data}`}>
       Buying Limit 
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full my-5 space-y-10">
         <div className="flex space-x-2 justify-around">
          
            <div className="w-1/3">
              <label htmlFor=""> First Name</label>
              <input  value={data?.payment?.user?.firstName} disabled  type="text" className="input input-bordered input-secondary w-full "></input>
              <p className="text-red-500"> {errors.IdNumber && <span>Atleast 8 charators required</span>}</p>
            </div>

            <div className="w-1/3">
              <label htmlFor="">User Name</label>
              <input value={data?.payment?.user?.username} disabled  type="text" className="input input-bordered input-secondary w-full " ></input>
              <p className="text-red-500"> {errors.IdNumber && <span>Atleast 8 charators required</span>}</p>
            </div>
            
          </div>

          <div className="flex space-x-2 justify-around">
          
          <div className="w-1/3">
            <label htmlFor="">Amount</label>
            <input disabled defaultValue={data?.payment?.amount}   type="number" className="input input-bordered input-secondary w-full " ></input>
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
            <input   type="number" className="input input-bordered input-secondary w-full " {...register("buyingLimit", {required:true })}></input>
            <p className="text-red-500"> {errors.buyingLimit && <span>Buying Limit Required</span>}</p>
          </div>
          <div className="min-w-[300px] w-1/3">
          <label  htmlFor="">Payment proof Image</label>
         
          <img
                className="w-full h-36 border py-1"
                 src={`https://api.autobse.com${data?.payment?.image?.url}`}
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

export default CreateEmdComponent
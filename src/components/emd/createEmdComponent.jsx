


import { useNavigate, useParams } from 'react-router-dom';
import { useCreateEmdupdateMutation, usePaymentQuery } from '../../utils/graphql'
import { ShowPopup } from '../alerts/popUps';
import Swal from "sweetalert2";
import { h2Style, headerStyle, inputStyle, pageStyle, submit } from "../utils/style";
import { useForm } from 'react-hook-form';
const CreateEmdComponent = () => {
  const { id } = useParams()
  const { data, loading } = usePaymentQuery({ variables: { where: { id } } });

  console.log(data);

  const navigate = useNavigate()



  // if(data){

  // }

  const [addEmd] = useCreateEmdupdateMutation()


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (dataOnSubmit) => {
    const buyingLmt = {
      paymentId: id,
      userId: data.payment.userId,
      createEmdupdateInput: {
        vehicleBuyingLimitIncrement: +dataOnSubmit.buyingLimit
      }

    }

    try {
      const res = await addEmd({ variables: buyingLmt })


      if (res) {

        Swal.fire({
          icon: "success",
          title: 'Buying limit updated successfully.',

        });
        navigate('/users')

      }
    } catch (error) {
      ShowPopup("Failed!", `${error.message}`, "error", 5000, true);
    }


  };

  if (loading) {
    // <di>Loading............</di>


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
            <input value={data?.payment?.user?.firstName} disabled type="text" className={`${inputStyle.data}`}></input>
            <p className="text-red-500"> {errors.IdNumber && <span>Atleast 8 charators required</span>}</p>
          </div>

          <div className="w-1/3">
            <label htmlFor="">User Name</label>
            <input value={data?.payment?.user?.username} disabled type="text" className={`${inputStyle.data}`} ></input>
            <p className="text-red-500"> {errors.IdNumber && <span>Atleast 8 charators required</span>}</p>
          </div>

        </div>

        <div className="flex space-x-2 justify-around">

          <div className="w-1/3">
            <label htmlFor="">Amount</label>
            <input disabled defaultValue={data?.payment?.amount} type="number" className={`${inputStyle.data}`} ></input>
            <p className="text-red-500"> {errors.amount && <span>Amount Required</span>}</p>
          </div>
          <div className="min-w-[300px] w-1/3">
            <label htmlFor="">Payment For</label>
            <select disabled className={`${inputStyle.data}`}>
              <option  >Emd</option>





            </select>
            <p className="text-red-500"> {errors.paymentFor && <span>This field cannot empty</span>}</p>

          </div>
        </div>

        <div className="flex space-x-2 justify-around">

          <div className="w-1/3">
            <label htmlFor="">Increment Vehicle Buying Limit</label>
            <input type="number" className={`${inputStyle.data}`} {...register("buyingLimit", {
              required: { value: true, message: "Buying limit is required" },
              valueAsNumber: true, // Ensures the input is treated as a number
              validate: (value) => value > 0 || "Only positive integers are allowed",
            })}
            ></input>
            <p className="text-red-500"> {errors.buyingLimit && <span>Buying Limit Required</span>}</p>
          </div>
         
          <div className="min-w-[300px] w-1/3">
          {data?.payment?.image && <>
            <label htmlFor="">Payment proof Image</label>
            <img
              className="w-full h-44 border py-1"
              src={data?.payment?.image}
              alt="No ID proof_Image"
            />
         </> }
          </div>



        </div>
        <div className="flex flex-col space-x-2 justify-center w-1/3 ml-28">


        </div>
        <div className=" flex justify-center my-5">
          <button
            type="submit"
            className={`${submit.data}`}
          >Save Changes </button>
        </div>
      </form>
    </div>
  )
}

export default CreateEmdComponent
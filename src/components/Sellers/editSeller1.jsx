import React,{useState}from "react";
import { useForm } from "react-hook-form";
import {useUpdateSellerMutation,useSellerQuery} from '../../utils/graphql'
import { ShowPopup } from '../alerts/popUps';


const EditSeller1 = ({id}) => {
 
  const [sellerName]=useUpdateSellerMutation()
  const {data} =useSellerQuery({variables:{where:{id}}})
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register,reset, handleSubmit, watch, formState: { errors } } = useForm();
  // const {  refetch } = useSellersItemQuery();
  const onSubmit = dataOnSubmit =>{

  try {
     const result=sellerName({variables:{data:{name:dataOnSubmit?.sellerCompanyName}}})
     ShowPopup("Success!", `${dataOnSubmit?.sellerCompanyName} Added successfully!`,"success", 5000, true);
  } catch (error) {
    ShowPopup("Failed!", `${error?.message}`, "error", 5000, true);
  }

  // refetch()
  setIsModalOpen(false);
  reset()
  
  }
  return (
    <div className="  ">
   
   <div >
      <label htmlFor="my-modal-3" className="btn  btn-outline btn-secondary">
        Edit/View Seller 
      </label>
      </div>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => setIsModalOpen(!isModalOpen)}
      />
      <div className="modal ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-box relative w-96">
        <label
              htmlFor="modal-toggle"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)} // add click handler to close modal
            >
              ✕
            </label>

          <div className="flex flex-col">
       
            <label>Seller Name </label>
            <input  defaultValue={data?.seller?.name}
             {...register("sellerCompanyName", { required: true })}
              className="input input-bordered input-secondary  "
              type="text"
            />
             
               <label>GST Number</label>
            <input
             {...register("gst", { required: true })}
              className="input input-bordered input-secondary  "
              type="text"
            />
               <label>Billing Contact Person</label>
            <input
             {...register("billingContactPerson",{  })}
              className="input input-bordered input-secondary  "
              type="text"
            />
          
          <label> Contact Person</label>
            <input
             {...register("ContactPerson",{  })}
              className="input input-bordered input-secondary  "
              type="text"
            />
              <label>Billing Contact Person</label>
            <input
             {...register("billingContactPerson",{  })}
              className="input input-bordered input-secondary  "
              type="text"
            />
              <label>Mobile</label>
            <input
             {...register("mobile",{  })}
              className="input input-bordered input-secondary  "
              type="text"
            />
            <label>National Head</label>
             <input
             {...register("nationalHead",{  })}
              className="input input-bordered input-secondary  "
              type="text"
            />
            <label>vehicle category</label>
             <input
             {...register("vehicleCategory",{  })}
              className="input input-bordered input-secondary  "
              type="text"
            />
          </div>
          {errors.sellerName && <span>This field is required</span>}
          <div className=" flex justify-center space-x-5 my-5">
            <button type="submit" className="btn btn-outline btn-secondary">
              Add Seller
            </button>
           
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default EditSeller1;

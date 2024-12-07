import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm,} from "react-hook-form";
import { useParams,useNavigate  } from "react-router-dom";
import { useCreateExceluploadMutation, useUpdateEventMutation, useEventQuery } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import { formStyle, h2Style, headerStyle, pageStyle, Tablebutton } from "../utils/style";
import { FormFieldInput } from "../utils/formField";
import store from "../../store/store";
import { FaSpinner } from "react-icons/fa";

const ExcelUploadsComponent =() => {
  // const [vehicles,setVehicles]=useState([])
  const { id } = useParams();
  const [downlod, setDownlod] = useState(true);
  const { user } = store.getState().auth;
  const navigate=useNavigate()
  const [create, { data }] =  useCreateExceluploadMutation();
   const {data:eventData}=useEventQuery({variables:{where:{id}}})
  console.log('event data',eventData);
  
  const [editEvent]=useUpdateEventMutation({variables:{where:{id}}})

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (dataOnSubmit) => {
    setDownlod(false)
      const formDataPayload = new FormData();

        formDataPayload.append("file",dataOnSubmit.uploadFile[0])
        formDataPayload.append("eventId",id)
  
      try {
        const response = await fetch(`https://api-dev.autobse.com/api/v1/fileupload/event_excel`, {
          method: "POST",
          headers: {
            // Note: Do not add Content-Type for FormData as fetch automatically sets the right boundary headers
            authorization: store.getState().auth.token ? `Bearer ${store.getState().auth.token}` : '',
          },
         
          body: formDataPayload ,
         
        });
     
       
        if (!response.ok)
      
          {
            const   errorMessage = await response.json()
            
            throw new Error(`${errorMessage.message}`);
          } 
        const result = await response.json();
  
        if (result.success) {
          console.log("Document upload successful:", result);
        }
        ShowPopup(
                "Success!",
                `${dataOnSubmit?.uploadFileName} Excel File Added successfully!`,
                "success",
                5000,
                true
              );
              navigate('/events');
       
      } catch (error) {
        console.error("Error during document upload:", error);
        ShowPopup("Failed!", `Document upload failed: ${error.message}`, "error", 5000, true);
      }
      finally {
        setDownlod(true); // Reset to default state after download
      }
    
  };
  
  if (data) {
    
    // setVehicles([data?.createExcelUpload?.vehicles?.registrationNumber])
  }


  const customStyles = {
    control: (provided,state) => ({
      ...provided,
      backgroundColor: '#E0E0E0',
      color: 'white',
      boxShadow: state.isFocused ? 'none' : provided.boxShadow,
      '&:hover': {
        backgroundColor: 'white',
        cursor: 'pointer',
        outline: 'none',
        border:"none"
      }
      
    }), 
  };

  return (
    <div className={`${pageStyle.data}`}>
     
     <div className={`${headerStyle.data}`}>
        <h1 className={`${h2Style.data}`}>UPLOAD EXCEL FILE</h1>
      </div>
      <div className="mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyle.data}`}>
         
          <FormFieldInput label="File Name" type="text" name="uploadFileName" register={register} error={errors.uploadFileName} required/>

        
          <FormFieldInput accept={'.xlsx,.xls'} label="Upload file" type="file" name="uploadFile" register={register} error={errors.uploadFile} required/>

          <div className=" pt-7 w-fit  ">
          <button class={`${Tablebutton.data} bg-blue-600 hover:bg-blue-800 px-10 py-2.5`} type="submit"
          disabled={!downlod}  // Disable button when downloading
>
  {downlod ? (
    <span>Upload</span>
  ) : (
    <p  className="flex gap-2">
      <FaSpinner className="animate-spin" /> {/* Show spinner icon */}
      <span>Uploading...</span>
    </p>
  )}</button>
          </div>
          </div>
        </form>
        </div>
 
    
    </div>
  );
};

export default ExcelUploadsComponent;
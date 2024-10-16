import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm,} from "react-hook-form";
import { useParams,useNavigate  } from "react-router-dom";
import { useCreateExceluploadMutation, useUpdateEventMutation, useEventQuery } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import { formStyle, h2Style, headerStyle, pageStyle } from "../utils/style";
import { FormFieldInput } from "../utils/formField";
import store from "../../store/store";

const ExcelUploadsComponent =() => {
  // const [vehicles,setVehicles]=useState([])
  const { id } = useParams();
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
    // try {
    //   const file = dataOnSubmit?.uploadFile[0]; 
    //   // Get the uploaded file
    //   const createExceluploadInput = {
    //     file_filename:   dataOnSubmit?.uploadFile[0].name ,  // Use file name here
    //     name: dataOnSubmit?.uploadFileName,
    //   };
    //       console.log(file);
          
    //   await create({
    //     variables: {
    //       createExceluploadInput: createExceluploadInput,
    //       eventId: id,
    //       file:file
         
    //     },
    //   })
    //   .then(async (res) => {
    //     await editEvent({
    //       variables: {
    //         data: {
    //           startDate: eventData?.event?.startDate,
    //         },
    //       },
    //     });
  
    //     ShowPopup(
    //       "Success!",
    //       `${dataOnSubmit?.uploadFileName} Excel File Added successfully!`,
    //       "success",
    //       5000,
    //       true
    //     );
    //     navigate('/events');
    //   })
    //   .catch((err) => {
    //     ShowPopup(
    //       "Failed!",
    //       `${err.message}`,
    //       "error",
    //       5000,
    //       true
    //     );
    //   });
    // } catch (error) {
    //   ShowPopup(
    //     "Failed!",
    //     `${error.message}`,
    //     "error",
    //     5000,
    //     true
    //   );
    // }

    
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
  
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
  
        if (result.success) {
          console.log("Document upload successful:", result);
        }
       
      } catch (error) {
        console.error("Error during document upload:", error);
        ShowPopup("Failed!", `Document upload failed: ${error.message}`, "error", 5000, true);
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

        
          <FormFieldInput label="Upload file" type="file" name="uploadFile" register={register} error={errors.uploadFile} required/>

          <div className=" flex  mt-5 mb-5">
          <button class="btn bg-pink-500 hover:bg-red-500 px-10">Save</button>
          </div>
          </div>
        </form>
        </div>
 
    
    </div>
  );
};

export default ExcelUploadsComponent;
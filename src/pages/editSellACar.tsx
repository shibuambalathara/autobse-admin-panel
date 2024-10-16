import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSellACarByIdQuery, useUpdateSellACarMutation } from '../../../../amjad/admin-dashboard/src/utils/graphql'
import { useForm } from "react-hook-form";
import { FormFieldInput, ImageMaping } from '../components/utils/formField';
import { DateConvert } from '../components/utils/dateFormat';
import { SweetalertSuccess } from '../components/utils/sweetalert';

const EditSellACar = () => {
    const{id} =useParams()
    const {data,loading}=useSellACarByIdQuery({variables:{where:{id}}})
    const [update]=useUpdateSellACarMutation()
    const [iteriorimages, setIteriorImages] = useState<string[]>([]);
    const [exteriorImages, setExteriorImages] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (dataOnSubmit:any) => {
        try{
         update({variables:{data:{
          address:dataOnSubmit?.address,
          engineNo:dataOnSubmit?.engineNo,
          expectToSell:new Date( dataOnSubmit?.expectToSell).toISOString(),
          fuel:dataOnSubmit?.fuel,
          interiorImages:dataOnSubmit?.images,
           kmRead:dataOnSubmit?.kmReading,
          make:dataOnSubmit?.make,
          model:dataOnSubmit?.model,
          registrationNumber:dataOnSubmit?.registrationNumber,
          state:dataOnSubmit?.state,
          varient:dataOnSubmit?.varient,
          vehicleCondition:dataOnSubmit?.vehicleCondition,
          veicleLocation:dataOnSubmit?.veicleLocation,
          yearOfManufacture:+dataOnSubmit?.yearOfManufacture




        }
          ,where:{id}}}).then((response)=>{
            response && SweetalertSuccess()
          })
          
        }
        catch(err){
        }
      }
useEffect(()=>{
  data?.sellACar?.interiorImages&&
  setIteriorImages((data?.sellACar?.interiorImages).split(","));

  data?.sellACar?.exteriorImages&&
  setExteriorImages((data?.sellACar?.exteriorImages).split(","));

},[data])


  
  return (
    <div className="shadow-xl flex flex-col     bg-slate-300 h-fit  m-5 w-full">
      <div className="py-4 bg-gray-200 rounded px-4 flex items-center shadow-xl justify-center ">
        <h2 className="text-xl py-3 leading-3 font-bold text-gray-900">
         SELL A CAR VEHICLE DETAILS
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-3 gap-x-20 gap-y-5 mx-5">
           
          <FormFieldInput defaultValue={data?.sellACar?.registrationNumber} label="Registration Number" type="text" name="registrationNumber" register={register} error={errors.regNo} />
          <FormFieldInput defaultValue={data?.sellACar?.address} label="Address" type="text" name="address" register={register} error={errors.address} />
          <FormFieldInput defaultValue={data?.sellACar?.engineNo} label="Engine No" type="text" name="engineNo" register={register} error={errors.engineNo} />
          <FormFieldInput defaultValue={DateConvert(data?.sellACar?.expectToSell)} label="Expect To Sell" type="datetime-local" name="expectToSell" register={register} error={errors.expectToSell} />
          <FormFieldInput defaultValue={data?.sellACar?.fuel} label="Fuel" type="text" name="fuel" register={register} error={errors.fuel} />
          <FormFieldInput defaultValue={data?.sellACar?.kmRead} label="km Reading" type="text" name="kmReading" register={register} error={errors.kmReading} />
          <FormFieldInput defaultValue={data?.sellACar?.make} label="Make" type="text" name="make" register={register} error={errors.make} />
          <FormFieldInput defaultValue={data?.sellACar?.model} label="Model" type="text" name="model" register={register} error={errors.model} />
          <FormFieldInput defaultValue={data?.sellACar?.state} label="State" type="text" name="state" register={register} error={errors.state} />
          <FormFieldInput defaultValue={data?.sellACar?.varient} label="Varient" type="text" name="varient" register={register} error={errors.varient} />
          <FormFieldInput defaultValue={data?.sellACar?.vehicleCondition} label="Vehicle Condition" type="text" name="vehicleCondition" register={register} error={errors.vehicleCondition} />
          <FormFieldInput defaultValue={data?.sellACar?.veicleLocation} label="Vehicle Location" type="text" name="veicleLocation" register={register} error={errors.veicleLocation} />
          <FormFieldInput defaultValue={data?.sellACar?.yearOfManufacture} label="Year Of Manufacture" type="text" name="yearOfManufacture" register={register} error={errors.yearOfManufacture} />
          <FormFieldInput defaultValue={data?.sellACar?.interiorImages} label="Interior URL" type="text" name="images" register={register} error={errors.images} />
          <FormFieldInput defaultValue={data?.sellACar?.exteriorImages} label="Exterior URL" type="text" name="images" register={register} error={errors.images} />

            </div>
        <ImageMaping images={iteriorimages}/>
        <ImageMaping images={exteriorImages}/>

            <div className="text-center my-5">
              <button className="btn bg-red-500 hover:bg-green-500 mb-5"> Save Changes</button>
            </div>
            </form>
          
    </div>
  )
}

export default EditSellACar
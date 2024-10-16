import React from "react";
import { inputStyle, labelStyle, textAreaStyle } from "./style";




const CheckboxInput = ({ label, name, register, error }) => {
  return (
    <div className="flex items-center mt-2">
      <input
        type="checkbox"
        id={name}
        {...register(name)}
        className="mr-2 h-5 w-5 rounded border-gray-300 shadow-sm focus:ring-black"
      />
      <label htmlFor={name} className="text-black">
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CheckboxInput;

//  type is input
export const FormFieldInput = ({ label, type, name, register,defaultValue, error, ...rest }) => {
  return (
    <div className="flex flex-col">
     
      <label  className={`${labelStyle.data}`} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        {...register(name, rest)}
        className={`${inputStyle.data}`}
      />
      
      {error && <p className="text-red-500">{`${label} Required`}</p>}
    </div>
  );
};


// input type is textarea
export const TextAreaInput = ({ label, type, name, register,defaultValue, error, ...rest }) => {
  return (
    <div className="flex flex-col">
      <label className="t" htmlFor={name}>
        {label}
      </label>
      <textarea
        type={type}
        defaultValue={defaultValue}
        {...register(name, rest)}
        className={`${inputStyle.data}`}
      />
      
      {error && <p className="text-red-500">{`${label} Required`}</p>}
    </div>
  );
};

// Input type is select with constant value maping

export const SelectInput = ({ label, name, options,defaultValue,error, register, ...rest }) => {
  
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name,{required:true})}
        className={`${inputStyle.data}`}
        {...rest}
        defaultValue={defaultValue}
      >
        <option value={defaultValue}>{defaultValue}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{`${label} Required`}</p>}
    
    </div>
  );
};


export const CatInput = ({ label, name, options,defaultValue,error, register, ...rest }) => {
  
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name,{required:true})}
        className={`${inputStyle.data}`}
        {...rest}
        defaultValue={defaultValue}
      >
        <option value={defaultValue}>{defaultValue}</option>
        {options.map((option) => (
          <option key={option.name} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{`${label} Required`}</p>}
    
    </div>
  );
};
export const StateInput = ({ label, name, options,defaultValue,error, register, ...rest }) => {
  
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name,{required:true})}
        className={`${inputStyle.data}`}
        {...rest}
        defaultValue={defaultValue}
      >
        <option value={defaultValue}>{defaultValue}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{`${label} Required`}</p>}
    
    </div>
  );
};
// Input type is select with dynamic value maping
export const SelectWithDynamic  = ({   options,defaultValue,error, register,mappingValue,mappingLabel,defaultLabel, ...rest }) => {
    
  return (
    
    <div className="flex flex-col">
      <label htmlFor={rest.name}>{rest.label}</label>
      <select
        {...register(rest.name,{required: true})}
        className={`${inputStyle.data}`}
          {...rest}
        
      >
        <option value={defaultValue}>{defaultLabel}</option>
         {options?.map((option) => (
          <>
          
          <option key={option[mappingValue]} value={option[mappingValue]}> 
            {option[mappingLabel]} 
          </option>
          </>
        ))
        }  
      </select>
      {error && <p className="text-red-500">{`${rest.label} Required`}</p>}
    </div>
  );
};

// imaged maping


export  const ImageMaping= ({images}) => {
  return (
    <div className="grid grid-cols-2 gap-x-10  gap-y-5 m-2">
    {images?.map((imgs, index) => {
       return (
         <div className=" bg-gray-50 rounded-2xl">
    
           <div className="text-center">  <p>Image {index+1}</p></div>
         
<div className=" flex justify-center">
<img src={imgs} alt={imgs} key={index} className="h-80  text-center" />
</div>
          
         </div>
       );
     })}
        
        </div>
  )
}
// ---------------------------


export const UploadDocument = ({label,fun,url}) => {
  return (
    <div>
    <label>{label}</label>
    <input
      type="file"
      className={`${inputStyle.data}`}
      onChange={fun} 
      accept="/image/*"
      multiple
    />

    <>
 
 


  
       <img src={url} alt='img'/> 
    </>
  </div>
  )
}

 



// ---------------------------


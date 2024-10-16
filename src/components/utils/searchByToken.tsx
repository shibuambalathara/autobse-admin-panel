import React from 'react'
import { useForm } from 'react-hook-form';

const SearchByToken = ({setToken}:{ setToken: (data: number) => void }) => {
    const {
        register,
       
        setValue,
        formState: { errors },
      } = useForm();
  return (
    <div className='flex justify-between'>
    <div className="align-middle">
<p className="my-auto">   Search By Token</p>

         <input
    {...register("token", { required: true,valueAsNumber:true })}
    placeholder="Enter token Number"
    className="input input-bordered input-secondary  w-64 "
    onChange={(e) => {
      const value = e.target.value;
      setValue("token",value);
      setToken(+value)
   
    }
}
  >
    
 
  </input>
    
    </div>
    <div>
    </div>

</div>
  )
}

export default SearchByToken
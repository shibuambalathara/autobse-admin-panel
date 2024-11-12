import React from 'react'
import { DateConvert } from '../utils/dateFormat'
import { InputField } from '../utils/formField'
import { inputStyle, labelStyle } from '../utils/style'


 export const UpdateBidTime = ({currentDate,handleChangeStartTime}) => {

  return (
    <div className=' flex justify-end  '>
        <div className='w-fit modal-box'>
        <h1 className={`${labelStyle.data}`}>Update Date and Time</h1>
        <input className={`${inputStyle.data}`} type='datetime-local'onChange={(e)=>handleChangeStartTime(e.target.value)} value={DateConvert(currentDate)} />
        </div>
    </div>
  )
}



export const UpdateEventEndTime = ({handleChangeEndTime}) => {
 

 return (
   <div className=' flex justify-end  '>
       <div className='w-fit modal-box'>
       <h1 className='font-bold'>Update Time</h1>
       <input className='border-red-500 border-2 p-2 rounded-md' type='time' defaultValue="00:00" onChange={(e)=>handleChangeEndTime(e.target.value)}  />
       </div>
   </div>
 )
}

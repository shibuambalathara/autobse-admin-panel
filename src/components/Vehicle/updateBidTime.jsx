import React from 'react'
import { DateConvert } from '../utils/dateFormat'


 export const UpdateBidTime = ({currentDate,handleChangeStartTime}) => {

  return (
    <div className=' flex justify-end  '>
        <div className='w-fit modal-box'>
        <h1 className='font-bold'>Update Date and Time</h1>
        <input className='border-red-500 border-2 p-2 rounded-md' type='datetime-local'onChange={(e)=>handleChangeStartTime(e.target.value)} value={DateConvert(currentDate)} />
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

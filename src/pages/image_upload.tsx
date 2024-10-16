import React from 'react'
import ImageUpload from '../components/upload/imageUpload'
import ImageUploadDrag from '../components/upload/imageDragAndDrop'

const Image_upload = () => {
  return (
    <div className='w-full space-y-5 m-10 shadow-lg  bg-slate-300 '>
      <div className="py-4 bg-gray-200 rounded px-4 flex items-center shadow-xl justify-center ">
          <h2 className="text-xl py-3 leading-3 font-bold text-gray-900">
            IMAGE UPLOAD
          </h2>
        </div>
    <div className=' flex justify-between '>
  
        <ImageUpload/>
        
        <ImageUploadDrag/>
      
    </div>
    </div>
  )
}

export default Image_upload
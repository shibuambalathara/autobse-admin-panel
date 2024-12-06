import React from 'react'

import ViewLocationComponent from '../components/Locations/viewLocationComponent'
import { pageHead } from '../components/utils/style'

const ViewLocations = () => {
  return (
    <div className='w-full '>
       <div className={`${pageHead.data}  `}>
          LOCATIONS
        </div>
       <div className='w-fit'>
       <ViewLocationComponent/>
       </div>
    
      </div>
  )
}

export default ViewLocations
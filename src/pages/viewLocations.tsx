import React from 'react'

import ViewLocationComponent from '../components/Locations/viewLocationComponent'
import { pageHead } from '../components/utils/style'

const ViewLocations = () => {
  return (
    <div className='w-full '>
       <div className={pageHead.data}>
          LOCATIONS
        </div>
       
      <ViewLocationComponent/>
      </div>
  )
}

export default ViewLocations
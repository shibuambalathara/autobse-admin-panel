import React from 'react'
import AddLocation from '../components/Locations/addLocation'

import ViewLocationComponent from '../components/Locations/viewLocationComponent'
import { pageHead } from '../components/utils/style'

const ViewLocations = () => {
  return (
    <div className='w-full '>
       <div className={pageHead.data}>
          LOCATIONS
        </div>
        <div className='flex justify-end px-5'>

      <AddLocation/>
        </div>
      <ViewLocationComponent/>
      </div>
  )
}

export default ViewLocations
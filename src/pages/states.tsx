import React from 'react'
import AddState from '../components/state/addState'
import ViewStates from '../components/state/viewStates'
import { pageHead } from '../components/utils/style'
const States = () => {
  return (
    <div className='w-full'>
       <div className={pageHead.data}>
            STATES
          </div>
    
      <ViewStates/>
    </div>
  )
}

export default States
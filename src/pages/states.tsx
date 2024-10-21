import React from 'react'
import AddState from '../components/state/addState'
import ViewStates from '../components/state/viewStates'
const States = () => {
  return (
    <div className='w-full'>
      <div className='flex justify-end'>

       <AddState />
      </div>
      <ViewStates/>
    </div>
  )
}

export default States
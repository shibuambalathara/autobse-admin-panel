import React from 'react'

const StartDate = ({filter,setFilter}) => {
  return (
    <div className=' flex w-full'>
    <span className='text-black w-full'>
        Search:{' '}
        <input className='border border-gray-400 rounded py-2 px-4 focus:outline-none focus:border-sky-200' placeholder='search by Name, Id...' type="text"  value={filter || ''} onChange={(e)=>setFilter(e.target.value)}/>
    </span>
    </div>
  )
}

export default StartDate   
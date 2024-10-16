import React from 'react'

const Search = ({filter,setFilter}) => {
  return (
    <div className=' flex w-full my-2'>
    <span className='text-black w-full '>
        Search:{' '}
        <input className='border-black border-2  rounded-xl py-2 px-4 focus:outline-none focus:border-sky-200' placeholder='search by Name, Id...' type="text"  value={filter || ''} onChange={(e)=>setFilter(e.target.value)}/>
    </span>
    </div>
  )
}

export default Search   
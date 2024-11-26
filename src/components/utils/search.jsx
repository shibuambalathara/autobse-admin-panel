import React from 'react'
import { filterStyle } from './style'

const Search = ({filter,setFilter}) => {
  return (
    <div className=' flex my-2 text-black w-64'>
   
      
        <input  className={`${filterStyle.data}`} placeholder='Quick Search... ' type="text"  value={filter || ''} onChange={(e)=>setFilter(e.target.value)}/>
  
    </div>
  )
}

export default Search   
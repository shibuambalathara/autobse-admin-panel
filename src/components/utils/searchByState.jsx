

import { useStatesQuery } from '../../utils/graphql';

const SearchByState = ({setState,value}) => {
    const {data:states}=useStatesQuery()

  return (
    
<div className='flex flex-col  w-64'>
<h2 className=" font-semibold mb-1 text-sm text-start">  Search By State</h2>

         <select
  value={value}
    placeholder="select"
     className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
    onChange={(e) => {
        const value = e.target.value;
      //  setValue("state",value);
      setState(value)
     
      }}
  >
    <option value="">Select State </option>
    {states?.States.map((item) => (
      <option key={item.name} value={item.name}>
        {item.name}
      </option>
    ))}
 
  </select>
    
    
    <div>

    </div>

</div>
  )
}

export default SearchByState
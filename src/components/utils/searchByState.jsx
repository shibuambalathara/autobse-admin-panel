import { indianStates } from "../../utils/data";




const SearchByState = ({setState,value}) => {
    

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
    <option value="">All </option>
    {indianStates.map((item) => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))}
 
  </select>
    
    
    <div>

    </div>

</div>
  )
}

export default SearchByState


import { useStatesQuery } from '../../utils/graphql';

const SearchByState = ({setState}) => {
    const {data:states}=useStatesQuery()

  return (
    
    <div className='flex justify-between'>
    <div className="  align-middle">
<p className="my-auto">   Search By State</p>

         <select
  
    placeholder="select"
    className="input input-bordered input-secondary  w-64 "
    onChange={(e) => {
        const value = e.target.value;
      //  setValue("state",value);
      setState(value)
     
      }}
  >
    <option value="">Select State </option>
    {states?.states?.map((item) => (
      <option key={item.name} value={item.name}>
        {item.name}
      </option>
    ))}
 
  </select>
    
    </div>
    <div>

    </div>

</div>
  )
}

export default SearchByState
import React from 'react'
import { useParams } from 'react-router-dom'
import { useStateQuery, useUsersSearchQuery } from '../../../../amjad/admin-dashboard/src/utils/graphql'
import TabbleOfUsersOrUser from '../components/users/tableData'

const ViewUsersByState = () => {
    const {id}=useParams()
    console.log("id",id)
    const {data:dataByState,loading,refetch}=useUsersSearchQuery({variables:{where:{states:{some:{id:{equals:id}}}}}})
    const {data:state}=useStateQuery({variables:{where:{id}}})

if(loading){
    return(<div>Loading....</div>)
}
console.log("dataByState",dataByState)

  return (
    <div className='w-full'>
      <h2 className='text-center h-1 text-xl'>List of Allowed Dealers in <span className='font-bold'>{state?.state?.name}</span> State  </h2>
              {dataByState  && <TabbleOfUsersOrUser users={dataByState?.users} refetch={refetch}  />}

    </div>
  )
}

export default ViewUsersByState
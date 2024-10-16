import React,{useMemo} from 'react'
import { useSellACarsQuery } from '../../../../amjad/admin-dashboard/src/utils/graphql'
import TableComponent from '../components/utils/table'
import { FormatDate } from '../components/utils/dateFormat'

interface RowData {
  user?: {
    mobile?: string;
    firstName?:string
  };
  
}

const SellACar = () => {
  const {data}=useSellACarsQuery()

  const columns = useMemo(
    () => [
    
      {
        Header: "Vehicle No",accessor: "id",
        Cell: ({ row }:{row:any}) => (
          <a className="btn bg-sky-500 w-24" href={`/edit-sell-a-car/${row.original.id}`} target="_blank" rel="noopener noreferrer">{row.original.vehicleIndexNo}</a>

          )
      },
      {
        Header: "Name",
        accessor: (row:RowData) => row.user?.firstName,
      },      {
        Header: "Mobile",
        accessor: (row:RowData) => row.user?.mobile,
      },
      { Header: "Registration Number", accessor: "registrationNumber" },
      { Header: "Expect To Sell", accessor: ({expectToSell}:{expectToSell:Date})=>{return FormatDate(expectToSell)} },
       { Header: "State", accessor: "state" },
    //  { Header: "City", accessor: "city" },
    ],[])
  return (
    <div className='w-full'>
        <div className="text-center font-extrabold my-5 text-lg min-w-full">  Sell A Car </div>
{/* {data &&        <TableComponent tableData={data?.sellACars} columns={columns} sortBy='start Date'/>
} */}
      {/* <SellACarComponent/> */}
    </div>
  )
}

export default SellACar
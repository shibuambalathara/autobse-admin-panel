import React, { useMemo } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { useEventsPerSellerQuery} from '../../utils/graphql'
import format from 'date-fns/format'
import TableComponent from '../utils/table'

const EventsTablePerSeller = () => {
  const {id}=useParams()
    const {data,loading}=useEventsPerSellerQuery({variables:{where:{id}}})




    const navigate=useNavigate()

    const handleViewVehicle=(id)=>{
      navigate(`/view-vehicls/${id}`)
     }

   const handleUploadExcelFile=(id)=>{
    navigate(`/excel-upload/${id}`)
   }
   const handleEditEvent=(id)=>{
    navigate(`/edit-event/${id}`)
   }
   const handleAddVehicle=(id)=>{
    navigate(`/add-vehicle/${id}`)
   }

    const columns = useMemo(
        () => [
          { Header: "Event No", accessor: "eventNo" },
          { Header: "seller Name", accessor: "seller.name" },
          { Header: "Location", accessor: "location.name" },
          { Header: "Event Category ", accessor: "eventCategory" },
          { Header: "Start Date ", accessor: ({startDate})=>{return format(new Date (startDate),`dd/MM/yy, HH:mm:ss`)} },
          { Header: "End Date ", accessor: ({endDate})=>{return format(new Date (endDate),`dd/MM/yy, HH:mm:ss`)} },
          { Header: "Status ", accessor: "status" }, 
          { Header: "Number Of Vehicles", accessor: "vehiclesCount" },
          {
            Header: "View Vehicles",
            Cell: ({ row }) => (
              <button className="btn btn-secondary" onClick={()=>handleViewVehicle(row.original.id) }>View vehicls</button>
            )
          },
         
          {
            Header: "Upload Excel File",
            Cell: ({ row }) => (
              <button className="btn btn-info" onClick={()=>handleUploadExcelFile(row.original.id) }>Upload</button>
            )
          },
          {
            Header: "Add Vehicle",
            Cell: ({ row }) => (
              <button className="btn btn-accent" onClick={()=>handleAddVehicle(row.original.id) }>Add Vehicle</button>
            )
          },
          {
            Header: "View/Edit Event",
            Cell: ({ row }) => (
              <button className="btn btn-warning" onClick={() => handleEditEvent(row.original.id)}>View/Edit</button>
            )
          }
          
        ],
        []
      );

  
      if (loading) return <p>Loading...</p>;
      

  return (
    <div className="flex  flex-col w-full  ">

    

 
  <div className="text-center font-extrabold my-5 text-lg min-w-full">  Events Data Table of {data?.seller?.name} Seller</div>

  <TableComponent  tableData={data.seller?.events} columns={columns}/>


  </div>

  )
}

export default EventsTablePerSeller
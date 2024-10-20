import React, { useEffect, useMemo,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useEventsQuery, useUpdateEventMutation} from '../../utils/graphql'
import Report from './report'
import Swal from "sweetalert2";
import TableComponent from '../utils/table'
import LimitedDataPaginationComponents from '../utils/limitedDataPagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faFileArrowDown, faFileArrowUp, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays,  } from '@fortawesome/free-regular-svg-icons'
import  { ConvertToExcel } from '../utils/excelFormat'
import { FormatDate } from '../utils/dateFormat'
import CustomButton from '../utils/buttons';
import { Tablebutton } from '../utils/style';


const EventsTableComponent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);


    const {data,loading,error,refetch}=useEventsQuery({variables:
      { 
        // skip: currentPage * pageSize,take:pageSize, orderBy: {startDate:"desc"}
        }})
console.log(data,"data");

const [addParticipants]=useUpdateEventMutation()

useEffect(()=>{
  refetch()

  
},[data])

    const navigate=useNavigate()
  //  const [deleteEvent]=useDeleteEventMutation()






  
   
   const handleDealer=async(eventId)=>{




const { value: input } = await Swal.fire({
  title: 'Enter Mobile Number',
  html: '<input id="mobile" class="swal2-select"></input>',
  focusConfirm: false,
  preConfirm: () => {
    return [
      document.getElementById('mobile').value
    ];
  }
});

  const mobileNumber=input[0]
 
  addParticipants({variables:{where: {id:eventId},
 data:{participants:{connect:{mobile:mobileNumber}}}
}}).then(()=>{
  Swal.fire({
    icon:'success',
    title:"Dealer Added Successfully" 
  })
  refetch()
}).catch((err)=>{
  Swal.fire({
    icon:'error',
    title:"User Does not Exist"
    
  })
})
}
const handleDelete=(id)=>{
  // deleteEvent({variables:{where:{id}}})
  // refetch()
}
   

    const columns = useMemo(
        () => [
        
           {
            Header: "Auction No",
            Cell: ({ row }) => (
       row.original.endDate>new Date().toISOString() ?row.original?.eventCategory==='open'? 
        <a className={`${Tablebutton.data} bg-red-500 `} href={`/openAuctionUpdatedByAdmin/${row.original.id}`} target="_blank" rel="noopener noreferrer">{row.original.eventNo}</a>
        :<span class="relative  h-3 w-3  ">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-30"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500">{row.original.eventNo}</span>
      </span>
        :row.original.eventNo
            
            )
          },
          { Header: "seller Name", accessor: "seller.name" },
          { Header: "Location", accessor: "location.name" },
          { Header: "Event Category ", accessor: "eventCategory" },
          //  { Header: "Start Date ", accessor: ({startDate})=>{return format(new Date( startDate),`dd/MM/yy, HH:mm`)} },
          {
            Header: "start Date",
            accessor: ({ startDate }) => new Date( startDate),
            sortType: "datetime",
            Cell: ({ value }) => FormatDate(value),
          },
          { Header: "End Date ", accessor: ({endDate})=>{return FormatDate(endDate)} },
          { Header: "Status ", accessor: "status" }, 
          // {
          //   Header: "Add Partcipant",
          //   Cell: ({ row }) => (
          //     row.original.endDate>new Date().toISOString() ?       <button className="text-2xl" onClick={() => handleDealer(row.original.id)}><FontAwesomeIcon icon={faUserPlus} /></button>:"Event Completed"
          //   )
          // },
          // {
          //   Header: "View Participants",
          //   Cell: ({ row }) => (
          //     <a className="btn bg-violet-500" href={`/participants/${row.original.id}`} target="_blank" rel="noopener noreferrer">{row.original.participantsCount}</a>

          //     )
          // },
         
        {
          Header: "Add Vehicles ",
          Cell: ({ row }) => (
<p className='flex justify-center'>       

{
  (row.original.endDate >new Date().toISOString())   &&
      <a className=" text-xl " href={`/add-vehicle/${row.original.id}`} target="_blank" rel="noopener noreferrer">+ <FontAwesomeIcon icon={faCar}  /></a>}
</p>
            )
        },


          {
            Header: "View Vehicles",
            Cell: ({ row }) => (
                <a className={`${Tablebutton.data} bg-pink-600 hover:bg-pink-700 `} href={`/view-vehicls/${row.original.id}`} target="_blank" rel="noopener noreferrer">{row.original.vehiclesCount} view</a>
              )
          },
         
          {
            Header: "Upload Excel File",
            Cell: ({ row }) => (
      //        <button className="btn btn-info" onClick={()=>handleUploadExcelFile(row.original.id) }>Upload</button>
      <a className={`${Tablebutton.data} bg-emerald-500 text-xl hover:bg-emerald-600`} href={`/excel-upload/${row.original.id}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFileArrowUp} /></a>
   
      )
          },
   
          {
            Header: "View/Edit Event",
            Cell: ({ row }) => (
              <a className={`${Tablebutton.data} bg-cyan-500 text-xl `} href={`/edit-event/${row.original.id}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCalendarDays} /></a>

              )
          },
          {
            Header: "ACR (excel)",
            Cell: ({ row }) => (
              <button className={`${Tablebutton.data} bg-red-500 text-xl `} onClick={() => ConvertToExcel(row.original.Report)}><FontAwesomeIcon icon={faFileArrowDown} /></button>
            )
          },
  // {
  //   Header:"delete",
  //   Cell: ({ row }) => (
  //     <button className="text-2xl" onClick={() => handleDelete(row.original.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
  //   )
  // }
        
          
        ],
        []
      );

     
    
        const handlePageChange = (newPage) => {
          setCurrentPage(newPage);
        };

        
        const totalPages = (data?.events?.length );

        useEffect(() => {
          const intervalId = setInterval(() => {
            refetch(); 
          }, 2000);
        
          return () => {
            clearInterval(intervalId);
          };
        }, []);

      if (loading) return <p>Loading...</p>;
      
    

  return (
    <div className="flex  flex-col w-full justify-around overflow-hidden">
         <div className='flex justify-end   m-2 px-20'> 
       <CustomButton navigateTo={"/addevent"} buttonText={" Add Event"}/>
    {/* <div>
        <Report/>
        </div> */}
        </div> 
    <div className=" flex flex-col w-full justify-center m-auto ">
    <div className="mb-2">
  <div className="text-center font-extrabold my-5 text-lg min-w-full">  Events Data Table </div>

    
 
 
  
   </div>
     
       <TableComponent data={data?.events||[]} columns={columns} sortBy='start Date'/>
{/*   
          <LimitedDataPaginationComponents   
          currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}/> */}
  </div> 
  </div>
  
  )
}

export default EventsTableComponent
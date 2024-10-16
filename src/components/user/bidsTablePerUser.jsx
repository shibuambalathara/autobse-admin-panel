import React, { useMemo, useState,useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useActiveBidsPerUserQuery, useBidsTableQuery, useUpdateVehicleMutation, useVehicleDetailsQuery} from '../../utils/graphql'

import format from "date-fns/format";
import jsPDF from 'jspdf';
import { ShowPopup } from '../alerts/popUps'
import TableComponent from '../utils/table'



const BidsTablePerUser = () => {
  const {id}=useParams()
  const[vehicleId,setVehicleId]=useState(null)
  const[statuschangeId,setStatusChangeId]=useState(null)
  const{data:vehicleDetails}=useVehicleDetailsQuery({variables:{where:{id:vehicleId}}})
  const {data,loading,error}=useActiveBidsPerUserQuery({variables:{where:{id}}})
    const navigate=useNavigate()
    const [editVehicle] = useUpdateVehicleMutation({
      variables: { where: { id:statuschangeId } },
    });


    const handleUserDetails=(userId)=>{
navigate(`/view-user/${userId}`)
    }
    const handleVehicleDetails=(vehicleId)=>{
      navigate(`/edit-vehicle/${vehicleId}`)
    }


    const handleWinning=(Id)=>{

     setVehicleId(Id)
    }
    const handlestatus=(id)=>{
      setStatusChangeId(id)
      
    }
      
    
useEffect(()=>{
  editVehicle({ variables: { data: { bidStatus:'fulfilled' } } }).then(()=>{
    ShowPopup("Success!", `Bid Status Fulfilled   successfully!`, "success", 5000, true);
  })
},[statuschangeId])

    useEffect(() => {
      if (vehicleId && vehicleDetails) {
        const {vehicle}=vehicleDetails
     
        const pdf = new jsPDF();
       const logoImg = '../logo.jpeg';
       
       const datePrinted=`Date Printed: ${new Date().toLocaleDateString()}`
       
        const sellerName= `Seller Name             :  ${vehicle?.event?.seller?.name}`;
         const AuctionId= `Auction Id                 :   ${vehicle?.vehicleIndexNo}`;
       const vehicleName=`Vehicle                     :   ${vehicle?.make}`
       const startAmount= `Start Price                :   ${vehicle?.startBidAmount.toLocaleString()}/-`;
          const endprice= `Winning Price           :   ${vehicle?.currentBidAmount.toLocaleString()}/-`;
          const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
          const closeDate= `Auction Close Date  :   ${new Date(vehicle?.bidTimeExpire).toLocaleDateString(undefined,options)}`;
          const userId= `User ID                      :   ${vehicle?.currentBidUser?.username}`;
          const firstName= `First Name                :   ${vehicle?.currentBidUser?.firstName}`;
          const lastName= `Last Name                :   ${vehicle?.currentBidUser?.lastName}`;
          const pan= `PAN                          :   ${vehicle?.currentBidUser?.pancardNo}`;
          const mobile= `Mobile No                 :   ${vehicle?.currentBidUser?.mobile}`;

        
          pdf.addImage(logoImg, 'JPEG', 10, 10, 30, 30);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold'); 
        pdf.text(datePrinted, 150, 40,);
        pdf.setFont('helvetica', 'normal'); 
        pdf.text(`Dear ${vehicle?.currentBidUser?.firstName},`,10, 50) 
        pdf.setFont('helvetica', 'bold'); 
        pdf.text('Sub : Bid Winning Letter',10, 60)
        pdf.setFont('helvetica', 'normal'); 
        pdf.setFontSize(10);
        pdf.text('This is to confirm that you have won a vehicle on AUTOBSe as per following details:',10,70)
        pdf.setFontSize(12);
        pdf.text(sellerName, 10, 80);
        pdf.text(AuctionId, 10, 88);
        pdf.text(vehicleName, 10, 96);
        pdf.text(startAmount, 10, 104);
        pdf.text(endprice, 10, 112);
        pdf.text(closeDate, 10, 120);
        pdf.setFontSize(10);
        pdf.text('Your registration details on AUTOBSe are as follows:',10,132)
        pdf.setFontSize(12);
        pdf.text(userId, 10, 140); 
        pdf.text(firstName, 10, 148) 
        pdf.text(lastName, 10, 156)
        pdf.text(pan, 10, 164)
        pdf.text(mobile, 10, 172)
        pdf.setFontSize(10);
        pdf.text('Note: The bank has the sole discretion for sale of the vehicle even post winning confirmation to the highest bidder \nPlease present this letter while making payment at the branch for your vehicle',10,182)
        pdf.setFont('helvetica', 'bold'); 
        pdf.text('Terms and Conditions:',10,194)
        pdf.setFont('helvetica', 'normal'); 
        pdf.setFontSize(9);
        pdf.text('• Payment to be made to Bank within 2 working days of approval. Any delay after 2 working days, Bank reserves the right to accept or\nreject the payment.\n\n• This letter is a confirmation that you have inspected the vehicle and you are fully aware that the vehicle is on "As-is-where-is" basis \nsale and you cannot claim refund or return the asset once the payment is made.\n\n• Release Order will be issued to you only after clearance of payment or updation of payment in customer statement of account.\n\n• Delivery to be taken on the same day of Release Order or else you will be liable to bear the parking charges as applicable as per rules \n each yard.\n\n• Buyer to furnish ID copies at time of taking release order at Bank and while taking delivery of asset at stock yard\n\n\n*NOTE: This is a system generated notification.\n\n*Seller: Please verify the Winner & Vehicle Details from your end, before accepting the payment',10,200)

        pdf.save('Bid Winning Letter.pdf');
      }
    }, [vehicleId,vehicleDetails]);
    const columns = useMemo(
        () => [
          { Header: "Reg Number", accessor: "registrationNumber" },
          { Header: "Lot Number", accessor: "vehicleIndexNo" },
           { Header: "Start Price", accessor: "startBidAmount" },
           { Header: "Current Bid Amount", accessor: "currentBidAmount" },
           
           
          //  { Header: "bidTimeExpire",  accessor: ({bidTimeExpire})=>{return format(new Date (bidTimeExpire), `dd/MM/yy,  HH:mm`)} },
          {
            Header: "Bid End Time",
            accessor: ({ bidTimeExpire }) => new Date(bidTimeExpire),
            sortType: "datetime",
            Cell: ({ value }) => format(value, "dd/MM/yy, HH:mm"),
          },  
          { Header: "Bid Status", accessor: "bidStatus" },  
         
          // {
          //   Header: "User Details",
          //   Cell: ({ row }) => (
          //     <button className="btn btn-info w-24" onClick={()=>handleUserDetails(row.original.user.id) }>{row.original.user.firstName} {row.original.user.lastName}</button>
          //   )
          // },
          {
            Header: "Vehicle Details/Change Status",
            Cell: ({ row }) => (
              <button className="btn btn-secondary w-24" onClick={() => handleVehicleDetails(row.original.id)}>{row.original.registrationNumber}</button>
            )
          },
          {
            Header: "Winning Letter",
            Cell: ({ row }) => (
              <>{row.original.bidStatus==='fulfilled'? <button className="btn btn-accent w-24" onClick={() => handleWinning(row.original.id)}>Download</button>:<button className='btn btn-info' onClick={() => handlestatus(row.original.id)}> click for fulfill</button>}
             
              </>
            )
          },
          
        ],
        []
      );

 
    
      if (loading) return <p>Loading...</p>;
      

  return (
    <div className="flex  flex-col w-full justify-around ">
      

    
    <div className=" flex flex-col w-full justify-center m-auto ">
   
  <div className="text-center font-extrabold my-5 text-lg min-w-full">  Bids Data Table Of {data?.user?.firstName} {data?.user?.lastName} </div>

    
      <TableComponent tableData={data?.user?.activeBids} columns={columns} sortBy='Bid End Time'/>

  </div>
  </div>
  )
}

export default  BidsTablePerUser
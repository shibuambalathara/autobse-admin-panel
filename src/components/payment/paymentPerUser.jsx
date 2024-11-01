import React, { useMemo } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useUserPaymentsQuery} from '../../utils/graphql'
import format from 'date-fns/format'
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import TableComponent from '../utils/table';

import { FormatDate } from '../utils/dateFormat';
import { Tablebutton } from '../utils/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const PaymentPerUser = () => {
    const {id}=useParams()
    const {data,loading}=useUserPaymentsQuery({variables:{where:{id:id}}})
    
    console.log(data, "payment dta");
    
    const navigate=useNavigate()
    // const handleUserDetails=(userId)=>{
    
    //   navigate(`/view-user/${userId}`)
    // }

   
    const handlePaymentStatus=(paymentId)=>{
navigate(`/update-payment/${paymentId}`)
    }
    const handleMessage=(payment)=>{
      const {amount,paymentFor,createdAt}=payment
      const formatedDate=format(new Date( createdAt),`dd/MM/yy, HH:mm`)
     const  {firstName,lastName}=data.user
     
      Swal.fire({
        html: `<div>
            <h1>Message From Team AutoBse </h1>
            
            <p>Dear: ${firstName} ${lastName},</p>
           <p>Thank You for the payment of Rs.${amount}.Created at ${formatedDate}.  for ${paymentFor}. </p>
            <p>For more details please contact our team . </p>
            <p>Thank you.</p>
          </div>`
      
      })
    }
    const handleDownload=(paymentData)=>{
      console.log(paymentData,"ata download");
      
      convertToPDF(paymentData,data.user)
    }


    const columns = useMemo(
        () => [
           { Header: "Ref No", accessor: "refNo" },
            { Header: "Amount", accessor: "amount" },
            {Header:"Payment For",accessor:"paymentFor"},
           { Header: "Status", accessor: "status" },
           { Header: "Created At", accessor: ({createdAt})=>{return FormatDate(createdAt)} },
           { Header: "Updated At",  accessor: ({updatedAt})=>{return FormatDate( updatedAt)} },
           {
            Header: "Registration Expire",
               accessor: ({ registrationExpire }) =>registrationExpire && new Date( registrationExpire),
        
   Cell: ({ value }) =>value ? FormatDate(value):'-',
           },
           {
            Header: "Created By",
            Cell: ({ row }) => {
              return (
                <a
                  className={`${Tablebutton.data} bg-blue-500`}
                  href={`/view-user/${row.original?.createdById}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faUser} />
                </a>
              );
            }
          },
            {
            Header: "Update Payment",
            Cell: ({ row }) => (
              <button className={`${Tablebutton.data} bg-green-500`} onClick={() => handlePaymentStatus(row.original?.id)}>Update Payment</button>
            )
          },
          {
            Header: "Emd Details",
            Cell: ({ row }) => (
     row.original.emdUpdateCount!==0 &&         <a className={`${Tablebutton.data} bg-zinc-500  `}href={`/emdDetails/${row.original.id}`} target="_blank" rel="noopener noreferrer">Emd Details </a>
            )
          },
          {
            Header: "Create Buying Limit",
            Cell: ({ row }) => {
              if (
                // row.original.emdUpdateCount === 0
                // &&
                row.original.paymentFor === 'emd'
                 &&
                row.original.status === 'approved'
              ) {
                return (
                  <a
                    className="  text-2xl"
                    href={`/add-emd/${row.original.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                   <FontAwesomeIcon icon={faCirclePlus} />
                  </a>
                );
              }
               else {
                return(
                  <>
                  {/* Increment by:{ row.original?.emdUpdate[0]?.vehicleBuyingLimitIncrement ??'0'}, */}
                 
                   {row.original.status}
                  </>
                  );
              }}},
          {
            Header: "Payment Message",
            Cell: ({ row }) => {
              
    if(row.original.status==='approved' ){return(   <button className={`${Tablebutton.data} bg-teal-500`}  onClick={() => handleMessage(row.original)}>Message To:{data?.user?.mobile}</button>)}
    else {
      
      return row.original.status;}
        
    }
          },
          {
            Header: "Download",
            Cell: ({ row }) => {
              
    if(row.original.status==='approved' ){return(   <button className={`${Tablebutton.data} bg-blue-500`} onClick={() => handleDownload(row.original)}>PDF</button>)}
    else {
      
      return row.original.status;}
        
    }
          },
    
          
        ],
        [data]
      );


     

    
     
    
      if (loading) return <p>Loading...</p>;
      

  return (
    <div className="flex  flex-col w-full justify-around ">
 
    
    <div className=" flex flex-col w-full justify-center m-auto ">
    <div className="mb-2">
  <div className="text-center  font-extrabold my-5 text-lg min-w-full">  PAYMENT DATA TABLE OF {data?.user?.firstName?.toUpperCase()} {data?.user?.lastName?.toUpperCase()} </div>

  </div>
 

          <TableComponent data={data?.user?.payments} columns={columns} sortBy='Created At'/>

  
  </div>
  </div>
  )
}

export default PaymentPerUser

function convertToPDF(paymentDetails,user){

  const pdf = new jsPDF();
  const logoImg = '../logo.jpeg';
  
  const datePrinted=`Printed Date : ${new Date().toLocaleDateString()}`
  const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };

const createdPayment=new Date(paymentDetails.createdAt).toLocaleDateString(undefined,options)
const UpdatedPayment=new Date(paymentDetails.createdAt).toLocaleDateString(undefined,options)
const createdBy=paymentDetails?.createdBy ? paymentDetails?.createdBy.firstName : user.firstName

  pdf.addImage(logoImg, 'JPEG', 10, 10, 30, 30);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold'); 
  pdf.text(datePrinted, 150, 50,);
 pdf.text('Sub : Payment status active letter',10, 60)
        pdf.setFont('helvetica', 'normal'); 
       
    
        pdf.setFontSize(12);
        pdf.text(`Amount              : ${paymentDetails.amount}`, 10, 80);
        pdf.text(`Created At          : ${createdPayment}`, 10, 90);
        pdf.text(`Updated At          : ${UpdatedPayment}`, 10, 100);
        pdf.text(`payment For         : ${paymentDetails.paymentFor}`, 10, 110);
        pdf.text(`Payment Created By  : ${createdBy}`, 10, 120);
      
        pdf.setFontSize(10);
  pdf.text('User registration details on AUTOBSe are as follows:',10,138)
  pdf.setFontSize(12);

  pdf.text(`First Name  : ${user.firstName}`, 10, 148) 
  pdf.text(`Last Name   : ${user.lastName}`, 10, 158)

  pdf.text(`Mobile      : ${user.mobile}`, 10, 168)
  pdf.save(`payment of ${user.firstName}`.pdf)
}
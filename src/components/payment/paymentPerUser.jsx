import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserPaymentsQuery } from '../../utils/graphql'
import format from 'date-fns/format'
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import TableComponent from '../utils/table';

import { FormatDate } from '../utils/dateFormat';
import { Tablebutton } from '../utils/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import AutobseLoading from '../utils/autobseLoading';
import ViewEmd from '../emd/ViewEmd';

const PaymentPerUser = () => {
  const { id } = useParams()
  const { data, loading } = useUserPaymentsQuery({ variables: { where: { userId: id } } })
const [isModalOpen, setIsModalOpen] = useState(false);
const [emdId, setEmdId] = useState('');
  console.log(data, "payment dta");

  const navigate = useNavigate()
  // const handleUserDetails=(userId)=>{

  //   navigate(`/view-user/${userId}`)
  // }


  const handlePaymentStatus = (paymentId) => {
    navigate(`/update-payment/${paymentId}-payment_per_user-${id}`)
  }
  const handleMessage = (payment) => {
    const { amount, paymentFor, createdAt } = payment
    const formatedDate = format(new Date(createdAt), `dd/MM/yy, HH:mm`)

    const { firstName, lastName } = data.payments[0]?.user

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
  const handleDownload = (paymentData) => {
    console.log(paymentData, "ata download");

    convertToPDF(paymentData)
  }
  const handleEmd = (id) => {
    setEmdId(id)
setIsModalOpen(true)


   
  }


  const columns = useMemo(
    () => [
      { Header: "Ref No", accessor: "refNo" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Payment For", accessor: "paymentFor" },
      { Header: "Status", accessor: "status" },
      { Header: "Created At", accessor: ({ createdAt }) => { return FormatDate(createdAt) } },
      { Header: "Updated At", accessor: ({ updatedAt }) => { return FormatDate(updatedAt) } },
      {
        Header: "Registration Expire",
        accessor: ({ registrationExpire }) => registrationExpire && new Date(registrationExpire),

        Cell: ({ value }) => value ? FormatDate(value) : '-',
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
        Cell: ({ row }) => {
          if (row.original.emdUpdate.length !== 0 && row.original.paymentFor === 'emd' && row.original.status === 'approved') {
            return (<button className={`${Tablebutton.data} bg-zinc-500  `} onClick={()=> handleEmd(row.original.id)} target="_blank" rel="noopener noreferrer">Emd Details </button>)
          } else {
            return (<p className={`${Tablebutton.data} bg-gray-400  cursor-not-allowed`}>Emd Details</p>)
          }
        }
      },
      {
        Header: "Create Buying Limit",
        Cell: ({ row }) => {
          const { emdUpdate, paymentFor, status, id } = row.original;

          // Check conditions for showing "Increment by" or the button
          if (emdUpdate?.[0]?.vehicleBuyingLimitIncrement) {
            // Render increment details
            return (
              <>
                Increment by: {emdUpdate[0].vehicleBuyingLimitIncrement}
              </>
            );
          } else if (paymentFor === 'emd' && status === 'approved') {
            // Render button if increment is not available
            return (
              <button
                className="text-2xl "
                onClick={() => {
                  navigate(`/add-emd/${id}`)
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </button>
            );
          } else {
            // Optional: Return null or a default fallback
            return <p>Registration</p>;
          }
        },
      },

      {
        Header: "Payment Message",
        Cell: ({ row }) => {

          if (row.original.status === 'approved') { return (<button className={`${Tablebutton.data} bg-teal-500`} onClick={() => handleMessage(row.original)}>Message To:{data?.payments?.user?.mobile}</button>) }
          else {

            return row.original.status;
          }

        }
      },
      {
        Header: "Download",
        Cell: ({ row }) => {

          if (row.original.status === 'approved') { return (<button className={`${Tablebutton.data} bg-blue-500`} onClick={() => handleDownload(row.original, data?.payments[0]?.user)}>PDF</button>) }
          else {

            return row.original.status;
          }

        }
      },


    ],
    [data]
  );







  if (loading) return <AutobseLoading />


  return (
    <div className="flex  flex-col w-full justify-around ">
      
<ViewEmd id={emdId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <div className=" flex flex-col w-full justify-center m-auto ">
        <div className="mb-2">
          <div className="text-center  font-extrabold my-5 text-lg min-w-full uppercase  ">  PAYMENTS  OF {data?.payments[0]?.user?.firstName} {data?.payments[0]?.user?.lastName} </div>

        </div>


        <TableComponent data={data?.payments} columns={columns} sortBy='Created At' />


      </div>
    </div>
  )
}

export default PaymentPerUser

function convertToPDF(paymentDetails, user) {

  const pdf = new jsPDF();
  const logoImg = '../logo.jpeg';

  const datePrinted = `Printed Date : ${new Date().toLocaleDateString()}`
  const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };

  const createdPayment = new Date(paymentDetails.createdAt).toLocaleDateString(undefined, options)
  const UpdatedPayment = new Date(paymentDetails.createdAt).toLocaleDateString(undefined, options)
  const createdBy = paymentDetails?.user?.firstName

  pdf.addImage(logoImg, 'JPEG', 10, 10, 30, 30);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text(datePrinted, 150, 50,);
  pdf.text('Sub : Payment status active letter', 10, 60)
  pdf.setFont('helvetica', 'normal');


  pdf.setFontSize(12);
  pdf.text(`Amount              : ${paymentDetails.amount || ""}`, 10, 80);
  pdf.text(`Created At          : ${createdPayment || ""}`, 10, 90);
  pdf.text(`Updated At          : ${UpdatedPayment || ""}`, 10, 100);
  pdf.text(`payment For         : ${paymentDetails.paymentFor || ""}`, 10, 110);
  pdf.text(`Payment Created By  : ${createdBy || ""}`, 10, 120);

  pdf.setFontSize(10);
  pdf.text('User registration details on AUTOBSe are as follows:', 10, 138)
  pdf.setFontSize(12);

  pdf.text(`First Name  : ${paymentDetails?.user.firstName || ""}`, 10, 148)
  pdf.text(`Last Name   : ${paymentDetails?.user.lastName || ''}`, 10, 158)

  pdf.text(`Mobile      : ${paymentDetails?.user.mobile || ''}`, 10, 168)
  pdf.save(`payment of ${paymentDetails?.user.firstName || ''}`.pdf)
}
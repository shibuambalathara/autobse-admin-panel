import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import TableComponent from "../utils/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { Tablebutton } from "../utils/style";
// import { FormatDate } from "../utils/dateFormat";
// import { useEditUserMutation } from "../../utils/graphql";

const TabbleOfUsersOrUser = ({ users, refetch }) => {
  console.log("users", users);
  const location = useLocation();
  const currentPageStartWith = location.pathname;
  // const [updateUser ] = useEditUserMutation();

  // Function to handle message display using SweetAlert
  const handleMessage = (coupen) => {
    const { coupenDetail, firstName, lastName, currentVehicleBuyingLimit } = coupen;

    Swal.fire({
      html: `<div>
        <h1>Message From Team AutoBse</h1>
        <p>Dear: ${firstName} ${lastName},</p>
        <p>Thank you for participating in the auction.</p>
        <p>You have ${currentVehicleBuyingLimit.vehicleBuyingLimit} Buying Limit.</p>
        <p>Coupons are ${coupenDetail
          .map((coupen, index) => {
            return `<p>${index + 1}. ${coupen.coupenNumber}</p>`;
          })
          .join('')}</p>
        <p>For more details, please contact Team AutoBse.</p>
        <p>Thank you.</p>
      </div>`,
    });
  };

  // Function to handle token creation/update using SweetAlert
  const handleToken = async (id) => {
    console.log("id", id);
    const { value: newToken } = await Swal.fire({
      title: "Enter Token Number",
      input: "number",
      inputLabel: "Token number",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    // If the token is confirmed, you can uncomment and handle the mutation here
    // if (newToken) {
    //   updateUser({variables:{data:{tempToken:+newToken},where:{id}}})
    //     .then((res) => {
    //       refetch();
    //       console.log("response", res);
    //     })
    //     .catch((err) => {
    //       console.log("error", err);
    //       Swal.fire({ text: "Token Already exists", icon: 'error' });
    //     });
    // }
  };

  // Function to handle user deletion with confirmation
  const handleDelete = async (id) => {
    const response = await Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    // If the user confirms deletion, you can uncomment and handle the mutation here
    // if (response.isConfirmed) {
    //   updateUser({variables:{data:{tempToken:null},where:{id}}}).then((res) => {
    //     console.log(res);
    //     refetch();
    //   });
    // }
  };

  // Define the table columns with only required fields
  const columns = useMemo(
    () => [
      { Header: "User No",  Cell: ({ row }) =>
        row.original?.idNo },
  // { Header: "Email", accessor: "email", },
 
  { Header: "First Name", accessor: "firstName", },
  { Header: "Last Name", accessor: "lastName" },
  { Header: "Mobile", accessor: "mobile" },
  { Header: "Status", accessor: "status", },
  { Header: "Role", accessor: "role", },
  { Header: "State", accessor: "state", },
  
  
  // { Header: "Balance (EMD Amount)", accessor: "BalanceEMDAmount", },
  
  // { Header: "City", accessor: "city", },
  // { Header: "User Category", accessor: "userCategory", },
  
      {
        Header: "Active Bids",
        Cell: ({ row }) =>
          // row.original.activeBidsCount !== 0 && (
            <a
            className= {`${Tablebutton.data} bg-green-400`}
              href={`/bids-user/${row.original.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {row.original.activeBids?.length}
            </a>
         
      },
      {
        Header: "Current Buying Limit",
        Cell: ({ row }) => {
          const buyingLimit = row.original?.vehicleBuyingLimit;
      
          // Determine styles based on the buyingLimit value
          const isDisabled = buyingLimit === 0;
          const buttonClass = isDisabled
            ? `${Tablebutton.data} bg-gray-400   `
            : `${Tablebutton.data} bg-green-400`;
      
          return isDisabled ? (
            <button
              className={`${buttonClass} cursor-not-allowed `}
              disabled
             
            >
              {buyingLimit}
            </button>
          ) : (
            <a
              className={buttonClass}
              href={`/buying-limit/${row.original.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
               {buyingLimit}
            </a>
          );
        }
      },
      {
        Header: "Payment Details",
        Cell: ({ row }) => {
          const paymentsCount = row.original.paymentsCount;
      
          // Determine styles based on the paymentsCount value
          const isDisabled = paymentsCount === 0;
          const buttonClass = isDisabled
            ? `${Tablebutton.data} bg-gray-400 cursor-not-allowed`
            : `${Tablebutton.data} bg-rose-700`;
      
          return isDisabled ? (
            <button
              className={`${buttonClass} w-10 p-2`}
              disabled
            
            >
              {paymentsCount}
            </button>
          ) : (
            <a
              className={`${buttonClass} w-10 p-2`}
              href={`/payment/${row.original.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {paymentsCount}
            </a>
          );
        }
      },
      
      // {
      //   Header: "View Coupons",
      //   Cell: ({ row }) =>
      //     row.original.coupenDetailCount && (
      //       <a
      //         className="btn bg-red-500 w-16"
      //         href={`/coupenPerUser/${row.original.id}`}
      //         target="_blank"
      //         rel="noopener noreferrer"
      //       >
      //         {row.original.coupenDetailCount}
      //       </a>
      //     ),
      // },
      {
        Header: "Create Payment",
        Cell: ({ row }) => (
          <a
            className={`${Tablebutton.data} bg-red-500 text-lg`}
            href={`/create-payment/${row.original.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faCreditCard} />
          </a>
        ),
      },
      {
        Header: "User Details",
        Cell: ({ row }) => (
          <a
            className={`${Tablebutton.data} bg-blue-500 `}
            href={`/view-user/${row.original.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faUserPen} />
          </a>
        ),
      },
      // {
      //   Header: "Token",
      //   Cell: ({ row }) => (
      //     <div className="flex">
      //       <button
      //         className="rounded-md p-1 text-white bg-green-700"
      //         onClick={() => handleToken(row.original?.id)}
      //       >
      //         CREATE/UPDATE
      //       </button>
      //       {row?.original?.tempToken && (
      //         <button
      //           className="rounded-md p-1 text-red-500"
      //           onClick={() => handleDelete(row.original?.id)}
      //         >
      //           <FontAwesomeIcon icon={faTrash} />
      //         </button>
      //       )}
      //     </div>
      //   ),
      // },
      // { Header: "Temp Token", accessor: "tempToken", },
      // ...(currentPageStartWith === "/users"
      //   ? []
      //   : [
      //       {
      //         Header: "Message",
      //         Cell: ({ row }) =>
      //           row?.original?.coupenDetail && (
      //             <button
      //               className="btn bg-yellow-500"
      //               onClick={() => handleMessage(row.original)}
      //             >
      //               Message To {row.original.mobile}
      //             </button>
      //           ),
      //       },
      //     ]),
    ],
    [users]
  );

  return (
    <>
      {/* <div className=" h-fit">
        <div className="flex flex-col justify-center w-full"> */}
          {/* Optional Header or any additional component */}
          <TableComponent columns={columns} data={users} pagination='false' />
        {/* </div>
      </div> */}
    </>
  );
};

export default TabbleOfUsersOrUser;

import React, { useMemo } from "react";

import Swal from "sweetalert2";
import TableComponent from "../utils/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { Tablebutton } from "../utils/style";
// import { FormatDate } from "../utils/dateFormat";
import { useDeleteUserMutation } from "../../utils/graphql";
import { SweetalertSuccess } from "../utils/sweetalert";
import { ImBin2 } from "react-icons/im";
import SortedTableComponent from "../utils/sortedTable";
import { FormatDate } from "../utils/dateFormat";

const TabbleOfUsersOrUser = ({ users, refetch }) => {
  console.log("users", users);
  // const location = useLocation();
  // const currentPageStartWith = location.pathname;

  // Function to handle token creation/update using SweetAlert
  const [deleteUser] = useDeleteUserMutation()

  // Function to handle user deletion with confirmation
  const handleDelete = async (id, data) => {
    const response = await Swal.fire({
      title: "Are you sure you want to delete this user?",
      html: `
        User Name: ${data?.firstName} ${data?.lastName || ''}<br>
        Role: ${data?.role}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: '#DD6B55', // Optional: Set confirm button color to red
      cancelButtonColor: '#aaa',     // Optional: Set cancel button color to gray
      confirmButtonText: "Delete User",
      cancelButtonText: "Cancel",
      customClass: {
        title: 'text-xl font-semibold',  // Tailwind classes for smaller title size
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary'
      }
    });

    if (response.isConfirmed) {
      const res = deleteUser({ variables: { where: { id } } }).then((res) => {
        console.log(res);
        refetch();

      }); if (res) {
        SweetalertSuccess()
      }

    }
  };

  // Define the table columns with only required fields
  const columns = useMemo(
    () => [
      { Header: "User No", accessor: "idNo" },

      // { Header: "Email", accessor: "email", },

      { Header: "First Name", accessor: "firstName", },

      { Header: "Last Name", accessor: "lastName" },
    

      { Header: "Mobile", accessor: "mobile" },
      { Header: "Created At",  Cell: ({ value }) => FormatDate(value),accessor: "createdAt" },
      { Header: "Status", accessor: "status", },
      { Header: "Role", accessor: "role", },
      { Header: "State", accessor: "state", },


      // { Header: "Balance (EMD Amount)", accessor: "BalanceEMDAmount", },

      // { Header: "City", accessor: "city", },
      // { Header: "User Category", accessor: "userCategory", },

      {
        Header: "Active Bids",
        disableSort: true,
        Cell: ({ row }) => {
          const activeBidsCount = row.original?.activeBids?.length;

          const isDisabled = activeBidsCount === 0;
          const buttonClass = isDisabled
            ? `${Tablebutton.data} bg-gray-400   `
            : `${Tablebutton.data} bg-green-400`;

          return isDisabled ? (
            <button
              className={`${buttonClass} cursor-not-allowed `}
              disabled

            >
              {activeBidsCount}
            </button>
          ) : (
            <a
              className={buttonClass}
              href={`/bids-user/${row.original.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activeBidsCount}
            </a>
          );
        }
      },
      {
        Header: "Current Buying Limit",
        disableSort: true,
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
        disableSort: true,
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
        disableSort: true,
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
        disableSort: true,
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

      {


        Header: "Action",
        disableSort: true,
        Cell: ({ row }) => (
          <button className={`${Tablebutton.data} bg-red-600 text-lg`} onClick={() => handleDelete(row.original.id, row.original)}>
            <ImBin2 />
          </button>
        )
      },
    ],
    [users]
  );

  let transformedUsers = null

  if (users) {
    transformedUsers = users.map((obj) => ({ ...obj, state: obj.state.split('_').join(' ') }))
  }


  return (
    <>
      {/* <div className=" h-fit">
        <div className="flex flex-col justify-center w-full"> */}
      {/* Optional Header or any additional component */}
      {transformedUsers && <SortedTableComponent columns={columns} data={transformedUsers} pagination='false' global={true} limit={false} />}
      {/* </div>
      </div> */}
    </>
  );
};

export default TabbleOfUsersOrUser;

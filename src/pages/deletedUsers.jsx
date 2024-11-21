import React, { useEffect, useMemo } from "react";
import Swal from "sweetalert2";

import { useDeletedUsersQuery, useRestoreUserMutation } from "../utils/graphql";
import { pageHead, Tablebutton } from "../components/utils/style";
import TableComponent from "../components/utils/table";
import { SweetalertSuccess } from "../components/utils/sweetalert";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
const TabbleOfDeletedUser = () => {
    const { data: users, refetch, loading } = useDeletedUsersQuery();
    const [RestorUser] = useRestoreUserMutation();
  
    useEffect(() => {
      if (!loading) {
        refetch();
      }
    }, [refetch, loading]);
  
    const handleRestor = async (id) => {
      const response = await Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      });
  
      if (response.isConfirmed) {
        try {
          const res = await RestorUser({
            variables: { where: { id } },
          });
  
          if (res) {
            SweetalertSuccess();
            refetch(); // Trigger a refetch only after mutation success
          }
        } catch (error) {
          console.error("Error restoring user:", error);
        }
      }
    };
  
    const columns = useMemo(
      () => [
        { Header: "User No", Cell: ({ row }) => row.original?.idNo },
        { Header: "First Name", accessor: "firstName" },
        { Header: "Last Name", accessor: "lastName" },
        { Header: "Mobile", accessor: "mobile" },
        { Header: "Role", accessor: "role" },
        { Header: "State", accessor: "state" },
        {
          Header: "Restore",
          Cell: ({ row }) => (
            <button
              className={`${Tablebutton?.data} bg-green-700 text-lg`}
              onClick={() => handleRestor(row.original.id)}
            >
              <MdOutlineSettingsBackupRestore />
            </button>
          ),
        },
      ],
      []
    );
  
    return (
      <>
       
       
        <div className="pl-10">
        <div className={pageHead.data}>Deleted Users Table</div>
          <TableComponent columns={columns} data={users?.deletedUsers || []} />
          <div className="flex items-center p-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border rounded-full px-3 py-2"
          >
            <IoArrowBack className="text-lg" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
        </div>
      </>
    );
  };
  
  export default TabbleOfDeletedUser;
  
import React, { useMemo } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useDeletedUsersQuery, useRestoreUserMutation } from "../utils/graphql";
import { pageHead, Tablebutton } from "../components/utils/style";
import TableComponent from "../components/utils/table";
import { SweetalertSuccess } from "../components/utils/sweetalert";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

const TabbleOfDeletedUser = () => {
    const { data: users, refetch, loading } = useDeletedUsersQuery();
    const [RestorUser] = useRestoreUserMutation();

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

    const columns = useMemo(() => [
        { Header: "User No", Cell: ({ row }) => row.original?.idNo },
        { Header: "First Name", accessor: "firstName" },
        { Header: "Last Name", accessor: "lastName" },
        { Header: "Mobile", accessor: "mobile" },
        { Header: "Role", accessor: "role" },
        { Header: "State", accessor: "state" },
        // {
        //     Header: "User Details",
        //     Cell: ({ row }) => (
        //         <a
        //             className={`${Tablebutton.data} bg-blue-500`}
        //             href={`/view-user/${row.original.id}`}
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             <FontAwesomeIcon icon={faUserPen} />
        //         </a>
        //     ),
        // },
        {
            Header: "Restore",
            Cell: ({ row }) => (
                <button  className={`${Tablebutton?.data} bg-green-700 text-lg`} onClick={() => handleRestor(row.original.id)}><MdOutlineSettingsBackupRestore/></button>
            ),
        },
    ], []);

    return (
        <>
     
           <div className=" ">
           <div className={pageHead.data}> Deleted Users Table</div>
           <div className="pl-10">
            <TableComponent columns={columns} data={users?.deletedUsers || []} />
            </div>
            </div>
        </>
    );
};

export default TabbleOfDeletedUser;

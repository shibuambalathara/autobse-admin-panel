import React, { useEffect, useMemo } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSellersQuery } from "../../utils/graphql"; // Ensure your GraphQL hook is typed correctly

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import TableComponent from "../utils/table";
import CustomButton from "../utils/buttons";
import { Tablebutton } from "../utils/style";
export interface Seller {
  id: string;
  name: string;
  contactPerson: string;
  mobile: string;
  billingContactPerson: string;
  nationalHead: string;
  logo: string;
} // Add a type definition for Seller

const Table: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useSellersQuery();

  useEffect(() => {
    refetch();
   
  }, [refetch]);
 console.log(data ,'data');
  // Memoize columns with appropriate typing
  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" as const },
      { Header: "Contact Person", accessor: "contactPerson" as const },
      // { Header: "Mobile", accessor: "mobile" as const },
      // { Header: "Billing Contact", accessor: "billingContactPerson" as const },
      { Header: "National Head", accessor: "nationalHead" as const },
      {
        Header: "Logo",
        accessor: "logo" as const,
        Cell: ({ row }: { row: { original: Seller } }) => (
          <img src={row.original.logo} alt="Seller Logo" className="h-10 w-10" />
        ),
      },
      {
        Header: "View/Edit Seller",
        Cell: ({ row }: { row: { original: Seller } }) => (
          <a
            className={`${Tablebutton.data} bg-red-500 text-lg`}
            href={`/edit-seller/${row.original.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faBuilding} />
          </a>
        ),
      },
    ],
    []
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-20 ">
      <CustomButton navigateTo={"/add-seller"} buttonText={" Add Seller"}/>
      </div>
      <div className="w-full  h-fit">
        <div className="flex flex-col justify-center  w-full">
          <div className="w-full mb-2">
            <div className="text-center font-extrabold my-5 text-lg ">SELLERS</div>
          </div>
          <TableComponent data={data?.sellers || []} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Table;

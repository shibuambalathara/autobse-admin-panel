import React, { useEffect, useMemo } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSellersQuery } from "../../utils/graphql"; // Ensure your GraphQL hook is typed correctly

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import TableComponent from "../utils/table";
import CustomButton from "../utils/buttons";
import { pageHead, Tablebutton } from "../utils/style";
import AutobseLoading from "../utils/autobseLoading";
import { Button } from "../buttons/radix";
import { FaPlusCircle } from "react-icons/fa";
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
 
  // Memoize columns with appropriate typing
  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" as const },
      { Header: "Contact Person", accessor: "contactPerson" as const },
      // { Header: "Mobile", accessor: "mobile" as const },
      // { Header: "Billing Contact", accessor: "billingContactPerson" as const },
      { Header: "National Head", accessor: "nationalHead" as const },
      // {
      //   Header: "Logo",
      //   accessor: "logo" as const,
      //   Cell: ({ row }: { row: { original: Seller } }) => (
      //     <img src={row.original.logo} alt="Seller Logo" className="h-10 w-10" />
      //   ),
      // },
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

  if (loading) return (
    <div>
       <AutobseLoading/>
        {/* <LoadingAnimation/> */}
    </div>
   
  );
  console.log(data ,'data');
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-24 ">
      <div className={pageHead.data}>SELLERS</div>
      <div className=" flex items-center place-self-end gap-2">
            <Button onClick={() =>navigate("/add-seller")} size="sm" className="h-8 gap-1">
              <FaPlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Seller
              </span>
            </Button>
          </div>
      </div>
      <div className="w-full  h-fit">
        <div className="flex flex-col justify-center  w-full">
          <div className="w-full mb-2">
           
          </div>
          <TableComponent data={data?.sellers || []} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Table;

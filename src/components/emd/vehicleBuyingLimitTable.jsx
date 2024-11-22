
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useBuyingLimitQuery } from "../../utils/graphql";
import { useTable,useSortBy, usePagination, useGlobalFilter } from "react-table";
import SearchUser from "../utils/search";
import TableComponent from "../utils/table";
import format from 'date-fns/format'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Tablebutton } from "../utils/style";
import AutobseLoading from "../utils/autobseLoading";

const VehicleBuyingLimitComponent = () => {
  const{userId}=useParams()

  const navigate = useNavigate();

  const { data, loading, error } = useBuyingLimitQuery({variables:{where:{id:userId}}});
 
console.log(data,"data");

  


  const handleBuyingLimit=(id)=>{
    
    navigate(`/update-payment/${id}`)
  }

  const columns = useMemo(
    () => [
         { Header: "Emd Number", accessor: "emdNo" ,  className: 'w-1/3',  },
       { Header: "vehicle Buying Limit", accessor: "vehicleBuyingLimitIncrement" ,  className: 'w-1/3', },
       { Header: "Amount", accessor: "payment.amount" ,  className: 'w-1/3', },
       {
        Header: "Created At",
        accessor: ({ createdAt }) => new Date( createdAt),
        sortType: "datetime",
        Cell: ({ value }) => format(value, "dd/MM/yy, HH:mm"),
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
        Header: "Edit Payment",
        Cell: ({ row }) => (
          <button
            className="btn btn-info"
            onClick={() => handleBuyingLimit(row.original.payment.id)}
          >
         Edit
          </button>
        ),
      },

   
    ],
    []
  );
  const tableData = useMemo(() => (data ? data.user?.emdUpdates : []), [data]);






  if (loading) return <AutobseLoading/>
  if (error) return <p>Error :{error}</p>;
  

  return (
    <div className="w-full  h-fit  ">


      <div className=" max-w-7xl mx-auto h-fit">
        <div className=" flex flex-col justify-center m-auto w-full">
          <div className="mb-4">
            <div className="text-center font-extrabold my-1  text-2xl w-full">
              {" "}
              {data?.user?.firstName.toUpperCase()} {data?.user?.lastName.toUpperCase()} BUYING LIMIT DETAILS
            </div>
          
          </div>
         
          <TableComponent data={data?.user?.emdUpdates} columns={columns}/>
          
        </div>
      </div>
    </div>
  );
};

export default VehicleBuyingLimitComponent;

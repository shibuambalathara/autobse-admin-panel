


import {
  useDeletePaymentMutation,
  usePaymentsQuery,
} from "../../utils/graphql";

import LimitedDataPaginationComponents from "../utils/limitedDataPagination";
import PaymentTable from "./paymentTable";
import { useEffect, useState } from "react";

const AllPaymentComponent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize=10;
  const { data, loading ,refetch} = usePaymentsQuery({
    variables: {
      skip: currentPage * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    },
  });
console.log(data,'payments');
useEffect(() => {
  refetch();
 
}, [refetch]);
   const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
   }

  if (loading) return <p>Loading...</p>;
  return (
    <div className="">
      
     <PaymentTable data={data?.payments||[]}/>
       {/* <LimitedDataPaginationComponents
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />  */}
    </div>
  );
};

export default AllPaymentComponent;

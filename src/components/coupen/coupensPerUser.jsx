import React,{useMemo} from "react";
import { useParams } from "react-router-dom";
import { useCoupensperUserQuery } from "../../utils/graphql";
import TableComponent from "../utils/table";


const CoupensperUser = () => {
  const { id } = useParams();
  const { data, loading, error } = useCoupensperUserQuery({ variables: { where: { userDetail: { id: { equals: id } } } } });

  const columns = useMemo(
    () => [
      { Header: "Coupen Number", accessor: "coupenNumber" },
      { Header: "Token Status", accessor: "coupenStatus" },
      {
        Header: "vehicle No",
        Cell: ({ row }) => (
          row.original?.vehicleDetail && (
            <a className="btn btn-secondary" href={`/edit-vehicle/${row.original?.vehicleDetail?.id}`} target="_blank" rel="noopener noreferrer">
              {row.original?.vehicleDetail?.registrationNumber}
            </a>
          )
        )
      },
    ],
    []
  );


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="text-center font-extrabold my-1 text-2xl w-full">
        Coupens Of {data?.coupens[0]?.userDetail?.firstName} {data?.coupens[0]?.userDetail?.lastName}
      </div>
      <TableComponent tableData={data?.coupens} columns={columns} />

    </div>
  );
};

export default CoupensperUser;
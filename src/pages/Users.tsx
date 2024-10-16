import { useEffect, useState } from "react";
import {
  useUsersQuery,
  useUsersLazyQuery,
} from "../utils/graphql"; // Adjust imports based on actual GraphQL queries and hooks
import { useNavigate } from "react-router-dom";
import LimitedDataPaginationComponents from "../components/utils/limitedDataPagination";
import TabbleOfUsersOrUser from "../components/users/tableData";

// Define variables type based on your GraphQL schema
type UserQueryVariables = {
  skip?: number;
  take?: number;
  data?: {
    mobile?: string;
  };
  where?: {
    createdAt?: { gte: string };
    role?: { equals: string };
    state?: { equals: string };
    tempToken?: { equals: number };
  };
  orderBy?: Array<{ idNo: 'asc' | 'desc' }>;
};

// Define the user type based on the given data structure
type User = {
  id: string;
  email: string ;
  role: string;
  firstName: string;
  BalanceEMDAmount: number;
  country: string;
  city: string;
  userCategory: string;
  status: string;
};

const   Users = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [inputData, setInputData] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [dealerRole, setDealerRole] = useState<string | undefined>(undefined);
  const [state, setState] = useState<string>('');
  const [token, setToken] = useState<number>( 0);
  const [lastQueryType, setLastQueryType] = useState<"number" | "date" | "role" | "state" | "all" | "token">("all");

  const [users, setUsers] = useState<User[]>([]);

  // Fetch all users initially
  const { data: allUsers, refetch: refetchAll } = useUsersQuery({
    variables: {
      
      // skip: currentPage * pageSize,
      // take: pageSize,
      // orderBy: [{ idNo: 'desc' }],
    },
  });
console.log('data',allUsers);

  // Function to refetch data based on last query type
  const refetchAllData = () => {
    switch (lastQueryType) {
      case "all":
        // refetchAll();
        break;
      // Other cases for different refetch types
    }
  };

  useEffect(() => {
    if (allUsers && allUsers.users) {
      // Filter out null values before setting the state
      const filteredUsers = allUsers.users.filter((user): user is User => user !== null);
      setUsers(filteredUsers);
    }
  }, [allUsers]);
  const handleInputData = (data: string) => {
    setInputData(data);
    setLastQueryType("number");
    // fetchUserByMobile(); // Trigger fetch based on the input logic
  };

  const handleInputDate = (data: string) => {
    setStartDate(data);
    setLastQueryType("date");
    // fetchByDate(); // Trigger fetch based on the input logic
  };

  const handleInputRole = (data: string) => {
    setDealerRole(data);
    setLastQueryType("role");
    // fetchByRole(); // Trigger fetch based on the input logic
  };

  const handleInputState = (data: string) => {
    setState(data);
    setLastQueryType("state");
    // fetchStateData(); // Trigger fetch based on the input logic
  };

  const handleToken = (data: number) => {
    setToken(data);
    setLastQueryType("token");
    // fetchByToken(); // Trigger fetch based on the input logic
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    refetchAllData();
  };

  // if (!allUsers)
  //   return <div className="loading">Loading...</div>;

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="text-end mr-32">
          <button
            onClick={() => navigate("/add-user")}
            className="mt-2 w-fit bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Add User
          </button>
        </div>
        <div className="text-center font-extrabold mb-1 text-2xl w-full">Users Data Table</div>
      </div>
      {/* <div className="md:flex my-2 justify-evenly M-5 shadow-xl">
       
        <SearchByNumber inputData={handleInputData} />
        <SearchByDate setDate={handleInputDate} />
        <SeachByRole setRole={handleInputRole} />
        <SearchByState setState={handleInputState} />
        <SearchByToken setToken={handleToken} />
      </div> */}
      <div className="">
        {/* <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">Balance EMD Amount</th>
              <th className="px-4 py-2 border">Country</th>
              <th className="px-4 py-2 border">City</th>
              <th className="px-4 py-2 border">User Category</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.email || "-"}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td className="px-4 py-2 border">{user.firstName || "-"}</td>
                <td className="px-4 py-2 border">{user.BalanceEMDAmount}</td>
                <td className="px-4 py-2 border">{user.country || "-"}</td>
                <td className="px-4 py-2 border">{user.city || "-"}</td>
                <td className="px-4 py-2 border">{user.userCategory || "-"}</td>
                <td className="px-4 py-2 border">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table> */}

        <TabbleOfUsersOrUser users={users} refetch={refetchAllData} />
      </div>
      {/* Pagination component */}
      {/* {lastQueryType === "all" && (
        <LimitedDataPaginationComponents
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )} */}
    </div>
  );
};

export default Users;

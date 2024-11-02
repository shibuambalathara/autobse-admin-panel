import { useEffect, useState } from "react";
import {
  useUsersQuery,
  useViewUserQuery,
  useUsersLazyQuery,
  OrderDirection,
  StateNames
} from "../utils/graphql"; // Adjust imports based on actual GraphQL queries and hooks
import { useNavigate } from "react-router-dom";
import LimitedDataPaginationComponents from "../components/utils/limitedDataPagination";
import TabbleOfUsersOrUser from "../components/users/tableData";
import SearchByNumber from "../components/utils/searchByNumber";
import CustomButton from "../components/utils/buttons";
import SearchByState from "../components/utils/searchByState";

type UserQueryVariables = {
  skip?: number;
  take?: number;
  data?: { mobile?: string };
  where?: {
    createdAt?: { gte: string };
    role?: { equals: string };
    state?: StateNames;
    tempToken?: { equals: number };
  };
  orderBy?: Array<{ idNo: 'asc' | 'desc' }>;
};

type User = {
  id: string;
  email: string;
  role: string;
  firstName: string;
  BalanceEMDAmount: number;
  country: string;
  city: string;
  userCategory: string;
  idNo: number;
  status: string;
  mobile: string;
  lastName: string;
  state:string;
};

const Users = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [inputData, setInputData] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [dealerRole, setDealerRole] = useState<string | undefined>(undefined);
  const [state, setState] = useState<StateNames | undefined>(undefined);
  const [token, setToken] = useState<number>(0);
  const [lastQueryType, setLastQueryType] = useState<"number" | "date" | "role" | "state" | "all" | "token">("all");

  const [users, setUsers] = useState<User[]>([]);

  const { data: allUsers, refetch: refetchAll } = useUsersQuery({
    variables: {
       skip: currentPage * pageSize,
      take: pageSize,
      orderBy: [{ idNo: OrderDirection.Desc }],
    },
  });

  const [fetchStateData, { data: stateData, refetch: refetchStateData, loading: stateLoading }] = useUsersLazyQuery({
    variables: { where: { state } },
  });

  const { data: userData, refetch: refetchMobile, loading: usersLoading } = useViewUserQuery({
    variables: { where: { mobile: String(inputData) } },
  });

  const refetchAllData = () => {
    switch (lastQueryType) {
      case "all":
        refetchAll();
        break;
      case "number":
        refetchMobile();
        break;
      case "state":
        refetchStateData();
        break;
    }
  };

  useEffect(() => {
    let fetchedUsers: User[] = [];
    switch (lastQueryType) {
      case "all":
        fetchedUsers = (allUsers?.users || []).filter((user): user is User => user !== null);
        break;
      case "number":
        fetchedUsers = userData?.user ? [userData.user as User] : [];
        break;
      case "state":
        fetchedUsers = (stateData?.users || []).filter((user): user is User => user !== null);
        break;
    }
    setUsers(fetchedUsers);
  }, [allUsers, userData, lastQueryType, stateData]);

  const handleInputData = (data: string) => {
    setInputData(data);
    setLastQueryType("number");
  };

  const handleInputDate = (data: string) => {
    setStartDate(data);
    setLastQueryType("date");
  };

  const handleInputRole = (data: string) => {
    setDealerRole(data);
    setLastQueryType("role");
  };

  const handleInputState = (data: StateNames) => {
    fetchStateData()
    setState(data);
    setLastQueryType("state");
  };

  const handleToken = (data: number) => {
    setToken(data);
    setLastQueryType("token");
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    refetchAllData();
  };

  return (
    <div className="w-full">
      <div className="w-full px-20">
        <CustomButton navigateTo={"/add-user"} buttonText={"Add User"} />
        <div className="text-center font-extrabold mb-1 text-xl w-full">Users Data Table</div>
      </div>
      <div className="pl-20 flex gap-5">
        <SearchByNumber inputData={handleInputData} />
        <SearchByState setState={handleInputState} />
      </div>
      <div>
        <TabbleOfUsersOrUser users={users} refetch={refetchAllData} />
        <LimitedDataPaginationComponents
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
      </div>
    </div>
  );
};

export default Users;

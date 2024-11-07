import { useEffect, useState } from "react";
import {
  useUsersLazyQuery,
  OrderDirection,
  StateNames,
  UserRoleType,
  useCountsQuery
} from "../utils/graphql";
import { useNavigate } from "react-router-dom";
import LimitedDataPaginationComponents from "../components/utils/limitedDataPagination";
import TabbleOfUsersOrUser from "../components/users/tableData";
import SearchByNumber from "../components/utils/searchByNumber";
import CustomButton from "../components/utils/buttons";
import SearchByState from "../components/utils/searchByState";
import SearchByDate from "../components/utils/SearchByDate";
import SeachByRole from "../components/utils/seachByRole";
import NoResults from "../components/utils/emptyComponent";
import NotFoundPage from "../components/utils/emptyComponent";

type UserQueryVariables = {
  where?: {
    mobile?: string;
    createdAt?: { gte: string };
    role?: UserRoleType;
    state?: StateNames;
    tempToken?: number;
  } | null;
  take?: number;
  skip?: number;
  orderBy?: Array<{ idNo: OrderDirection }>;
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
  state: string;
};

const Users = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [userCount, setUserCount] = useState(0);
  const [inputData, setInputData] = useState<string | number>();
  const [startDate, setStartDate] = useState<string>("");
  const [dealerRole, setDealerRole] = useState<UserRoleType | undefined>(undefined);
  const [state, setState] = useState<StateNames | undefined>(undefined);
  const [token, setToken] = useState<number>(0);
  const [lastQueryType, setLastQueryType] = useState<"number" | "date" | "role" | "state" | "all" | "token">("all");

  const [users, setUsers] = useState<User[]>([]);
  const { data: countData, loading: countLoading, error: countError } = useCountsQuery();
  const [fetchUsers, { data, refetch, loading }] = useUsersLazyQuery();

  useEffect(() => {
    if (countData && countData.usersCount !== undefined) {
      setUserCount(countData.usersCount);
    }
  }, [countData]);

  const buildQueryVariables = (): UserQueryVariables => {
    const whereClause: UserQueryVariables["where"] = {};

    if (inputData) whereClause.mobile = String(inputData);
    if (state) whereClause.state = state;
    if (startDate) whereClause.createdAt = { gte: startDate };
    if (dealerRole) whereClause.role = dealerRole;
    if (token) whereClause.tempToken = token;

    return {
      where: Object.keys(whereClause).length > 0 ? whereClause : null,
      take: pageSize,
      skip: currentPage * pageSize,
      orderBy: [{ idNo: OrderDirection.Desc }]
    };
  };

  const refetchAllData = () => refetch(buildQueryVariables());

  useEffect(() => {
    refetchAllData();
  }, [currentPage, pageSize, inputData, dealerRole, state]);

  useEffect(() => {
    if (data && data.users) {
      const fetchedUsers = data.users.filter((user): user is User => user !== null);
      setUsers(fetchedUsers);

      // Update userCount based on filters
      const isFiltered = inputData || state  || dealerRole ;
      setUserCount(isFiltered ? fetchedUsers.length : countData?.usersCount || 0);
    }
  }, [data, countData, inputData, state, dealerRole]);

  const handleInputData = (data: string) => {
    const parsedData = parseInt(data, 10);
    if (!isNaN(parsedData)) {
      setInputData(parsedData);
      setLastQueryType("number");
    }
  };

  const handleInputDate = (data: string) => {
    setStartDate(data);
    setLastQueryType("date");
  };

  const handleClearFilters = () => {
    window.location.reload();
  };

  const handleInputRole = (data: UserRoleType) => {
    setDealerRole(data);
    setLastQueryType("role");
  };

  const handleInputState = (data: StateNames) => {
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
      <div className="pl-24 mt-4 flex gap-5 h-fit">
        <SearchByNumber inputData={handleInputData} value={inputData} />
        <SearchByState setState={handleInputState} value={state} />
        {/* <SearchByDate setDate={handleInputDate} value={startDate} /> */}
        <SeachByRole setRole={handleInputRole} value={dealerRole} />
        <button
          className="bg-red-600 text-white h-10 place-self-end px-6 font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 p-2 border text-sm w-fit"
          onClick={handleClearFilters}
        >
          Clear
        </button>
      </div>
      <div>
        {users.length > 0 ? (
          <>
            <TabbleOfUsersOrUser users={users} refetch={refetchAllData} />
            <LimitedDataPaginationComponents
              totalItems={userCount}
              itemsPerPage={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <>
            <NotFoundPage />
            <LimitedDataPaginationComponents
              totalItems={userCount}
              itemsPerPage={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Users;

import { useEffect, useState } from "react";
import {
  
  OrderDirection,
  StateNames,
  UserRoleType,
  useCountsQuery,
  useSubscriptionUserUpdatesSubscription,
  useUsersQuery
} from "../utils/graphql";
import { useNavigate } from "react-router-dom";
import LimitedDataPaginationComponents from "../components/utils/limitedDataPagination";
import TabbleOfUsersOrUser from "../components/users/tableData";
import CustomButton from "../components/utils/buttons";
import SearchByState from "../components/utils/searchByState";

import SeachByRole from "../components/utils/seachByRole";

import NotFoundPage from "../components/utils/emptyComponent";
import { h2Style, pageHead } from "../components/utils/style";
import AutobseLoading from "../components/utils/autobseLoading";
import DebounceSearchInput from "../components/utils/globalSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs/tab";
import { FaPlusCircle } from "react-icons/fa";
import { Button } from "../components/buttons/radix";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

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
  orderBy?: Array<{ [field: string]: OrderDirection }>;
  search?: string;
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
  const subscribeUser = useSubscriptionUserUpdatesSubscription()
  const [users, setUsers] = useState<User[]>([]);
  const { data: countData, loading: countLoading, error: countError } = useCountsQuery();
  const { data, refetch, loading } = useUsersQuery();
  const [searchInput, setSearchInput] = useState(""); // Immediate input value
  const [searchQuery, setSearchQuery] = useState("");
  const  sortedData = useSelector((state: RootState) => state.sorting);
  const clearFilter = () => {
    setSearchQuery("")
    setSearchInput("")
    setState(undefined)
    setDealerRole(undefined)
  }

  

  // Make sure to import OrderDirection correctly

const buildQueryVariables = (): UserQueryVariables => {
  const whereClause: UserQueryVariables["where"] = {};

  if (inputData) whereClause.mobile = String(inputData);
  if (state) whereClause.state = state;
  if (dealerRole) whereClause.role = dealerRole;

  // Dynamic orderBy logic
  const orderBy: UserQueryVariables["orderBy"] = sortedData && sortedData.length > 0 
    ? [{ [sortedData[0]?.id]: sortedData[0]?.order as OrderDirection }] 
    : [{ createdAt: OrderDirection.Desc }];

  if (searchQuery || dealerRole || state) {
    return {
      where: Object.keys(whereClause).length > 0 ? whereClause : null,
      search: searchQuery || undefined,
      skip: currentPage * pageSize,
      orderBy, // Corrected dynamic orderBy
    };
  }

  return {
    where: undefined,
    take: pageSize,
    skip: currentPage * pageSize,
    orderBy, // Corrected dynamic orderBy
    search: undefined,
  };
};

  

  const refetchAllData = () => refetch(buildQueryVariables());

  useEffect(() => {
   console.log(sortedData , "sorted");
    
    if (countData && countData.usersCount !== undefined) {
      setUserCount(countData.usersCount);
    }
    refetch(buildQueryVariables());
  }, [currentPage, pageSize, inputData, dealerRole, state, searchQuery, subscribeUser, countData,sortedData]);
  useEffect(() => {
    if (data && data.users) {
      const fetchedUsers = data.users.filter((user): user is User => user !== null);
      setUsers(fetchedUsers);

      // Update userCount based on filters
      const isFiltered = inputData || state || dealerRole;
      setUserCount( countData?.usersCount || 0);
    }
  }, [data, countData, inputData, state, dealerRole]);

  const showPagination =  users.length > 0;
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
    clearFilter()
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



  if (loading || data === undefined) return (


    <AutobseLoading />

  )

  return (
 
    
    <div className="">
      <div className="w-fit place-self-center  ">
        <div className={pageHead.data}>Users </div>

 
        
    
    
  
      </div>
      <div className="mx-20 flex items-center place-self-end gap-2">
      <Button onClick={() => navigate("/deleted-users")} size="sm" variant="outline" className="h-8 gap-1">
        
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Deleted Users        </span>
      </Button>
      <Button onClick={() => navigate("/add-user")} size="sm" className="h-8 gap-1">
        <FaPlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Add User
        </span>
      </Button>
    </div>
      <div className=" justify-center  mr-56  mt-4 flex gap-5 h-fit">
        
        <div className="w-72 pt-5">
          <DebounceSearchInput
            placeholder="Search by Name or Mobile..."
            value={searchInput}
            onChange={setSearchInput} // Update input immediately
            onSearch={setSearchQuery} // Trigger search after debounce
            className="px-3 py-2 border rounded-md w-full"
          />
        </div>
        <SearchByState key={state} setState={handleInputState} value={state} />
        <SeachByRole key={dealerRole} setRole={handleInputRole} value={dealerRole} />
        <button
          className="bg-red-600 text-white h-10 place-self-end px-6 font-semibold rounded-lg shadow-md transform hover:bg-red-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 p-2 border text-sm w-fit"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
        <div className="place-self-end flex gap-5">


        </div>

      </div>
      <div>

        {users.length > 0 ? (
          <>
<div className="place-self-center">
            <TabbleOfUsersOrUser users={users} refetch={refetchAllData} />

            {showPagination && <LimitedDataPaginationComponents
              totalItems={userCount}
              itemsPerPage={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />}
            </div>
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

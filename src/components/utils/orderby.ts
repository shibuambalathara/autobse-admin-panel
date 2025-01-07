import { OrderDirection, UsersQueryVariables } from "../../utils/graphql";


type SortedData = Array<{ id: string; order: string }>;

export const getOrderBy = (sortedData?: SortedData): UsersQueryVariables["orderBy"] => {
  return sortedData && sortedData.length > 0
    ? [{ [sortedData[0]?.id]: sortedData[0]?.order as OrderDirection }]
    : [{ createdAt: OrderDirection.Desc }];
};

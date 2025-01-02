export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
  }
  
  export type SortDirection = 'ASC' | 'DESC' | undefined;
  
  export interface SortContextType {
    sortDirection: SortDirection;
    toggleSort: () => void;
  }
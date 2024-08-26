import { createContext, Dispatch, SetStateAction } from "react";

// Define the type for the context
interface DataContextType {
  sharedValue: {code:string,grid:any[],isCalling:boolean};
  setSharedValue: Dispatch<SetStateAction<{code:string,grid:[],isCalling:boolean}>>;
}

// Create the context with an initial value (you can use null or default values)
const DataContext = createContext<DataContextType | undefined>(undefined);

export default DataContext;

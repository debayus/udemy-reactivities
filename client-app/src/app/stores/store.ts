import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommontStore from "./commontStore";

interface Store{
    activityStore : ActivityStore;
    commonStore : CommontStore;
}

export const store: Store = {
    activityStore : new ActivityStore(),
    commonStore : new CommontStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}
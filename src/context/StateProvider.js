import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();
export const StateProvider = ({reducer, initailState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initailState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)
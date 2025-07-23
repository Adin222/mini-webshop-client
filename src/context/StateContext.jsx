import { createContext } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children, values }) => {
  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
};

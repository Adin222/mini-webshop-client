import { useContext } from "react";
import { StateContext } from "../context/StateContext";

const useUserState = () => {
  const context = useContext(StateContext);

  if (!context) throw new Error("useState must be used within a ThemeProvider");

  return context;
};

export default useUserState;

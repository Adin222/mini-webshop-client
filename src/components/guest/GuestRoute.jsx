import { Navigate } from "react-router-dom";
import useUserState from "../../hooks/useUserState";

export const GuestRoute = ({ children }) => {
  const { is_auth } = useUserState();

  if (is_auth) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

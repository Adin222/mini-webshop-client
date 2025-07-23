import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { Navbar } from "./components/Navbar";
import { SignIn } from "./pages/SignIn/SignIn";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./components/Loading";
import { StateContext } from "./context/StateContext";
import "./App.css";

//Service
import { Get } from "./services/services";

//Paths
import { authStatusPath } from "./paths/paths";

function App() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["check-logged-user"],
    queryFn: () => Get(authStatusPath),
    retry: false,
  });

  const location = useLocation();

  if (isLoading) return <Loading />;

  const { is_auth } = data?.data?.user;

  const value = {
    is_auth,
    refetch,
  };

  return (
    <React.Fragment>
      <StateContext value={value}>
        {location.pathname !== "/sign-in" && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="sign-in" element={<SignIn />} />
        </Routes>
      </StateContext>
    </React.Fragment>
  );
}

export default App;

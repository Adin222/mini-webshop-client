import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/guest/HomePage";
import { SignIn } from "./pages/guest/SignIn";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./components/core/Loading";
import { StateContext } from "./context/StateContext";
import { GuestLayout } from "./layouts/GuestLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminHomepage } from "./pages/admin/AdminHomepage";
import { AdminRoute } from "./components/admin/AdminRoute";
import { GuestRoute } from "./components/guest/GuestRoute";
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

  if (isLoading) return <Loading />;

  const { is_auth } = data?.data?.user;

  const value = {
    is_auth,
    refetch,
  };

  return (
    <React.Fragment>
      <StateContext value={value}>
        <Routes>
          <Route
            element={
              <GuestRoute>
                <GuestLayout />
              </GuestRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="sign-in" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminHomepage />} />
          </Route>
        </Routes>
      </StateContext>
    </React.Fragment>
  );
}

export default App;

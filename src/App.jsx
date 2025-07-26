import React from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//Components
import { Loading } from "./components/core/Loading";
import { AdminRoute } from "./components/admin/AdminRoute";
import { GuestRoute } from "./components/guest/GuestRoute";

//Layouts
import { GuestLayout } from "./layouts/GuestLayout";
import { AdminLayout } from "./layouts/AdminLayout";

//Pages
import { HomePage } from "./pages/guest/HomePage";
import { SignIn } from "./pages/guest/SignIn";
import { ErrorNotFound } from "./pages/core/ErrorNotFound";
import { AdminHomepage } from "./pages/admin/AdminHomepage";
import { MyProfile } from "./pages/admin/MyProfile";

//Hooks
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

  if (isLoading) return <Loading />;

  const { is_auth, id } = data?.data?.user;

  const value = {
    is_auth,
    id,
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
            <Route path="my-profile" element={<MyProfile />} />
          </Route>
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </StateContext>
    </React.Fragment>
  );
}

export default App;

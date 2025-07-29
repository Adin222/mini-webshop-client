import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

//Components
import { Loading } from "./components/core/Loading";
import { AdminRoute } from "./components/admin/AdminRoute";
import { GuestRoute } from "./components/guest/GuestRoute";
import { ScrollToTop } from "./components/core/ScrollToTop";

//Layouts
import { GuestLayout } from "./layouts/GuestLayout";
import { AdminLayout } from "./layouts/AdminLayout";

//Pages
import { HomePage } from "./pages/core/HomePage";
import { SignIn } from "./pages/guest/SignIn";
import { ErrorNotFound } from "./pages/core/ErrorNotFound";
import { MyProfile } from "./pages/admin/MyProfile";
import { ProductManagement } from "./pages/admin/ProductManagement";
import { ProductDetails } from "./pages/core/ProductDetails";
import { Cart } from "./pages/guest/Cart";
import { Checkout } from "./pages/guest/Checkout";

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

  useEffect(() => {
    const existingSessionId = Cookies.get("session_id");
    if (!existingSessionId) {
      const session_id = Math.random().toString(36).substring(2);
      Cookies.set("session_id", session_id, { expires: 30, path: "/" });
    }
  }, []);

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
        <ScrollToTop />
        <Routes>
          <Route
            element={
              <GuestRoute>
                <GuestLayout />
              </GuestRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:product_id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
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
            <Route index element={<HomePage />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="product-management" element={<ProductManagement />} />
            <Route path="product/:product_id" element={<ProductDetails />} />
          </Route>
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </StateContext>
    </React.Fragment>
  );
}

export default App;

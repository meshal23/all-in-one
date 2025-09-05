import React from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import useAuthStore from "~/stores/useAuthStore";

const RequireAuth = () => {
  //   const auth = useAuthStore();
  const location = useLocation();
  const user = useAuthStore((state) => state.fetchUser);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  console.log(user());

  //   const userState = useAuthStore((state) => state.isLoggedIn);

  //   console.log("User: ", userState);

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default RequireAuth;

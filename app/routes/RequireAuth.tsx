import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import useAuthStore from "~/stores/useAuthStore";

const RequireAuth = () => {
  //   const auth = useAuthStore();
  const location = useLocation();
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    (async () => {
      let user = await fetchUser();
      user && setLoginStatus(true);
      console.log(user);
      if (!user) {
        setTimeout(() => fetchUser(), 200);
        console.log(user);
        setLoginStatus(true);
      }
    })();
  }, []);

  console.log(loginStatus);
  console.log(isLoggedIn);

  const userLoggedIn = localStorage.getItem("userLoggedIn");

  //   const userState = useAuthStore((state) => state.isLoggedIn);

  //   console.log("User: ", userState);

  if (userLoggedIn) {
    return <Outlet />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
};

export default RequireAuth;

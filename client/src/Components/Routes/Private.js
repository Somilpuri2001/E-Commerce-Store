import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const [success, setSuccess] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
      );
      if (res.data.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return success ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;

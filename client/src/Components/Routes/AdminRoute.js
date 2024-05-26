import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
      );
      if (res.data.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return success ? <Outlet /> : <Spinner path="/" />;
};

export default AdminRoute;

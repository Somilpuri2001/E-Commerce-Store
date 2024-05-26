import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";

const Resetpassword = () => {
  const [email, setEmail] = useState("");
  const [isValidToken, setValidToken] = useState(false);

  const { id, token } = useParams();

  useEffect(() => {
    const verifyToken = async (id, token) => {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/reset-password-token-verification`,
        { id, token }
      );
      if (res.data.success) {
        setEmail(res.data.email);
        setValidToken(true);
      }
    };
    verifyToken(id, token);
  }, [id, token]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/reset-password`,
        { id, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setButtonDisable(true);
      } else {
        toast.error(res.data.message);
      }
    }
  }

  return (
    <Layout title="Reset Password - Ecommerce App">
      {isValidToken ? (
        <>
          <div className="register">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Email address<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  value={email}
                  readOnly
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                  Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                />
                {confirmPassword.length !== 0 && password.length !== 0 ? (
                  confirmPassword !== password ? (
                    <>
                      <p style={{ color: "red" }}>Password did not match</p>
                    </>
                  ) : (
                    <>
                      <p style={{ color: "green" }}>Password matched</p>
                    </>
                  )
                ) : (
                  <></>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={buttonDisable}
              >
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <p>OOPS! Inavalid link or link Expired</p>
        </>
      )}
    </Layout>
  );
};

export default Resetpassword;

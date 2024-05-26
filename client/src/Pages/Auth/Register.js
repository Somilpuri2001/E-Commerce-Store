import React, { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone }
      );
      if(res.data.success){
        toast.success(res.data.message);
        
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(`Error Occured in Register Form -> Error Message : ${error}`);
      toast.error("Something went wrong.");
    }
  }

  return (
    <Layout title="Register - Ecommerce App">
      <div className="register">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="form-control"
              id="inputName"
              required
            />
            <label htmlFor="inputEmail1" className="form-label">
              Email address<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              id="inputEmail"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
              id="inputPassword"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPhone" className="form-label">
              Phone Number<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="form-control"
              id="inputPhone"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;

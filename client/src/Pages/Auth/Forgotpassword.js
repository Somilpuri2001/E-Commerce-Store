import React, { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
        
        const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email }

      );

      if(res.data.success){
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log(`Error occured in Forgotpassword page -> Error message: ${error}`)
      toast.error("Error Occured. Please try again later");
    }
  }

  return (
    <Layout title="Forgot Password - Ecommerce App">
      <div className="register">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
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

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Forgotpassword;

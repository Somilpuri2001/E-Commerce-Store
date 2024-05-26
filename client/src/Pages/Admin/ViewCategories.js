import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd';
import 'antd/dist/reset.css'
import MultiUtilForm from "../../Components/Form/MultiUtilForm";


const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(false);
  const [name, setName] = useState("");
  const [nameCheck, setNameCheck] = useState("");
  const [id, setId] = useState("");
  
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/dashboard/admin/edit-category/${id}`);
  };
  var count = 0;
  const productCheck = async (id) => {
    try {
      setId(id)
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products-by-category/${id}`);
        if(res.data.success && res.data.product.length>0){
          setProducts(true)
        }else{
          setProducts(false)
        }
    }
    catch (error) {
      console.log(`Error while productCheck :-> Error Message: ${error}`)
      toast.error('Error something went wrong while deleting ')
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(name === nameCheck) {
      try{
        const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`)
        if(res.data.success){
          toast.success(`${name} deleted successfully`)
          setOpen(false);
          setNameCheck("")
          window.location.reload(); 
        }else{
          toast.error("Oops! The name did not match")
        }
        
      }
      catch(error){
        console.log(`Error while deleting category -> Error message: ${error}`)
        toast.error("Error while deleting category")
      }
    } else {
      setErrorMessage("Oops! The entered word did not match"); // Set error message
    }
  }
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (res.data?.success) {
        setCategories(res.data?.category);
      }
    } catch (error) {
      console.log(`Error while creating category -> Error Message : ${error}`);
      toast.error("Someting went wrong on fetching category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout title={"Dashboard - View Category"}>
      <div className="container-fluid m-0.5 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>View Categories</h1>
            <div>
              <table className="table">
                <thead className="text-center">
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {categories.map((c) => (
                    <>
                      <tr>
                        <td>{++count}</td>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              handleClick(c._id);
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2" onClick={() => { setOpen(true); productCheck(c._id); setName(c.name);}}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal onCancel={() => {setOpen(false); setNameCheck("")}} footer={null} open={open}>
            { products ? (<p style={{color: 'red', marginTop:'15px'}}>There are products Availble in this category.</p>):<></> }
            <p>{errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}</p> {/* Display error message */}
            <p><i>To delete this category type {`"${name}"`} below: </i></p>
            <MultiUtilForm
              placeholder={""}
              value={nameCheck}
              setValue={setNameCheck}
              handleChange={(e) => {
                setNameCheck(e.target.value);
                setErrorMessage("");
              }}
              handleSubmit={handleSubmit}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default ViewCategories;


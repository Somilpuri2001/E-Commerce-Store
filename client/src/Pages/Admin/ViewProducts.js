import React, { useState } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/admin-edit-category.css";
import ProductCard from "../../Components/Layouts/ProductCard";


const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      setProducts(data.product);
    } catch (error) {
      console.log(
        `Error while displaying products. :-> Error Message : ${error}`
      );
      toast.error("Something went wrong");
    }
  };

  //lifecycle method
  useState(() => {
    getAllProducts();
  }, []);

 
  return (
    <Layout title={"Dashboard - View Products"}>
      <div className="container-fluid m-0.5 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Products List</h1>

            <div className="d-flex flex-wrap">
            {products ? (
              products.map((p) => (
                <div className="m-2">
                <ProductCard
                  id={p._id}
                  image={`${process.env.REACT_APP_API}/api/v1/product/product-image/${p._id}`}
                  alt={p.alt}
                  title={p.name}
                  name={p.name}
                  description={p.description}
                  link1="Watch"
                  link1_to={`/dashboard/admin/product/${p.slug}`}
                  link1_key={`${p._id}`}
                  link2="Edit"
                  link2_to={`/dashboard/admin/update-product/${p.slug}`}
                />
                </div>
              ))
            ) : (
              <>
                <div className="no-products">
                  <h1 className="heading">No Products Found</h1>
                </div>
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewProducts;

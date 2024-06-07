import { React, useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Product-page.css";

const SingleProductPage = () => {
  const [product, setProduct] = useState(null);
  const [value, setValue] = useState(1);
  const [disableDec, setDisableDec] = useState(false);
  const [disableInc, setDisableInc] = useState(false);
  const [relatedProducts, setRealatedProducts] = useState([]);


  const { pid } = useParams();
  const { slug } = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${slug}`
      );

      if (data?.success) {
        setProduct(data.product);
      }

      getSimilarProduct(data?.product._id,data?.product.category._id)
    } catch (error) {
      console.log(`Error while fetching product:-> Error Message: ${error}`);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getProduct();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setDisableDec(value === 1);
    setDisableInc(value === 10);
  }, [value]);

  const increment = () => {
    setValue(value + 1);
  };

  const decrement = () => {
    setValue(value - 1);
    };

  const getSimilarProduct = async(pid,cid) =>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/similar-products/${pid}/${cid}`)
      setRealatedProducts(data?.products);
    } catch (error) {
      
    }
  }

  return (
    <Layout>
      <div className="row mt-5 container main-container">
        {product ? (
          <>
            <div className="image-div">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${pid}`}
                alt={slug}
                className="product-image"
              />
           </div>
            <div className="product-detail-div">
              <h1>{product.name}</h1>
              <h2>Category: {product.category.name}</h2>
              <h3>Description: {product.description}</h3>
              <h4>₹{product.price}</h4>

              <div className="quantity-div">

                <input
                  type="text"
                  disabled
                  value={value}
                  className="qtyDisplay"
                ></input>
                <div className="btn-div">
                  <button
                    onClick={increment}
                    disabled={disableInc}
                    className="btnInc"
                  >
                    {" "}
                    +{" "}
                  </button>
                  <button
                    onClick={decrement}
                    disabled={disableDec}
                    className="btnDec"
                  >
                    {" "}
                    -{" "}
                  </button>
                </div>
              <button className="add-to-cart">Add To Cart</button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="row similarProductDiv">
        <h1 className="text-center">Similar Products</h1>
        {JSON.stringify(relatedProducts,null,4)}
      </div>
    </Layout>
  );
};

export default SingleProductPage;

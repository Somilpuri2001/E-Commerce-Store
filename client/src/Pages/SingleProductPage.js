import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Product-page.module.css";
import ProductCardHome from "../Components/Layouts/ProductsCardHome";
import { useCart } from "../context/cart";

const SingleProductPage = () => {
  const [product, setProduct] = useState(null);
  const [value, setValue] = useState(1);
  const [disableDec, setDisableDec] = useState(false);
  const [disableInc, setDisableInc] = useState(false);
  const [relatedProducts, setRealatedProducts] = useState([]);
  const [cart, setCart] = useCart();

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

      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(`Error while fetching product:-> Error Message: ${error}`);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
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

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/similar-products/${pid}/${cid}`
      );
      setRealatedProducts(data?.products);
    } catch (error) {
      console.log(`Error while fetching similar products: ${error}`);
    }
  };

  return (
    <Layout>
      <div className={`row mt-5 container ${styles.mainContainer}`}>
        {product ? (
          <>
            <div className={styles.imageDiv}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${pid}`}
                alt={slug}
                className={styles.productImage}
              />
            </div>
            <div className={styles.productDetailDiv}>
              <h1>{product.name}</h1>
              <h2>Category: {product.category.name}</h2>
              <h3>Description: {product.description}</h3>
              <h4>₹{product.price}</h4>

              <div className={styles.quantityDiv}>
                <input
                  type="text"
                  disabled
                  value={value}
                  className={styles.qtyDisplay}
                ></input>
                <div className={styles.btnDiv}>
                  <button
                    onClick={increment}
                    disabled={disableInc}
                    className={styles.btnInc}
                  >
                    +
                  </button>
                  <button
                    onClick={decrement}
                    disabled={disableDec}
                    className={styles.btnDec}
                  >
                    -
                  </button>
                </div>
                <button className={styles.addToCart} onClick={() => { 
                  setCart([...cart, { product: product, orderQuantity: value }]); 
                  toast.success("Product Added to Cart"); }}>Add To Cart</button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={`row ${styles.similarProductDiv}`}>
        <h1 className="text-center">Similar Products</h1>
        <div className={styles.relatedProductDiv}>
          {relatedProducts ? (
            relatedProducts.map((p) => (
              <Link
                to={`/product/${p._id}/${p.slug}`}
                className={styles.homepageLink}
                key={p._id}
              >
                <ProductCardHome
                  id={p._id}
                  image={`${process.env.REACT_APP_API}/api/v1/product/product-image/${p._id}`}
                  alt={p.alt}
                  title={p.name}
                  name={p.name}
                  price={`Rs.${p.price}/-`}
                  btn1={"More Detail"}
                  btn2={"Add to Cart"}
                />
              </Link>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SingleProductPage;

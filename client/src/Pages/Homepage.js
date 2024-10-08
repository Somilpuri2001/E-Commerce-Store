import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import CarouselComponent from "../Components/CarouselComponent";
import axios from "axios";
import { toast } from "react-toastify";
import ProductCardHome from "../Components/Layouts/ProductsCardHome";
import { Link,useNavigate } from "react-router-dom";
import styles from "../styles/Homepage.module.css";
import { useCart } from "../context/cart";


const Homepage = () => {
  const [alt1, setAlt1] = useState();
  const [alt2, setAlt2] = useState();
  const [alt3, setAlt3] = useState();
  const [alt4, setAlt4] = useState();
  const [products, setProducts] = useState();
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const getBannerAlternateText = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/banner/get-alt-text`
      );
      if (data?.alt) {
        setAlt1(data.alt.alt1);
        setAlt2(data.alt.alt2);
        setAlt3(data.alt.alt3);
        setAlt4(data.alt.alt4);
      }
    } catch (error) {
      console.log(
        `Error while fetching alternate text:-> Error Message: ${error}`
      );
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getBannerAlternateText();
  }, []);

  const getLatestProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-latest-products`
      );
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.log(`Error while fetching latest products ${error}`);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getLatestProducts();
  }, []);

  const getCategory = async () => {
    try {
      const category = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );

      if (category.data.success) {
        setCategory(category.data.category);
      } else {
        toast.error("Something went wrong while fetching categories");
      }
    } catch (error) {
      console.log(`Error while fetching categories`);
      toast.error("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Layout title={"Homepage - Ecommerce App"}>
      <CarouselComponent
        img1={`${process.env.REACT_APP_API}/api/v1/banner/get-banner-image1`}
        alt1={alt1}
        img2={`${process.env.REACT_APP_API}/api/v1/banner/get-banner-image2`}
        alt2={alt2}
        img3={`${process.env.REACT_APP_API}/api/v1/banner/get-banner-image3`}
        alt3={alt3}
        img4={`${process.env.REACT_APP_API}/api/v1/banner/get-banner-image4`}
        alt4={alt4}
      />

      <div className="mt-3 w-100 category-container">
        <h2 className={`text-center ${styles.mainHeading}`}>
          Shop by Category
        </h2>
        <div className={styles.mainCategoryDiv}>
          {category.map((c) => (
            <div className={styles.categoryDiv} key={c._id}>
              <Link
                to={`/category/${c._id}/${c.slug}`}
                className={styles.homepageLink}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/category/get-category-image/${c._id}`}
                  alt={c.name}
                />
                <p className={`text-center ${styles.categoryName}`}>{c.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 w-100 product-container">
        <h2 className={`text-center ${styles.mainHeading}`}>
          Our New Products
        </h2>
        <div className={styles.productDiv}>
          {products ? (
            products.map((p) => (
              // <Link
              //   to={`/product/${p._id}/${p.slug}`}
              //   className={styles.homepageLink}
              //   key={p._id}
              // >
                <ProductCardHome
                  id={p._id}
                  image={`${process.env.REACT_APP_API}/api/v1/product/product-image/${p._id}`}
                  alt={p.alt}
                  title={p.name}
                  name={p.name}
                  price={`Rs.${p.price}/-`}
                  btn1={"More Detail"}
                  onclick1={()=>{
                    navigate(`/product/${p._id}/${p.slug}`);
                  }}
                  btn2={"Add to Cart"}
                  onclick2={() => {
                    setCart([...cart, {p}]);
                    toast.success("Product Added To Cart");
                  }}
                />
              // </Link>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className={`mt-3 w-100 ${styles.locateUsContainer}`}>
        <h2 className={`text-center ${styles.mainHeading}`}>About Us</h2>
        <div className={styles.aboutUs}>
          <img
            src="/images/about.jpeg"
            alt="About Us"
            className={styles.aboutUsImage}
          />

          <p className={styles.aboutUsParagraph}>
            We Are The Manufacturer Of Mustard Oil, Spices, And Pickles, Which
            Are Being Packed And Sold By The Brand Name DiZa With The Tagline
            “Eat Pure Enjoy Healthy Life”. We Believe That Everyone Should
            Consume Quality Eatables Which Ensures Healthy Life. The Products
            Which We Manufacture Are The Products With A Difference. The
            Difference In Raw Material Selection, Production Process And Storage
            Process.
          </p>
        </div>
      </div>

      <div className={`mt-3 w-100 ${styles.locateUsContainer}`}>
        <h2 className={`text-center ${styles.mainHeading}`}>Locate Us</h2>
        <div className={styles.locateUs}>
          <div className={styles.locateUsMap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.2288450691512!2d77.28702687510868!3d28.412350875785698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd93eeb44873%3A0xd2ebeed0bfba978d!2sShri%20Balaji%20Agro!5e0!3m2!1sen!2sin!4v1715605721008!5m2!1sen!2sin"
              width={400}
              height={300}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="locate us"
              className={styles.iframeMap}
            />
          </div>
          <div className={styles.locateUsText}>
            <p className={styles.locateUsTextParagraph}>
              <u>
                <b>Address:</b>
              </u>{" "}
              <br />
              Shri Balaji Agro <br /> FCA - 71, Sharma Chowk, Block - E, Pocket
              B, S.G.M. Nagar <br /> New Industrial Township
              <br />
              Faridabad, Haryana
              <br />
              Pincode: 121001
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;

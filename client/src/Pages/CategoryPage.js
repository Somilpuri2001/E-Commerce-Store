import React, { useState,useEffect } from 'react'
import Layout from '../Components/Layouts/Layout'
import { Link, useParams } from 'react-router-dom'
import  styles from "../styles/CategoryPage.module.css"
import ProductCardHome from '../Components/Layouts/ProductsCardHome'
import { toast } from 'react-toastify'
import axios from 'axios'

const CategoryPage = () => {
  const {id} = useParams();
  const {slug} = useParams();
  const [products,setProducts] = useState();
  const [name,setName] = useState('');

  
  const slugToName = (slug) => {
    const words = slug.split('-');
    const name = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');

    return name;
};

 const handleSetName = (slug) => {
  const convertedName = slugToName(slug);
  setName(convertedName);
};


  useEffect(()=>{
    handleSetName(slug);  
  },[slug])

  const getProduct = async () => {
    try {

      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products-by-category/${id}`)
      console.log(data);  
      if(data?.success){
        setProducts(data.product)
      }   
    } catch (error) {
      console.log(`Error while fetching products:-> Error Message: ${error}`)
      toast.error('Something went wrong')
    }
  }

  useEffect(()=>{
    getProduct();
  },[id])

  return (
    <Layout>
    <div className='row mt-3 w-100'>
    <div className={`${styles.headingDiv} w-100`}>
    <h1>{name}</h1>
    </div>
    <div className={`${styles.productDiv}`}>
    {products ? (
            products.map((p) => (
              
              <Link to={`/product/${p._id}/${p.slug}`} className={styles.homepageLink}>
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
  )
}
export default CategoryPage
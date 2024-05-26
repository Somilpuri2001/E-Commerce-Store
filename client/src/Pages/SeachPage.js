import {useState,useEffect} from 'react'
import Layout from "../Components/Layouts/Layout.js";
import { toast } from 'react-toastify';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import ProductCardHome from '../Components/Layouts/ProductsCardHome.js';
import { FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';


function SearchPage() {
  const [products,setProducts] = useState();
  const [categories, setCategories] = useState([]);
  const [checked,setCheck] = useState([]);
  // const [totalPages,setTotalPages] = useState();
  // const [page,setPage] = useState(1);
  const label = { inputProps: { 'aria-label': 'Checkbox' } };
  
 

  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      console.log(res.data);
      if (res.data?.success) {
        setCategories(res.data?.category);
      }
    } catch (error) {
      console.log(`Error while fetching category -> Error Message : ${error}`);
      toast.error("Someting went wrong on fetching category");
    }
  };

  useEffect(()=>{
    getAllCategory();
  },[])

  console.log(categories);



  const getProducts = async() =>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`)
      // setTotalPages(data.totalPages)
      setProducts(data.product)
    } catch (error) {
      console.log(`Error while fetching products:-> Error message: ${error}`);
      toast.error('Something went wrong')
    }
  }

  useEffect(()=>{
   if(!checked.length) getProducts();
    //eslint-disable-next-line
  },[checked.length])
 
  //filter by category
  const handleFilter = async(value,id) => {
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter(c => c !== id )
    }
    setCheck(all)
  }

  //get filtered products
  const filterProducts = async() =>{
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`,{checked})
      setProducts(data?.products)
    } catch (error) {
      console.log(`Error while filtering products:-> Error Message: ${error}`);
      toast.error("Something went wrong while filtering products")
    }
  }

  //clear filter
  const clearFilters = () => {
    setCheck([]);
  };

  useEffect(()=>{
    if(checked.length) filterProducts();
    //eslint-disable-next-line
  },[checked])

  // const handlePageChange = (event,value) => {   
  //   console.log(event,value) 
  //   setPage(value)
  //   getProducts();

  // }
  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter by category</h4>
          <div className='d-flex flex-column' style={{marginLeft:'15px'}}>
          {categories?.map((c)=>(
            <FormControlLabel
            control={<Checkbox {...label} key={c._id} checked={checked.includes(c._id)} onChange={(e) => handleFilter(e.target.checked,c._id)} />}
            label={c.name}
          />
          ))}
          <Button variant="contained" color="error" onClick={clearFilters}>Clear Filters</Button>
          </div>
        </div>
        <div className="col-md-9">
          
          <h2 className="text-center">All Products</h2>
          <div className='d-flex flex-wrap '>
          {products ? (
              products.map((p) => (
                <div className="m-2">
                <ProductCardHome
                  id={p._id}
                  image={`${process.env.REACT_APP_API}/api/v1/product/product-image/${p._id}`}
                  alt={p.alt}
                  title={p.name}
                  name={p.name}
                  // description={p.description}
                  price={`Rs.${p.price}/-`}
                  // link1="Watch"
                  // link1_to={`/dashboard/admin/product/${p.slug}`}
                  // link1_key={`${p._id}`}
                  // link2="Edit"
                  // link2_to={`/dashboard/admin/update-product/${p.slug}`}
                  btn1={'More Detail'}
                  btn2={'Add to Cart'}
                />
                </div>
              ))
            ) : (
              <>
              </>
            )}
          </div>
          <div className='pagination'>
          {/* <Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" color="primary" size='large' /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;

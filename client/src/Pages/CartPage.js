import React, {useEffect} from 'react'
import Layout from '../Components/Layouts/Layout'
import styles from '../styles/cart-page.module.css'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import cardStyles from '../styles/cart-card.module.css'




const CartPage = () => {
  
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  console.log(cart);
  
  return (
    <Layout>
      {cart.length ? (<>
      <div className={`row m-4`}>
        <div className={`heading`}><h2>Your Cart</h2></div>
        <div className={`cards`}>
          {cart.map((item,index)=>{
            return(
             <div key={index} className={`${cardStyles.card}`}>
             <div className={cardStyles.imageDiv}>
                 <img
                   src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${item.product._id}`}
                   className={`${cardStyles.productImage}`}
                 />
               </div>
               <div className={`${cardStyles.productNameDiv}`}>
                <div className={`productName`}> 
                <Link to={`/product/${item.product._id}/${item.product.slug}`} style={{ textDecoration: 'none', color: 'black' }}><h4>{item.product.name}</h4></Link>
                </div>
                <div className={`categoryName`}>
                <Link to={`/category/${item.product.category._id}/${item.product.category.slug}`} style={{ textDecoration: 'none', color: 'black' }}><p>{item.product.category.name}</p></Link>
                </div>
               </div>

              <div className={`qtyDiv`}>
                
              </div>

             </div>
             );
          })}
         
        
        </div>

      </div>
      </>) : 
      (<><div className="container-fluid  mt-100">
        <div className="row">
          <div className={`col-md-12 ${styles.mainDivEmptyCart}`}>
            <div className={`${styles.card}`}>

              <div className={`${styles.cardBody} ${styles.cart}`}>
                <div className="col-sm-12 empty-cart-cls text-center">
                  <img src="https://i.imgur.com/dCdflKN.png" width={130} height={130} className="img-fluid mb-4 mr-3" />
                  <h3><strong>Your Cart is Empty</strong></h3>
                  <h4>Add something to make me happy :)</h4>
                  {auth.user==null ? <><Link to="/login" className={`btn ${styles.btnPrimary} cart-btn-transform m-3`} ><span className={`${styles.btnTextColor}`}>Sign In</span></Link>
                  <Link to="/register" className={`btn ${styles.btnPrimary} cart-btn-transform m-3`} ><span className={`${styles.btnTextColor}`}>Sign Up</span></Link></> : <></>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>)}

    </Layout>
  )
}

export default CartPage
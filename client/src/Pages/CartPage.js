import React from 'react'
import Layout from '../Components/Layouts/Layout'
import styles from '../styles/cart-page.module.css'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import CartCard from '../Components/CartCard'





const CartPage = () => {

  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  let sum=0;
  console.log(cart);

  return (
    <Layout>
      {cart.length ? (<>
        <div className={`row m-4 ${styles.mainDiv}`}>
          <div className={`heading`}><h2>Your Cart</h2></div>
          <div className={`${styles.cards}`}>
          {cart.map((item, index) => {
              {sum = sum+item.product.price}
              return (
                <>
                  
                  <CartCard index={index} 
                  productId={item.product._id}
                  productIdUrl={item.product._id}
                  productSlugUrl={item.product.slug}
                  productName={item.product.name}
                  categoryIdUrl={item.product.category._id}
                  categorySlugUrl={item.product.category.slug}
                  categoryName={item.product.category.name}
                  orderQuantity={item.orderQuantity}
                  price={item.product.price}
                  />   
                </>
              );
            })}
          <h5 className={`${styles.subtotal}`}>Subtotal: {sum}</h5>
          </div>
          <div className={`${styles.rightDiv}`}>
            <div className={`${styles.pincodeDiv}`}>
             <div className={`${styles.pincodeHeading}`}> <h5>Enter Pincode:</h5></div>
             <div className={`${styles.pincodeInputDiv}`}> 
                <input 
                 type='text'
                 placeholder='Enter pincode'
                 pattern='[0-9]{6}'
                 maxlength="6"
                 className={`${styles.pincodeInput}`}>
                </input>
                <button type='submit' className={`${styles.pincodeButton}`}>
                  Check
                </button>
              </div>
            </div>
              
          </div>
        </div>
      </>) 
      :  
        (<><div className="container-fluid  mt-100">
          <div className="row">
            <div className={`col-md-12 ${styles.mainDivEmptyCart}`}>
              <div className={`${styles.card}`}>
                <div className={`${styles.cardBody} ${styles.cart}`}>
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <img src="https://i.imgur.com/dCdflKN.png" width={130} height={130} className="img-fluid mb-4 mr-3" />
                    <h3><strong>Your Cart is Empty</strong></h3>
                    <h4>Add something to make me happy :)</h4>
                    {auth.user == null ? <><Link to="/login" className={`btn ${styles.btnPrimary} cart-btn-transform m-3`} ><span className={`${styles.btnTextColor}`}>Sign In</span></Link>
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
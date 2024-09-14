import React from 'react'
import cardStyles from "../styles/cart-card.module.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const CartCard = (props) => {
  return (
    <>
      <div key={props.index} className={`${cardStyles.card}`}>
        <div className={cardStyles.imageDiv}>
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${props.productId}`}
            className={`${cardStyles.productImage}`}
          />
        </div>
        <div className={`${cardStyles.productNameDiv}`}>
          <div className={`productName`}>
            <Link to={`/product/${props.productIdUrl}/${props.productSlugUrl}`} style={{ textDecoration: 'none', color: 'black' }}><h4>{props.productName}</h4></Link>
          </div>
          <div className={`categoryName`}>
            <Link to={`/category/${props.categoryIdUrl}/${props.categorySlugUrl}`} style={{ textDecoration: 'none', color: 'black' }}><p>{props.categoryName}</p></Link>
          </div>
        </div>

        <div className={`${cardStyles.qtyDiv}`}>
          <button
            // onClick={}
            // disabled={}
            className={cardStyles.btnDec}
          >
            {props.orderQuantity   == 1 ?
              <><span className={`${cardStyles.btnTextDelete}`}><DeleteIcon /></span></>
              :
              <> <span className={`${cardStyles.btnText}`}> - </span>
              </>}

          </button>
          <input
            type="text"
            disabled
            value={props.orderQuantity}
            className={cardStyles.qtyDisplay}
          ></input>
          <button
            // onClick={}
            // disabled={}
            className={cardStyles.btnInc}
          >
            <span className={`${cardStyles.btnText}`}> + </span>
          </button>
        </div>
        <div className={`${cardStyles.priceDiv}`}>
          <h5>Rs {`${props.price}`}/-</h5>
        </div>
      </div>
      <hr className={`${cardStyles.horizontalRule}`} />
    </>
  )
}

export default CartCard
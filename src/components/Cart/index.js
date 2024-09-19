import {useContext} from 'react'

import Header from '../Header'
import CartItem from '../CartItem'

import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const renderEmptyCart = () => (
    <div className="empty-cart-container">
      <img
        className="empty-cart-image"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
      />
      <p className="empty-cart-content">Your cart is empty.</p>
    </div>
  )

  const renderCart = () => (
    <>
      <div className="cart-items-container">
        <h1 className="cart-items-content">Cart Items</h1>
        <button
          className="remove-all-button"
          type="button"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-list-container">
        {cartList.map(dish => (
          <CartItem key={dish.dishId} cartItemDetails={dish} />
        ))}
      </ul>
    </>
  )

  return (
    <div className="cart-container">
      <Header />
      <div className="container">
        {cartList.length === 0 ? renderEmptyCart() : renderCart()}
      </div>
    </div>
  )
}

export default Cart

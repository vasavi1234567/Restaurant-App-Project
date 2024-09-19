import {useContext} from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = ({cartItemDetails}) => {
  const {
    dishId,
    dishName,
    dishImage,
    dishPrice,
    dishCurrency,
    quantity,
  } = cartItemDetails
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  const onIncreseQuantity = () => incrementCartItemQuantity(dishId)

  const onDecreaseQuantity = () => decrementCartItemQuantity(dishId)

  const onRemoveCartItem = () => removeCartItem(dishId)

  return (
    <li className="cart-item">
      <img className="cart-item-image" src={dishImage} alt={dishName} />
      <div className="cart-item-details">
        <p className="item-name">{dishName}</p>
        <p className="item-currency">
          {dishCurrency} {(quantity * dishPrice).toFixed(2)}
        </p>
        <div className="control-button-container">
          <button
            className="control-button"
            type="button"
            onClick={onDecreaseQuantity}
          >
            -
          </button>
          <p className="item-quantity">{quantity}</p>
          <button
            className="control-button"
            type="button"
            onClick={onIncreseQuantity}
          >
            +
          </button>
        </div>
      </div>
      <button className="button" type="button" onClick={onRemoveCartItem}>
        <FaRegTrashAlt />
      </button>
    </li>
  )
}

export default CartItem

import {useState, useContext} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const FoodItem = ({dishDetails}) => {
  const {
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishCalories,
    dishImage,
    addonCat,
    dishAvailability,
  } = dishDetails

  const [quantity, setQuantity] = useState(0)
  const {addCartItem} = useContext(CartContext)

  const onIncrement = () => setQuantity(prevState => prevState + 1)

  const onDecrement = () =>
    setQuantity(prevState => (prevState > 0 ? prevState - 1 : 0))

  const onAddItemToCart = () => addCartItem({...dishDetails, quantity})
  const renderControl = () => (
    <div className="controller">
      <button className="button" type="button" onClick={onDecrement}>
        -
      </button>
      <p className="quantity">{quantity}</p>
      <button className="button" type="button" onClick={onIncrement}>
        +
      </button>
    </div>
  )

  return (
    <li className="item-container">
      <div className={`green-border ${dishType === 1 ? 'red-border' : ''}`}>
        <div className={`green-round ${dishType === 1 ? 'red-round' : ''}`} />
      </div>
      <div className="item-details-container">
        <h1 className="item-name">{dishName}</h1>
        <p className="item-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="item-description">{dishDescription}</p>
        {dishAvailability && renderControl()}
        {!dishAvailability && <p className="not-available">Not available</p>}
        {addonCat.length !== 0 && (
          <p className="available">Customizations available</p>
        )}
        {quantity > 0 && (
          <button
            className="add-to-cart-button"
            type="button"
            onClick={onAddItemToCart}
          >
            ADD TO CART
          </button>
        )}
      </div>
      <p className="item-calories">{dishCalories} calories</p>
      <img className="item-image" alt={dishName} src={dishImage} />
    </li>
  )
}

export default FoodItem

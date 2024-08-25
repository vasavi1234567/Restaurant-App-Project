import './index.css'

const FoodItem = ({dishDetails, cartItems, addItem, removeItem}) => {
  const {
    dishId,
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

  const onIncrement = () => addItem(dishDetails)
  const onDecrement = () => removeItem(dishDetails)

  const getQuantity = () => {
    const cartItem = cartItems.find(eachItem => eachItem.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const renderControl = () => (
    <div className="controller">
      <button className="button" type="button" onClick={onDecrement}>
        -
      </button>
      <p className="quantity">{getQuantity()}</p>
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
        {dishAvailability ? (
          renderControl()
        ) : (
          <p className="not-available">Not available</p>
        )}
        {addonCat.length > 0 && (
          <p className="available">Customizations available</p>
        )}
      </div>
      <p className="item-calories">{dishCalories} calories</p>
      <img className="item-image" alt={dishName} src={dishImage} />
    </li>
  )
}

export default FoodItem

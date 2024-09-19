import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {cartList, restaurantName} = useContext(CartContext)

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartIcon = () => (
    <div className="cart-icon-container">
      <Link to="/cart">
        <button className="icon-button" type="button" data-testid="cart">
          <AiOutlineShoppingCart className="cart-icon" />
        </button>
      </Link>
      <div className="cart-length-container">
        <p className="cart-length">{cartList.length}</p>
      </div>
    </div>
  )

  return (
    <header className="header-container">
      <Link className="link" to="/">
        <h1 className="restaurant-name">{restaurantName}</h1>
      </Link>
      <div className="orders-container">
        <p className="my-orders d-none d-sm-block">My Orders</p>
        <button className="logout-button" type="button" onClick={onLogout}>
          Logout
        </button>
        {renderCartIcon()}
      </div>
    </header>
  )
}

export default withRouter(Header)

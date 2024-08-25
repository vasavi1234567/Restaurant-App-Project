import './index.css'

const Header = ({cartItems}) => {
  const itemsCount = () =>
    cartItems.reduce((acc, eachItem) => acc + eachItem.quantity, 0)

  return (
    <header className="nav-header">
      <h1 className="header-heading">UNI Resto Cafe</h1>
      <div className="heading-cart-container">
        <p className="my-orders">My Orders</p>
        <div className="cart-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-cart"
            viewBox="0 0 16 16"
            aria-label="Cart"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          <div className="cart-count-container">
            <p className="cart-count">{itemsCount()}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

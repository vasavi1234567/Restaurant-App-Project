import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not found"
    />
    <h1 className="not-found">Page Not Found</h1>
    <Link to="/">
      <button className="not-found-button" type="button">
        Go Home
      </button>
    </Link>
  </div>
)

export default NotFound

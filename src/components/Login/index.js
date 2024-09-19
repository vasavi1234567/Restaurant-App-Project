import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeHandler = event => {
    const {id, value} = event.target
    if (id === 'username') {
      setUsername(value)
    } else {
      setPassword(value)
    }
  }

  const onSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  const onFail = errorMessage => {
    setErrorMsg(errorMessage)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok) {
      onSuccess(data.jwt_token)
    } else {
      onFail(data.error_msg)
    }
  }

  if (Cookies.get('jwt_token')) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={onSubmitForm}>
        <h1 className="login">Login</h1>
        <label className="label" htmlFor="username">
          USERNAME
        </label>
        <input
          className="input"
          type="text"
          id="username"
          value={username}
          onChange={onChangeHandler}
        />
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="input"
          type="password"
          id="password"
          value={password}
          onChange={onChangeHandler}
        />
        <button className="login-button" type="submit">
          Login
        </button>
        {errorMsg !== '' && <p className="error-message">{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login

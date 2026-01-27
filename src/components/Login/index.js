import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect, useHistory} from 'react-router-dom'

import './index.css'

const Login = () => {
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isError, setIsError] = useState(false)

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onSubmitFailure = msg => {
    setErrorMsg(msg)
    setIsError(true)
  }

  const onSubmitForm = async event => {
    event.preventDefault()

    const userDetails = {username, password}

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })

    const data = await response.json()

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div data-testid="bgLoginContainer" className="bg-login-container">
      <div data-testid="loginContainer" className="login-container">
        <h1 data-testid="loginHeading" className="login-heading">
          Daily Mood Tracker
        </h1>

        <form data-testid="form" className="form" onSubmit={onSubmitForm}>
          <div data-testid="inputContainer1" className="input-container">
            <label
              data-testid="label1"
              className="label"
              htmlFor="username-input"
            >
              USERNAME
            </label>
            <input
              data-testid="input1"
              id="username-input"
              className="input"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div data-testid="inputContainer2" className="input-container">
            <label
              data-testid="label2"
              className="label"
              htmlFor="password-input"
            >
              PASSWORD
            </label>
            <input
              data-testid="input2"
              id="password-input"
              className="input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div data-testid="checkboxContainer" className="checkbox-container">
            <input
              data-testid="checkboxInputs"
              id="checkbox-input"
              type="checkbox"
              onChange={e => setShowPassword(e.target.checked)}
            />
            <label
              data-testid="checkboxLabel"
              htmlFor="checkbox-input"
              className="checkbox-label"
            >
              Show Password
            </label>
          </div>

          <button
            data-testid="loginButton"
            type="submit"
            className="login-button"
          >
            Login
          </button>

          {isError && (
            <p data-testid="errorMsg" className="error-msg">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login

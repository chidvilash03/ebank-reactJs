import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    showError: false,
    errorMsg: '',
  }

  changePin = event => {
    // console.log(event.target.value)
    this.setState({pin: event.target.value})
  }

  changeUserID = event => {
    // console.log(event.target.value)
    this.setState({userId: event.target.value})
  }

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  failureLogin = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  login = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const details = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.successLogin(data.jwt_token)
    } else {
      this.failureLogin(data.error_msg)
    }
  }

  render() {
    const {showError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-img">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-img"
            />
          </div>
          <form className="form-container" onSubmit={this.login}>
            <h1>Welcome Back!</h1>
            <div className="form-con">
              <label htmlFor="username">User ID</label>
              <br />
              <input
                type="text"
                placeholder="Enter User ID"
                className="text-bar"
                onChange={this.changeUserID}
                id="username"
              />
            </div>
            <div className="form-con">
              <label htmlFor="pin">PIN</label>
              <br />
              <input
                type="password"
                placeholder="Enter PIN"
                className="text-bar"
                onChange={this.changePin}
                id="pin"
              />
            </div>
            <button type="submit" className="form-btn">
              Login
            </button>
            {showError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login

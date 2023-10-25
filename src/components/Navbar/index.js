import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Navbar = props => {
  const logout = () => {
    const {history} = props
    console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <nav className="nav-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="nav-logo"
      />
      <button className="nav-btn" type="button" onClick={logout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Navbar)

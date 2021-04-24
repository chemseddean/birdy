// import basics libraries
import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// pour l'authentification
import {logout} from '../../actions/auth'

const Navbar = ( {auth: { isAuthenticated, loading}, logout} ) => {
  // si je suis authentified
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard" >
          <i className= "fas fa-user"/>{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">Profiles</Link>
      </li>
      <li>
        <Link to="/posts" >Posts</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
        <i className= "fas fa-sign-out-alt" />{' '}
        <span className="hide-sm">Logout</span>
        </a>
      </li>
  </ul>
  )
  // si je ne suis pas authentified
  const guestLinks = (
    <ul>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )

  return (
    <nav className="navbar">
      <h1><Link to="/"> Birdy </Link></h1>
      {(<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
    </nav>
  )
}

Navbar.prototypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth : state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
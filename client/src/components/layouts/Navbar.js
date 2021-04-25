// import basics libraries
import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// pour l'authentification
import {logout} from '../../actions/auth'

import logo from '../../img/sky-vid.mp4' // relative path to image

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
        <a onClick={logout} href="/login">
        <i className= "fas fa-sign-out-alt" />{' '}
        <span className="hide-sm">Logout</span>
        </a>
      </li>
  </ul>
  )
  // si je ne suis pas authentified
  const guestLinks = ( <Fragment>
    <video autoPlay muted loop id="myVideo">
      <source src={logo} type="video/mp4"></source>
    </video>
    <ul>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </Fragment>)

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
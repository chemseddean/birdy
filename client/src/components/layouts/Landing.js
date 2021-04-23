import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import logo from './../../img/sky-vid.mp4' // relative path to image


const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated){
    return <Redirect to='/dashboard' />
  }
    return (
      <section className="landing">
        <video autoPlay muted loop id="myVideo">
          <source src={logo} type="video/mp4"></source>
        </video>
        <img src="./../../img/bg1.png"></img>
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Solid<span className="aide">aide</span></h1>
            <p className="lead">Luttons ensemble contre la précarité étudiante<br></br><small>sortir durablement de la crise</small></p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">Register</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div> 
          </div>
        </div>
      </section>
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
} )
export default connect(mapStateToProps)(Landing)

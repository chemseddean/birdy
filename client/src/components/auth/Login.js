import React, { Fragment, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({ 
        username: '', 
        password: '',
    })

    const { 
        username,
        password } = formData

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })
    
    const onSubmit = async e => {
        e.preventDefault() //Because its a submit
        login(username, password)
    }

    //Redirect if logged 

    if(isAuthenticated){
      return <Redirect to="/dashboard" />
    }

    return <Fragment>
        <section className="container">
      <h1 className="large text-primary">Log in</h1>
      <p className="lead"><i className="fas fa-user"></i> Log in your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="username" name="username" value= {username} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        You don't have an account? <Link to="/register">Create an account</Link>
      </p>
    </section>
    </Fragment>
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)

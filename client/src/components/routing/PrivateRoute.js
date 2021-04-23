import React from 'react'
import { Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = ({
    component: Component, 
    auth: { isAuthenticated, loading},
     ...rest
    }) => {
    document.querySelector('body').style.background = "none";
    // document.querySelector('body').style.backgroundColor = "inital";
    (
    <Route 
    {...rest} 
    render= { 
        props => !isAuthenticated && !loading ? 
        (<Redirect to='/login' />) : 
        (<Component {...props} />)
        } 
        />
    )
    }

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)

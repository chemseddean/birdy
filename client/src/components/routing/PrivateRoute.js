import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { online } from '../../actions/auth'
import React, { useEffect } from 'react'

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => {
    useEffect(() => { online() }, [])
    return (
    <Route
        {...rest}
        render={
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
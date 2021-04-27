import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { Link } from 'react-router-dom'

const Dashboard = ({ auth: { user }, profile: { profile, loading }, getCurrentProfile}) => {
    var user = JSON.parse(localStorage.getItem('user'))
    // profile initalement vide
    // on fait l'appel a l'action pour l'avoir
    useEffect(() => {getCurrentProfile()}, [getCurrentProfile])
    
    if (loading && profile !== null) 
        return <Fragment>Fail</Fragment>
    return ( 
        <section className="standard dash">
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {user.firstName}</p>
            {
                profile !== null ?
                    <div className="dash-buttons">
                        <Link to="/manageProfile" className="btn btn-light">
                            <i className="fas fa-user-circle text-primary"></i> 
                            Edit Profile
                        </Link>
                    </div>
                :
                    <Fragment>
                        <p>You have not yet set up a profile, click down below to add some info :</p>
                        <Link to="/manageProfile" className="btn btn-primary my-1">
                            Create profile
                        </Link>
                    </Fragment>
            }
        </section>)
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)

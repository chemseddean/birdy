import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {

    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])

    if (loading && profile !== null) 
        return <Fragment>Fail</Fragment>
    
    return ( 
        <section className="standard dash">
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {user && user.username}
            </p>
            {
                profile !== null ?
                    <Fragment>
                        <DashboardActions />
                    </Fragment> :
                    <Fragment>
                        <p>You have not yet set up a profile, click down below to add some info :</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">
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

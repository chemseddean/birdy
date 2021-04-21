import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'
const Profiles = ({ getProfiles, profile: { profiles, loading }  }) => {
    
    useEffect(() =>{
        getProfiles()
    }, [getProfiles] )
    
    return <Fragment>
        { !loading ? 
        <Fragment> 
            <h1 className="large text-primary">Profiles</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> All Birdy profiles
            </p>
            <div className="profiles">
                {
                profiles.length > 0 ?
                (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : 
                <h4>No profiles to show</h4> 
                }
            </div>
        </Fragment> : 
        <Fragment> 
        <h1 className="large text-primary">Profiles</h1>
    
        </Fragment>
        }
    </Fragment>
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(
    mapStateToProps, 
    { getProfiles })
    (Profiles)

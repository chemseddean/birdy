import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({ profile: {
    githubusername,
    status, 
    location, 
    intrests, 
    bio
}}) => {
    return (
        <div className="profile bg-light">
            <i class="far fa-user fa-7x"></i>
            <div>
                <h2>{githubusername}</h2>
                <p>{status}</p>
                <p className="my-1"><i class="fas fa-thumbtack"></i>{location && <span>{' '}{location}</span>}</p>
                {/* <Link to={`/profils/user/${githubusername}`} className="btn btn-primary">
                    View Profile
                </Link> */}
                <p className="bio">{bio}</p>
            </div>
            <ul>
                {intrests.slice(0, 5).map((intrest, index)=>(
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i> {intrest}
                    </li>
                ))}
            </ul>
            
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem

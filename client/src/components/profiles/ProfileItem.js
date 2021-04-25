import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

const ProfileItem = ({ profile: {
    shwonName,
    status, 
    location
}, onClick}) => {
    return (
        <div tabIndex="1" className="profile" onClick={onClick}>
            <h2>{shwonName}</h2>
            <ul>
                <li>{status}</li>
                <li><i class="fas fa-thumbtack"></i>&nbsp;&nbsp;{location}</li>
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem

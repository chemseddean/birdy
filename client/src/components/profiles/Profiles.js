import React, { Fragment, useEffect, useState  } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({ getProfiles, profile: { profiles, loading }  }) => {
	useEffect(() =>{
		getProfiles()
	}, [getProfiles] )
	const [count, setCount] = useState(0);

	if (loading) 
		return <h1 className="large text-primary">Profiles</h1>

	return (
		<section className="profils-list">
			<div className="left">
				<h1 className="large text-primary">Profiles</h1>
				{
					count == null ?
					<p className="lead"> Clicker sur un profil pour avoir plus d 	informations</p>
					:
					afficherProfil(count)
				}
			</div>
			
			<div className="profiles">
				{
					profiles.length > 0 ?
						(
							profiles.map(profile => (
								<ProfileItem key={profile._id} profile={profile} onClick={() => setCount(profile)}/>
							))
						) :
						<h4>No profiles to show</h4>
				}
			</div>
		</section>
	)
	
}



const afficherProfil = (profile) => {
	if (!profile) {
		return
	}
	// distract
	const {
		username,
		status,
		location,
		intrests,
		bio,
		createdAt
	} = profile
	return (<ul>
	        <h2>{username}</h2>
			<br></br>
	        <ul>
	            <li>Je veux devenir : {status}</li>
	            <li>Je suis basé à : <i class="fas fa-thumbtack"></i>&nbsp;&nbsp;{location}</li>
	            <li>Je m'interesse à : {intrests}</li>
				<li>Membre depuis : {createdAt}</li>
			<li><strong>Bio</strong>: <br></br>{bio}</li>
	        </ul>
	</ul>)
}



Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)

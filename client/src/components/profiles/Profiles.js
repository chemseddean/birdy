import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({ getProfiles, profile: { profiles, loading }  }) => {
	useEffect(() =>{
		getProfiles()
	}, [getProfiles] )

	if (loading) 
		return <h1 className="large text-primary">Profiles</h1>

	return (
		<section className="profils-list">
			<div className="left">
				<h1 className="large text-primary">Profiles</h1>
				<p className="lead"> Clicker sur un profil pour avoir plus d'informations
				</p>
			</div>
			
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
		</section>
	)
}

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile
})

export default connect( mapStateToProps, { getProfiles })(Profiles)

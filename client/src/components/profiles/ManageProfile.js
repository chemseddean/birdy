import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { submitProfile } from '../../actions/profile'
import { Link, withRouter } from 'react-router-dom' //to pass history argument and allow to use it from action

const ManageProfile = ({ profile: {loading}, submitProfile, history }) => {
// const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
  
  // useEffect(() => {
    //     getCurrentProfile()
    
    let profileBrute = JSON.parse(localStorage.getItem('profile'))
    let profile = { 
      location: profileBrute?.location,
      status: profileBrute?.status,
      bio: profileBrute?.bio,
      intrests: profileBrute?.intrests
    }
    // return <div>{profile}</div>
    const [formData, setFormData] = useState(profile)
    // },  [loading, getCurrentProfile])  //So it doesnt keep running, runs when loads
    // setFormData({
    //   location: loading || !profile.location ? '' : profile.location,
    //   status: loading || !profile.status ? '' : profile.status,
    //   bio: loading || !profile.bio ? '' : profile.bio,
    //   intrests: loading || !profile.intrests ? '' : profile.intrests.join(','),
    // })

    const {
      location,
      status,
      intrests,
      bio
    } = formData

    const onChange = e => setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    const onSubmit = e => {
      e.preventDefault()
      // console.log("################")
      // console.log(JSON.stringify(formData))
      submitProfile(formData, history, profile)
    }
  return (
    <section className="create-profil">
      {}
      <h1 className="large text-primary">{profile? 'Modifier': 'Créer'} votre profil</h1>
      <p className="lead">
        <i className="fas fa-user"></i>&nbsp;&nbsp; informations vous conernant</p>
      {/* <small>* = required field</small> */}
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            {/* <option value="0">Niveau d'études</option> */}
            <option value="Lycéen">Lycéen</option>
            <option value="Licence L1">Licence L1</option>
            <option value="Licence L2">Licence L2</option>
            <option value="Licence L3">Licence L3</option>
            <option value="Master 1">Master 1</option>
            <option value="Master 2">Master 2</option>
            <option value="Autre">Autre</option>
          </select>
          <small className="form-text">&nbsp;&nbsp;Quel est ton niveau d'études</small>
        </div>
        <div className="doubleColumn">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
          <input type="text" placeholder="* Intrests" name="intrests" value={intrests} onChange={e => onChange(e)} />
        </div>
        <small className="form-text">Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)</small>
        <div className="form-group">
          {/* <input type="text" placeholder="username" name="username" value={username} onChange={e => onChange(e)} /> */}
          <small className="form-text">Optional</small>
        </div>
        <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>

        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
        <input type="submit" className="btn btn-primary my-1" />
      </form>
    </section>
  )
}

ManageProfile.propTypes = {
  submitProfile: PropTypes.func.isRequired,
  // getCurrentProfile: PropTypes.func.isRequired,
  // profile: PropTypes.object.isRequired   
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { submitProfile })(withRouter(ManageProfile))

import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import { Link, withRouter } from 'react-router-dom' //to pass history argument and allow to use it from action

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
    const [formData, setFormData] = useState({
        location: '',
        status: '',
        intrests: '',
        bio: '',
        username: ''
    })

    useEffect(() => {
        getCurrentProfile()
        setFormData({
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            bio: loading || !profile.bio ? '' : profile.bio,
            username: loading || !profile.username ? '' : profile.username,
            intrests: loading || !profile.intrests ? '' : profile.intrests.join(','),
        })

    },  [loading, getCurrentProfile])  //So it doesnt keep running, runs when loads
    
    const {
      location,
      status,
      intrests,
      bio,
      username
    } = formData

    const onChange = e => setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    const onSubmit = e => {
      e.preventDefault()
      createProfile(formData, history, true)
    }
  return (
    <section className="create-profil">
      <h1 className="large text-primary">Créer votre profil</h1>
      <p className="lead">
        <i className="fas fa-user"></i>&nbsp;&nbsp; informations vous conernant</p>
      {/* <small>* = required field</small> */}
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">Give us an idea of where you are at in your career</small>
        </div>
        <div className="doubleColumn">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
          <input type="text" placeholder="* Intrests" name="intrests" value={intrests} onChange={e => onChange(e)} />
        </div>
        <small className="form-text">Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)</small>
        <div className="form-group">
          <input type="text" placeholder="Github Username" name="username" value={username} onChange={e => onChange(e)} />
          <small className="form-text">Optional</small>
        </div>
        <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>

        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
        <input type="submit" className="btn btn-primary my-1" />
      </form>
    </section>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired   
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))

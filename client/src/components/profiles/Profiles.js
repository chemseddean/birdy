import React, { Fragment, useEffect, useState  } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import { getUserById } from '../../actions/friends'
// import friends from '../../reducers/friends'
// import { getUserById } from '../../actions/friends'
// import ProfileItem from '../../nope/ProfileItem'

const Profiles = ({ getProfiles, profile: { profiles, loading }}) => {
  useEffect(() => getProfiles(), [])
  const [count, setCount] = useState(null);
  const [listing, setList] = useState(profiles)
  useEffect(() => setList(profiles), [profiles])

  if (loading) 
    return <h1 className="large text-primary">Profiles</h1>
  return (
    <section className="profils-list">
      <div className="left">
        <h1 className="large text-primary">Profiles</h1>
        {
          count == null ?
          <p className="lead"> Clicker sur un profil pour avoir plus d'informations</p>
          :
          (<ul>
              <img
                style={{ height:"8rem"}}
                className="round-img"
                src="https://arboresens.fr/assets/images/charte-SU-2.jpg"
                alt=""
              />
              <h2>{count.username}</h2>
              <button className="btn btn-primary my-1" onClick={getUserById(count.username)}  >add friend</button>
            <ul>
                {console.log()}
                {/* <li><span>Nom :</span> {}</li> */}
                <li><span>Je suis en : </span>{count.status}</li>
                <li><span>Je suis basé à : <i className="fas fa-thumbtack"></i></span> &nbsp;&nbsp;{count.location}</li>
                <li><span>Je m'interesse à :</span> {count.intrests}</li>
              {/* <li>Membre depuis : {createdAt.replace(/(.*)T.*$/,'$1')}</li> */}
                <li><span>Bio :</span><br></br>{count.bio}</li>
            </ul>
          </ul>)
        }
      </div>
      <div className="profiles">
        <input className="search" 
          onChange={(e) => {
            var value = e.target.value
            if (value == '')
              return setList(profiles)
            setList(searching(profiles,value))
          }}>
        </input>
        <div>
          {
            listing.length > 0 ?
              (
                listing.map(profile => (
                  // <ProfileItem key={profile._id} profile={profile}  />
                  <div tabIndex="1" className="profile" onClick={() => setCount(profile)}>
                    <h2>{profile.username}</h2>
                    <ul>
                      <li>{profile.status}</li>
                      <li><i className="fas fa-thumbtack"></i>&nbsp;&nbsp;{profile.location}</li>
                    </ul>
                  </div>
                ))
              )
              :
              <h4>No profiles to show</h4>
          }
        </div>
      </div>
      
    </section>
  )
}


function aFriend() {
  let t = JSON.parse(localStorage.getItem('aFriend'))
  return t.firstName+" "+t.lastName
}

function searching(profiles, substring) {
  const regex = new RegExp("^" + substring.toLowerCase() + ".*$");	
  var ret = profiles.filter(profile => regex.test(profile.username.toLowerCase()))
  // alert(ret)
  return ret
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
  // console.log(profile);
  return 
}




Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  friends: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  friends: state.friends
})

export default connect(mapStateToProps, {getUserById, getProfiles})(Profiles)
// export default connect(null, mapStateToProps)(Profiles)
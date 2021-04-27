// import basics libraries
import React, {Fragment, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux' //connect redux with react

// import all components
import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import ManageProfile from './components/profiles/ManageProfile'
import Profiles from './components/profiles/Profiles'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import About from './components/about/About'
import Alert from './components/layouts/Alert'
// link to css
import './App.css';

import store from './store'
// related with axios
import { loadUser } from './actions/auth'
// import setAuthToken from './utils/setAuthToken'

// if(localStorage.token){
//   setAuthToken(localStorage.token)
// }

const App = () => {
  // useEffect(() => store.dispatch(loadUser()), [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <section className="container">
            <Switch>
              <Route exact path="/" component= {Landing}/>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/Profiles" component={Profiles} />
              <Route exact path="/About" component={About} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/ManageProfile" component={ManageProfile} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:id" component={Post} />
            </Switch>
          </section>
      </Fragment>
        <Alert />
    </Router>
  </Provider>
  )
}
export default App;

import './App.css';
import React, {Fragment, useEffect} from 'react'
import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layouts/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile-form/CreateProfile'
import EditProfile from './components/profile-form/EditProfile'
import Profiles from './components/profiles/Profiles'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'


import { Provider } from 'react-redux' //connect redux with react
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'



if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => 
      {
        useEffect(() => {
          store.dispatch(loadUser())
        }, [])

        return (
        <Provider store={store}>
        <Router>
        <Fragment>
        <Navbar />
        <Route exact path="/" component= {Landing}/>
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/Profiles" component={Profiles} />


            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/posts/:id" component={Post} />



          </Switch>
        </section>
      </Fragment>
      </Router> 

      </Provider>)}
export default App;

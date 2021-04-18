import './App.css';
import React, {Fragment} from 'react'
import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = () => 
      <Router>
        <Fragment>
        <Navbar />
        <Route exact path="/" component= {Landing}/>
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

          </Switch>
        </section>
      </Fragment>
      </Router> 

export default App;

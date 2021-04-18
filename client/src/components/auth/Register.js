import React, { Fragment, useState} from 'react'
import axios from 'axios'

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '', 
        username: '', 
        password: '',
        password2: ''
    })

    const { 
        firstName,
        lastName,
        username,
        email,
        password,
        password2 } = formData

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })
    
    const onSubmit = async e => {
        e.preventDefault() //Because its a submit
        if(password !== password2){
            console.log("Password do not match")
        } else {
            const newUser = {
                firstName,
                lastName,
                username,
                email,
                password,
            }

            try {
                const config = {
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                }

                const body = JSON.stringify(newUser)

                const res = await axios.post('/api/users/register', body, config)

                console.log(res)
            } catch (error) {
                console.error(error.response.data)
            }
        }
    }

    return <Fragment>
        <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="First name" name="firstName" value= {firstName} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Last Name" name="lastName" value= {lastName} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="username" name="username" value= {username} onChange={e => onChange(e)} required />
        </div>

        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value= {email} onChange={e => onChange(e)} required />
          <small className="form-text">
            Please insert your main email, we won't spam you with promotion emails, we promise ;)
        </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </section>
    </Fragment>
}

export default Register

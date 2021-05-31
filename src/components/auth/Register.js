import React from 'react'
import useForm from '../../hooks/useForm'
import { registerUser } from '../../lib/api'
import { useHistory, Link } from 'react-router-dom'


function Register() {
  const history = useHistory()
  const [error, setError] = React.useState('')
  const { formData, formErrors, handleChange } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await registerUser(formData)
      history.push('/login')
    } catch (e) {
      setError(e.response.data.message)
      
    }
  }

  return (
    <section className="user-forms">
      <section className="form-container">
        <h1 className="user-form">Create a new account</h1>
        <form className="user-form" onSubmit={handleSubmit} setError={setError}>
          <div>
            {/* <label>Username</label> */}
            <input
              className="user-form user-info"
              placeholder="Username"
              onChange={handleChange}
              name="username"
              value={formData.username}
            />
            {formErrors.username && (
              <p>{formErrors.username}</p>
            )}
          </div>
          <div>
            {/* <label>Email</label> */}
            <input
              className="user-form user-info"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
            {formErrors.email && (
              <p>{formErrors.email}</p>
            )}
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              className="user-form user-info"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={formData.password}
            />
            {formErrors.password && (
              <p>{formErrors.password}</p>
            )}
          </div>
          <div>
            {/* <label>Password Confirmation</label> */}
            <input
              className="user-form user-info"
              type="password"
              placeholder="Password Confirmation"
              onChange={handleChange}
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
            />
            {formErrors.passwordConfirmation && (
              <p className="user-form">{formErrors.passwordConfirmation}</p>
            )}
          </div>
          {error && <p>{error}</p>}
          <div>
            <button type="submit" className="user-form submit-button">
            Register
            </button>
            
          </div>
        </form>
        <footer>
          <h5>Already a member? <span><Link to="/login">Login instead.</Link></span> </h5>
        </footer>
      </section>
    </section>
  )
}

export default Register
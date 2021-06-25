import React from 'react'
import useForm from '../../hooks/useForm'
import { loginUser, registerUser } from '../../lib/api'
import { useHistory, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { setIsAdmin, setToken } from '../../lib/auth'

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
      const loginForm = {
        email: formData.email,
        password: formData.password,
      }
      const res = await loginUser(loginForm)
      setToken(res.data.token)
      setIsAdmin(res.data.isAdmin)
      toast.error('Successfully registered! Welcome to Moodflix.')
      history.push('/movies')
    } catch (e) {
      setError(e.response.data.message)
    }
  }

  return (
    <section className="user-forms">
      <section className="form-container">
        <h1 className="user-form">Create a new account</h1>
        <form className="user-form" onSubmit={handleSubmit}>
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
      <ToastContainer />
    </section>
  )
}

export default Register
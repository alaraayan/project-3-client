import React from 'react'
import useForm from '../../hooks/useForm'
import { registerUser } from '../../lib/api'
import { useHistory } from 'react-router-dom'


function Register() {
  const history = useHistory()
  const { formData, formErrors, handleChange, setFormErrors } = useForm({
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
      setFormErrors(e.response.data.formErrors)
    }
  }

  return (
    <>
      <h2>Create a new account:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
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
          <label>Email</label>
          <input
            placeholder="email@email.com"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
          {formErrors.email && (
            <p>{formErrors.email}</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
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
          <label>Password Confirmation</label>
          <input
            type="password"
            placeholder="Password Confirmation"
            onChange={handleChange}
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
          />
          {formErrors.passwordConfirmation && (
            <p>{formErrors.passwordConfirmation}</p>
          )}
        </div>
        <div>
          <button type="submit">
            Register
          </button>
        </div>
      </form>
    </>
  )
}

export default Register
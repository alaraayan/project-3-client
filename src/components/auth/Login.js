import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { loginUser } from '../../lib/api'
import { setIsAdmin, setToken } from '../../lib/auth'
import useForm  from '../../hooks/useForm'

function Login() {
  const history = useHistory()
  const [isError, setIsError] = React.useState(false)
  const { formData, handleChange } = useForm({
    email: '',
    passwords: '',
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await loginUser(formData)
      console.log('made it to res', res)
      setToken(res.data.token)

      setIsAdmin(res.data.isAdmin)
      history.push('/movies')
    } catch (e) {
      setIsError(true)
    }
  }

  return (
    <section className="user-forms">
      <section className="form-container">
        <h1 className="user-form">Log In</h1>
        <form className="user-form" onSubmit={handleSubmit} >
          
          <div>
            {/* <label>Email</label> */}
            <input
              className="user-form user-info"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              className="user-form user-info"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          {isError && (
            <p>
            Either email or password were incorrect
            </p>
          )}
        
          <div>
            <button type="submit" className="user-form submit-button">
            Log In
            </button>
          </div>
            
        </form>
        <footer>
          <h5 className="user-form">New to Moodflix? <span><Link to="/register">Register now</Link></span></h5>
        </footer>
        
      </section>
    </section>
            
  )
} 

export default Login
import React from 'react'
import { useHistory } from 'react-router-dom'
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
      setToken(res.data.token)
      setIsAdmin(res.data.isAdmin)
      history.push('/movies')
    } catch (e) {
      setIsError(true)
    }
  }

  return (
    <>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            placeholder="email@email.com"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
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
          <button type="submit">
            Log In
          </button>
        </div>
      </form>

    </>
  )
}

export default Login
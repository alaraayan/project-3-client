import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { addNewComment } from '../../../lib/api'
import { isAuthenticated } from '../../../lib/auth'
import useForm from '../../../hooks/useForm'

function NewComment({ setMovie }) {
  const isLoggedIn = isAuthenticated()
  const { movieId } = useParams()
  const { formData, formErrors, handleChange, setFormErrors, setFormData } = useForm({
    text: '',
  })
  const handleAddComment = async event  => {
    event.preventDefault()
    try {
      const res = await addNewComment(movieId, formData)
      //history.push(`/movies/${movieId}`)
      setMovie(res.data)
      setFormData({ text: '' })

    } catch (e) {
      setFormErrors(e.response.data.formErrors)
      console.log('errors', e.response.data.formErrors)
    }
  }
  return (
    <>
      {isLoggedIn ? (
        <div>
          <p>Have you seen this movie? Share what you felt about it here. </p>
          <form onSubmit={handleAddComment}>
            <div>
              <textarea
                placeholder="Tell us what you felt..."
                name="text"
                className="comment-textarea"
                value={formData?.text}
                onChange={handleChange}
              />
              {formErrors.text && (
                <p>{formErrors.text}</p>
              )}
            </div>
            <button>Send</button>
          </form>
        </div>
      )
        :
        (
          <div>
            <div>
              <textarea
                readOnly
                placeholder="Tell us what you felt, but first, you must login..."
                name="text"
                className="comment-textarea"
              />
              <Link to="/login"><button>Login</button></Link>
              <h5>Not a member? <Link to="/register">Register</Link> instead</h5>
              {formErrors.text && (
                <p>{formErrors.text}</p>
              )}
            </div>
            
          </div>
        ) }
      
    </>
  )
}
export default NewComment
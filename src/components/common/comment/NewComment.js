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
  const handleAddComment = async event => {
    event.preventDefault()
    try {
      const res = await addNewComment(movieId, formData)
      //history.push(`/movies/${movieId}`)
      setMovie(res.data)
      setFormData({ text: '' })

    } catch (e) {
      setFormErrors(e.response.data.message)
      console.log('errors', e.response.data.message)
    }
  }
  return (
    <>
      {isLoggedIn ? (
        <div className="add-comment-container">
          <p>Have you seen this movie? Share what you felt about it here. </p>
          <form onSubmit={handleAddComment}>
            <div>
              <textarea
                placeholder="Tell us what you thought..."
                name="text"
                className="comment-textarea"
                value={formData?.text}
                onChange={handleChange}
              />
              {formErrors.text && (
                <p>{formErrors.text}</p>
              )}
            </div>
            <button className="button small">Send</button>
          </form>
        </div>
      )
        :
        (
          <div className="add-comment-container">
            <div>
              <textarea
                readOnly
                placeholder="Tell us what you thought, but first, you must login..."
                name="text"
                className="comment-textarea"
              />
              <div 
                className="button">
                <Link to="/login">
                  <button className="button small">
                    Login
                  </button></Link>
              </div>
              
              <h5>Not on Moodflix? <Link to="/register">Register</Link> instead</h5>
            </div>
            {formErrors.text && (
              <p>{formErrors.text}</p>
            )}
            

          </div>
        )}

    </>
  )
}
export default NewComment
import React from 'react'
import { useParams } from 'react-router-dom'
import { addNewComment } from '../../../lib/api'
import { isAuthenticated } from '../../../lib/auth'
import useForm from '../../../hooks/useForm'

function NewComment({ setMovie }) {
  // const history = useHistory()
  const isLoggedIn = isAuthenticated()
  const { movieId } = useParams()
  const { formData, formErrors, handleChange, setFormErrors, setFormData } = useForm({
    text: '',
  })
  const handleAddComment = async event  => {
    event.preventDefault()
    try {
      const res = await addNewComment(movieId, formData)
      // history.push(`/movies/${movieId}`)
      setMovie(res.data)
      setFormData({ text: '' })
    } catch (e) {
      setFormErrors(e.response.data.formErrors)
      console.log('errors', e.response.data.formErrors)
    }
  }
  return (
    <>
      {isLoggedIn && (
        <div>
          <form onSubmit={handleAddComment}>
            <div>
              <textarea
                placeholder="Add a comment..."
                name="text"
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
      )}
    </>
  )
}
export default NewComment
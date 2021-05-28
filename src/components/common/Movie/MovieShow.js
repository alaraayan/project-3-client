import React from 'react'

import { useParams, Link, useHistory } from 'react-router-dom'
import { getSingleMovie, deleteMovie } from '../../../lib/api'
import { isAdmin, isAuthenticated } from '../../../lib/auth'
import Error from '../Error'
import RatingDisplay from './RatingDisplay'


function MovieShow() {
  const history = useHistory()
  const { movieId } = useParams()
  const [movie, setMovie] = React.useState(null)
  const [isError, setIsError] = React.useState(null)
  const isLoading = !movie && !isError
  const adminStatus = isAdmin()
  const isLoggedIn = isAuthenticated()
  console.log(adminStatus)

  React.useEffect(() => {
    const getSingleMovieData = async () => {
      try {
        const res = await getSingleMovie(movieId)
        setMovie(res.data)
        
      } catch (e) {
        setIsError(true)
        console.log(e)
      }
    }
    getSingleMovieData()
    
  }, [movieId])

  const handleDelete = async () => {
    await deleteMovie(movie._id)
    history.push('/movies')
  }
  
  // const handleComment = async () => {

  // }

  return (
    <>
      {isError && <Error />}
      {isLoading && <p>...loading</p>}
      {movie && (
        <article style={{ display: 'flex' }}>
          <div>
            <img src={movie.poster} />
          </div>
          <div>
            {isAdmin() && (
              <>
                <div>
                  <button><Link
                    to={`/movies/${movie._id}/edit`} className="button"
                  >
                  Edit this Movie
                  </Link></button>
                  <button onClick={handleDelete}>
                      Delete this Movie
                  </button>
                </div>
              </>
            )}
            <div> 
              <h2>{movie.title}</h2>
              <h6>{movie.year}</h6>
            </div>
            <div>
              <h3>director</h3>
              <p>{movie.director}</p>
            </div>
            <div>
              <h3>cast</h3>
              <p>{movie.actors}</p>
            </div>
            <div>
              <h3>plot</h3>
              <p>{movie.plot}</p>
            </div>
            <div>
              <h4>released</h4>
              <p>{movie.released}</p>
            </div>
            <div>
              <h4>runtime</h4>
              <p>{movie.runtime}</p>
            </div>
            <div>
              <h4>genres</h4>
              <p>{movie.genres}</p>
            </div>
            <div>
              <h4>rated</h4>
              <p>{movie.rated}</p>
            </div>
            <div>
              <h4>languages</h4>
              <p>{movie.language}</p>
            </div>
            <div>
              <h3>ratings</h3>
              {movie.ratings.map((rating) => {
                return <RatingDisplay key={rating._id} rating={rating} />
              }
              )}
            </div>
            <div>
              {movie.moods.map(({ mood }) => (
                <button 
                  key={mood._id} 
                  value={mood}
                  className="mood-button" 
                >
                  {mood.mood}
                </button>
              ))}
            </div>
            <div>
              <div>
                <h3>Comments</h3>
                {movie.comments.map((comment) => {
                  return <div key={comment._id} >
                    <h6>{comment.user.username}</h6>
                    <p>{comment.text}</p>
                  </div> 
                })}
              </div>
              
            </div>
          </div>
        </article>
      )}
      {isLoggedIn && (
        <div>
          <form>
            <div>
              <label>Add a comment:</label>
              <textarea
                placeholder="Add a comment..."
                name="comment"
              />
            </div>
            <button>Send</button>
          </form>
        </div>
      )}
              
    </>
  )

}

export default MovieShow
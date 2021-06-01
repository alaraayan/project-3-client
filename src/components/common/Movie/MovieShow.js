import React from 'react'

import { useParams, useHistory, Link } from 'react-router-dom'
import { getSingleMovie, deleteMovie, deleteComment } from '../../../lib/api'
import { isAdmin, isOwner } from '../../../lib/auth'
import NewComment from '../comment/NewComment'
import { isAuthenticated } from '../../../lib/auth'
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

  const handleDeleteMovie = async () => {
    await deleteMovie(movie._id)
    history.push('/movies')
  }

  const handleDeleteComment = async (commentId) => {
    await deleteComment(movie._id, commentId)
    setMovie({
      ...movie, comments: movie.comments.filter((comment) => {
        return comment._id !== commentId
      }),
    })
  }



  movie && console.log(movie.moods)

  return (
    <section id="new-movie">
      {isError && <Error />}
      {isLoading && <div className="error-message-container"><p className="error-message">...loading movie - grab the popcorn! 🍿 </p></div>}
      {movie && (
        <>
          <div className="show-movie-container">
            <article style={{ display: 'flex' }}>
              <div>
                <img className="poster" src={movie.poster} />
              </div>
              <div>
                <div>
                  <h1>{movie.title} <span>({movie.year})</span></h1>

                  {movie.moods.map(({ mood }) => (
                    <button
                      key={mood._id}
                      value={mood}
                      className="mood-button inactive"
                    >
                      {mood.mood}
                    </button>
                  ))}
                  <div>
                    {isLoggedIn && <Link to={`/movies/${movie._id}/mood`} className="button"
                    ><button>Add Moods</button></Link>}
                  </div>
                </div>
                <div>
                  <h2>Director</h2>
                  <p>{movie.director}</p>
                </div>
                <div>
                  <h2>Actors</h2>
                  <p>{movie.actors}</p>
                </div>
                <div>
                  <h2>Plot</h2>
                  <p className="plot">{movie.plot}</p>
                </div>
                <div>
                  <h2>Release Date</h2>
                  <p>{movie.released}</p>
                </div>
                <div>
                  <h2>Runtime</h2>
                  <p>{movie.runtime}</p>
                </div>
                <div>
                  <h2>Genres</h2>
                  <p>{movie.genres}</p>
                </div>
                <div>
                  <h2>Rated</h2>
                  <p>{movie.rated}</p>
                </div>
                <div>
                  <h2>Languages</h2>
                  <p>{movie.language}</p>
                </div>
                <div>
                  {movie.ratings.map((rating) => {
                    return <RatingDisplay key={rating._id} rating={rating} />
                  }
                  )}
                </div>
              </div>
            </article>
            {isAdmin() && (
              <>
                <div>
                  <div className="buttons-container">
                    <button><Link
                      to={`/movies/${movie._id}/edit`} className="button"
                    >
                        Edit this Movie
                    </Link></button>
                    <button onClick={handleDeleteMovie}>
                      <span className="material-icons orange600">
                          delete
                      </span>Delete Movie
                    </button>
                  </div>
                </div>
              </>
            )}
          
        
            <section id="comments">
              <div>
                <h2>Comments</h2>
                <NewComment movie={movie} setMovie={setMovie}/>
                {movie.comments.map((comment) => {
                  return <div key={comment._id} >
                    <h4>By {comment.user.username}</h4>
                    <p>{comment.text}</p>
                    {(isAdmin() || isOwner(comment.user._id)) &&
                      <button onClick={() => handleDeleteComment(comment._id)}><span className="material-icons orange600">
                        delete
                      </span></button>
                    }
                  </div>
                })}
              </div>
          
          
              {/* {
            isLoggedIn && (
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
            )} */}
            </section >
          </div>
        </>
      )
      }
    </section >   
    
      
  )
}






export default MovieShow
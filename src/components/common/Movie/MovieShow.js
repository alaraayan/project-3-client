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
  // const isLoggedIn = isAuthenticated()
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
    setMovie({ ...movie, comments: movie.comments.filter((comment) => {
      return comment._id !== commentId
    }) })
  }

  

  movie && console.log(movie.moods)

  return (
    <section className="home-test" id="new-movie">
      {isError && <Error />}
      {isLoading && <p>...loading movie - grab the popcorn! 🍿 </p>}
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
                  <h3>Director</h3>
                  <p>{movie.director}</p>
                </div>
                <div>
                  <h3>Actors</h3>
                  <p>{movie.actors}</p>
                </div>
                <div>
                  <h3>Plot</h3>
                  <p>{movie.plot}</p>
                </div>
                <div>
                  <h3>Release Date</h3>
                  <p>{movie.released}</p>
                </div>
                <div>
                  <h3>Runtime</h3>
                  <p>{movie.runtime}</p>
                </div>
                <div>
                  <h3>Genres</h3>
                  <p>{movie.genres}</p>
                </div>
                <div>
                  <h3>Rated</h3>
                  <p>{movie.rated}</p>
                </div>
                <div>
                  <h3>Languages</h3>
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
          </div>
          <div>
            {isAdmin() && (
              <>
                <div>
                  <button onClick={handleDeleteMovie}>
                    <span className="material-icons orange600">
                      delete
                    </span>Delete Movie
                  </button>
                </div>
              </>
            )}
          </div>
          <div>
            <div>
              <h3>Comments</h3>
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
        </>
      )}

    </section >   
    
      
  )
}
    
    
  



export default MovieShow
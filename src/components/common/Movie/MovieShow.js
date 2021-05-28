import React from 'react'

import { useParams } from 'react-router-dom'
import { getSingleMovie } from '../../../lib/api'
// import { isOwner } from '../../../lib/auth'
import Error from '../Error'
import RatingDisplay from './RatingDisplay'


function MovieShow() {
  const { movieId } = useParams()
  const [movie, setMovie] = React.useState(null)
  const [isError, setIsError] = React.useState(null)
  const isLoading = !movie && !isError

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

  movie && console.log(movie)

  return (
    <section id="new-movie">
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
                  <h1>{movie.title}</h1>
                  {movie.moods.map(({ mood }) => (
                    <button 
                      key={mood._id} 
                      value={mood}
                      className="mood-button inactive" 
                    >
                      {mood.mood}
                    </button>
                  ))}
                  <h2>{movie.year}</h2>
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
        </>
      )}
    </section>
  )

}

export default MovieShow
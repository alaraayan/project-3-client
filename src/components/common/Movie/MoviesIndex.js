import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function MoviesIndex() {
  const [movies, setMovies] = React.useState([])

  React.useEffect(() => {
    const getMovieData = async () => {
      try {
        const res = await axios.get('/api/movies')
        setMovies(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMovieData()
  }, [])

  console.log(setMovies)
  console.log(movies.data)

  return (
    <>
      <div className="movies_container">
        {movies.map(movie => (
          <Link to={`/movies/${movie._id}`} key={movie._id}>
            <div className="individual_movies_container" >
              {/* display each movie */}

              <figure >
                <img src={movie.poster} alt={movie.name} width="240" height="125" />
              </figure>
              
              <h2>{movie.title}, {movie.year}</h2>
              <div className="overflow-text">
                {movie.plot}
              </div>
            </div>
          </Link>
        ))}
      </div>

    </>
  )
}

export default MoviesIndex

import React from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'


function MovieSearch() {
  const [movies, setMovies] = React.useState([])
  const [error, setError] = React.useState(null)

  const handleChange = async (e) => {
    setError(null)
    try {
      const { data } = await axios.get(`/api/movies/search?title=${e.target.value}`)
      setMovies(data)
    } catch (error) {
      setError('Could not load movies. Getting the popcorn ready..  🍿')
    }
  }

  return (
    <>
      <div className="show-movie-container">
        <h1>Search for a movie</h1>
        <label>Title:</label><input className="search" type="search" onChange={handleChange} />
        {error && <p>{error}</p>}
        <div className="movies-container">
          {movies.map(movie => <MovieCard key={movie._id} {...movie} />)}
        </div>
      </div>
    </>
  )
}

export default MovieSearch


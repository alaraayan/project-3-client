import React from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import searchIcon from '../../../assets/images/search-icon.png'
import { baseUrl } from '../../../config'


function MovieSearch() {
  const [movies, setMovies] = React.useState([])
  const [error, setError] = React.useState(null)

  const handleChange = async (e) => {
    setError(null)
    try {
      const { data } = await axios.get(`${baseUrl}/movies/search?title=${e.target.value}`)
      setMovies(data)
    } catch (error) {
      setError('Could not load movies. Get the popcorn ready..  🍿')
    }
  }

  return (
    
    <div className="movie-container">
      <div className="header">
        <div className="landing-image-container">

        </div>
      </div>
      <section id="new-movie">
        <h1>Search for a movie</h1>
        <p>Got a particular movie that you are looking for?</p>
        
        
        <div className="search-wrapper">
          <img className="search-icon" src={searchIcon} />
          <input className="search" type="search" onChange={handleChange} placeholder="Search..."/>
          {/* <img className="clear-icon" src="/" /> */}
          {error && <p>{error}</p>}
        </div>
        <div className="movies-container">
          {movies.map(movie => <MovieCard key={movie._id} {...movie} />)}
        </div>
      </section>
    </div>
  )
}

export default MovieSearch


import React from 'react'
import MovieCard from './MovieCard'
import Spinner from '../Spinner'
import Error from '../Error'
import MoodButtons from '../lib/MoodButtons'
import { getAllMovies } from '../../../lib/api'

const sortingFunctions = {
  alphabetical: (a, b) => a.title < b.title ? -1 : 1,
  byImdbRating: (a, b) => (a.imdb).slice(2) - (b.imdb).slice(2),
}

function MoviesIndex() {
  const [movies, setMovies] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [selectedMoods, setSelectedMoods] = React.useState([])
  const isLoading = !movies && !isError

  const filteredMovies = movies?.filter(movie => {
    if (!selectedMoods.length) {
      return true
    } 
    return selectedMoods.every(selectedMood => movie.moods.map(m => m.mood.mood).includes(selectedMood))
  }).sort(sortingFunctions.alphabetical)

  React.useEffect(() => {
    const getMovieData = async () => {
      try {
        const { data } = await getAllMovies()
        setMovies(data)
      } catch (err) {
        setIsError(true)
      }
    }
    setTimeout(getMovieData, 1000)
  }, [])

  const handleClick = (e) => {
    if (selectedMoods.includes(e.target.value)) {
      return setSelectedMoods(selectedMoods.filter(mood => mood !== e.target.value))
    }
    setSelectedMoods([...selectedMoods, e.target.value]) 
  }

  return (
    <div className= "movie-container">
      {isError && <Error />}
      {isLoading && <Spinner />}
      {movies && (
        <>
          <div className="header">
            <div className="landing-image-container">
              
            </div>
          </div>
          <h1>Movie by Mood</h1>
          <p>
              Are you in the mood for a movie? Select how you&apos;re feeling and check out your movie-mood suggestions.
          </p>
          <div className="moods-select-container">
            <MoodButtons onClick={handleClick} selectedMoods={selectedMoods} />
          </div>
          <div className="movies-container">
            {filteredMovies.map(movie => <MovieCard key={movie._id} {...movie} /> )}
          </div>
        </>
      )}
    </div>
  )
}

export default MoviesIndex

import React from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import Spinner from '../Spinner'
import Error from '../Error'

function MoviesIndex() {
  const [movies, setMovies] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [moods, setMoods] = React.useState([])
  const [selectedMoods, setSelectedMoods] = React.useState([])
  console.log('selectedMoods', selectedMoods)
  const filteredMovies = movies?.filter(movie => {
    if (!selectedMoods.length) return true 

    return selectedMoods.every(selectedMood => movie.moods.map(m => m.mood.mood).includes(selectedMood))
  })

  const handleClick = (e) => {
    if (selectedMoods.includes(e.target.value)) {
      const newMoods = selectedMoods.filter(eachMood => eachMood !== e.target.value)
      setSelectedMoods(newMoods)
      return 
    }
    setSelectedMoods([...selectedMoods, e.target.value])
    
  }

  const isLoading = !movies && !isError

  React.useEffect(() => {
    const getMovieData = async () => {
      try {
        const { data } = await axios.get('/api/movies')
        setMovies(data)
      } catch (err) {
        setIsError(true)
      }
    }
    setTimeout(getMovieData, 1000)
  }, [])

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/moods')
      setMoods(data)
      console.log(data)
    }
    getData()
  }, [])


  return (

    <div className="movies-container">
      {isError && <Error />}
      {isLoading && <Spinner />}

      {movies && (
        <>
          <div>


            {moods.map(mood => {
              return <button 
                onClick={handleClick} 
                key={mood._id} 
                value={mood.mood}
                className={`mood-button ${selectedMoods.includes(mood.mood) ? 'mood-button-selected' : ''}`} 
              >
                {mood.mood}
              </button>
            })
            }
          </div>
          {filteredMovies.map(movie => {

            return <MovieCard key={movie._id} {...movie} />

          })}
        </>
      )}
    </div>


  )
}

export default MoviesIndex

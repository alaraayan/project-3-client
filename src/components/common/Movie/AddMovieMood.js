/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { addNewMood, getSingleMovie } from '../../../lib/api'
import Error from '../Error'
import axios from 'axios'

const alphabetical = (a, b) => a.mood < b.mood ? -1 : 1

function AddMovieMood() {
  const history = useHistory()
  const { movieId } = useParams()
  const [movie, setMovie] = React.useState(null)
  const [isError, setIsError] = React.useState(null)
  const isLoading = !movie && !isError

  //* Getting the current selected moods of the movie
  const [currentMoods, setCurrentMoods] = React.useState([])
  const [allMoods, setAllMoods] = React.useState([])
  const [addedMoods, setAddedMoods] = React.useState([])
  
  React.useEffect(() => {
    const getData = async () => {
      try {
        const movieResponse = await getSingleMovie(movieId)
        const moodsResponse = await axios.get('/api/moods')
        console.log(moodsResponse)
        const moodsWithNames = movieResponse.data.moods.map(({ mood }) => {
          return mood.mood
        })
        moodsResponse.data.sort(alphabetical)
        const allMoodsWithNames = moodsResponse.data
        setMovie(movieResponse.data)
        setCurrentMoods(moodsWithNames)
        setAllMoods(allMoodsWithNames)
      } catch (e) {
        setIsError(true)
        console.log(e)
      }
    }
    getData()
  }, [movieId])

  const availableMoods = allMoods.map(mood => mood.mood).filter(mood => { 
    return !currentMoods.includes(mood) && !addedMoods.includes(mood)
  })


  const handleAddingMoods = (e) => {
    const moodToAdd = e.target.value
    setAddedMoods([...addedMoods, moodToAdd])
  }

  const handleRemovingMoods = (e) => {
    const moodToRemove = e.target.value
    const updatedAddedMoods = addedMoods.filter(mood => mood !== moodToRemove)
    setAddedMoods(updatedAddedMoods)
  }

  const handleSubmitMoods = async event => {
    event.preventDefault()
    try {
      const moods = addedMoods.map( mood => {
        const moodId = allMoods.find(currentMood => currentMood.mood === mood)._id
        return moodId
      })
      await addNewMood(movieId, moods)
      console.log('hello I am here')
      history.push(`/movies/${movieId}`)
      console.log('moods', moods)
    } catch (e) {
      console.log('errors')
    }
  }

  return (
    <section className="home-test" id="new-movie">
      {isError && <Error />}
      {isLoading && <div className="error-message-container"><p className="error-message">Just keep waiting. Just keep waiting. Just keep waiting, waiting, waiting. What do we do? We wait, wait- Dory, Finding Nemo</p></div>}
      {movie && (
        <form onSubmit={handleSubmitMoods}>

          <section className="show-mood-container">
            <div>
              <img className="poster" src={movie.poster} />
            </div>
            <div className="add-mood-container">
              <h1>{movie.title} <span>({movie.year})</span></h1>

              <div>
                <h2>current moods</h2>
                <div className="mood-button-container">
                  
                  {currentMoods.map(mood => (
                    <button
                      key={mood}
                      value={mood}
                      type="button"
                      className="mood-button inactive "
                    >
                      {mood}
                    </button>
                  ))}
                  {addedMoods.map(mood => (
                    <button
                      key={mood}
                      value={mood}
                      type="button"
                      onClick={handleRemovingMoods}
                      className="mood-button mood-button-selected"
                    >
                      {mood}
                    </button>
                  ))}
                </div>
                <h2>available moods</h2>
                <div className="mood-button-container">
                  {availableMoods.map(mood => (
                    <button
                      key={mood}
                      onClick={handleAddingMoods}
                      value={mood}
                      type="button"
                      className="mood-button add-mood"
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <button type="submit" className="submit-button mood-page">Submit selection</button>
              </div>

            </div>
          </section>

        </form>
      )}
    </section>
  )
}

export default AddMovieMood

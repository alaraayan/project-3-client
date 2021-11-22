/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

import { isAdmin, isOwner } from '../../../lib/auth'
import { addNewMood, getSingleMovie, deleteMood } from '../../../lib/api'
import Error from '../Error'
import { baseUrl } from '../../../config'


const alphabetical = (a, b) => a.mood < b.mood ? -1 : 1

export default function AddMovieMood() {
  const history = useHistory()
  const { movieId } = useParams()
  const [movie, setMovie] = React.useState(null)
  const [isError, setIsError] = React.useState(null)
  const isLoading = !movie && !isError
  const [currentMoods, setCurrentMoods] = React.useState([])
  const [allMoods, setAllMoods] = React.useState([])

  
  React.useEffect(() => {
    const getData = async () => {
      try {
        const movieResponse = await getSingleMovie(movieId)
        const moodsResponse = await axios.get(`${baseUrl}/moods`)
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
    return !currentMoods.includes(mood)
  })


  const handleAddingMoods = async e => {
    try {
      const moodToAdd = e.target.value
      setCurrentMoods([...currentMoods, moodToAdd])
      const newMoodId = allMoods.find(currentMood => currentMood.mood === moodToAdd)._id
      await addNewMood(movieId, newMoodId)
      const movieWithNewMoods = await getSingleMovie(movieId)
      setMovie(movieWithNewMoods.data)
    } catch (e) {
      console.log(e)
    }
  }
  


  const handleRemovingMoods = async e => {
    try {
      const moodNameToRemove = e.target.value
      const updatedCurrentMoods = currentMoods.filter(mood => mood !== moodNameToRemove)
      const moodToRemoveId = movie.moods.filter(currentMood => currentMood.mood.mood === moodNameToRemove ).map(moodInfo => moodInfo._id)
      await deleteMood(movieId, moodToRemoveId)
      setCurrentMoods(updatedCurrentMoods)
    } catch (e) {
      console.log(e)
    }
  }  


  const handleSubmitMoods = () => {
    history.push(`/movies/${movieId}`)
  }

  const owner = (moodNameToFindOwner) => {
    const userIdToCheck = movie.moods.filter(currentMood => currentMood.mood.mood === moodNameToFindOwner ).map(moodInfo => moodInfo.user._id)
    console.log(userIdToCheck[0])
    return isOwner(userIdToCheck[0]) 
  }
 
  const doNothing = () => {
    return
  }
  
  return (
    <section id="new-movie">
      {isError && <Error />}
      {isLoading && <div className="error-message-container"><p className="error-message">...loading moods - grab the popcorn! 🍿</p></div>}
      {movie && (
        <section>

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
                      onClick={ (isAdmin() || owner(mood)) ? handleRemovingMoods : doNothing }
                      className={`mood-button ${(isAdmin() || owner(mood)) ? 'mood-button-selected mood-remove-button' : 'inactive'}`}
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
                <button 
                  type="submit" 
                  className="submit-button mood-page-submit-button"
                  onClick={handleSubmitMoods}>
                    Submit selection
                </button>
              </div>

            </div>
          </section>

        </section>
      )}
    </section>
  )
}

import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
import { addNewMood, getSingleMovie } from '../../../lib/api'
import Error from '../Error'
import axios from 'axios'
import useForm from '../../../hooks/useForm'

const alphabetical = (a, b) => a.mood < b.mood ? -1 : 1

function AddMovieMood() {
  const history = useHistory()
  const { movieId } = useParams()
  const [movie, setMovie] = React.useState(null)
  const [isError, setIsError] = React.useState(null)
  const isLoading = !movie && !isError

  const { formData, setFormData } = useForm({
    mood: '',
  })

  //* Getting the current selected moods of the movie
  const [currentMoods, setCurrentMoods] = React.useState([])

  React.useEffect(() => {
    const getSingleMovieData = async () => {
      try {
        const res = await getSingleMovie(movieId)
        setMovie(res.data)
        const moodsWithNames = res.data.moods.map(({ mood }) => {
          return mood.mood
        })
        setCurrentMoods(moodsWithNames)

      } catch (e) {
        setIsError(true)
        console.log(e)
      }
    }
    getSingleMovieData()

  }, [movieId])

  // console.log('current moods are', currentMoods)

  //* Getting all mood options
  const [allMoods, setAllMoods] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/moods')
        // console.log('data', data)
        data.sort(alphabetical)
        const moodsWithNames = data.map( mood => {
          return mood.mood
        })
        
        setAllMoods(moodsWithNames)
      } catch (e) {
        setIsError(true)
        console.log(e)
      }
    }
    getData()
  }, [])

  // console.log('all moods are', allMoods)

  //* Getting available mood options
  

  const availableMoods = allMoods.filter( mood => !currentMoods.includes(mood))
  // console.log('available moods are', availableMoods)

  //* Adding new moods

  const [addedMoods, setAddedMoods] = React.useState([])
  
  const handleAddingMoods = (e) => {
    
    const MoodToAdd = e.target.value
    setFormData(addedMoods)
    setAddedMoods([...addedMoods, MoodToAdd ])
    
    console.log('formdata adding:', formData)
  }
  
  // console.log('new addition moods array:', addedMoods)
  
  const newAvailableMoods = availableMoods.filter( mood => !addedMoods.includes(mood))
  // console.log('available moods are', newAvailableMoods)

  //* Removing the added moods

  const handleRemovingMoods = (e) => {
    const moodToRemove = e.target.value
    newAvailableMoods.push(moodToRemove)
    const updatedAddedMoods = addedMoods.filter( mood => mood !== moodToRemove)
    setAddedMoods(updatedAddedMoods)
    setFormData(updatedAddedMoods)
    console.log('formdata removing:', formData)
  }

  console.log('current moods', currentMoods)
  console.log('added moods', addedMoods)
  console.log('current formData', formData)

  
  
  
  const handleAddNewMood = async event => {
    event.preventDefault()
    
    try {
      // const newMoods = [...addedMoods]
      const res = await addNewMood(movieId, formData)
      console.log('this should work', res)
      
      setMovie(res.data)
      setFormData(res.data)
      history.goBack()
      console.log('formData:', formData, 'movie', movie)
    } catch (e) {
      console.log('errors')
    }
    
    // try {
    //   const res = await addNewMood(movieId, )
    // }
  }
  
  return (
    <section className="home-test" id="new-movie">
      {isError && <Error />}
      {isLoading && <p>Just keep waiting. Just keep waiting. Just keep waiting, waiting, waiting. What do we do? We wait, wait- Dory, Finding Nemo</p>}
      {movie && (
        <form onSubmit={handleAddNewMood}>
          <div className="show-movie-container">
            <article style={{ display: 'flex' }}>
              <div>
                <img className="poster" src={movie.poster} />
              </div>
              
              
              
              <div>
                <h1>{movie.title} <span>({movie.year})</span></h1> 
                <h2>moods for this movie:</h2>
                {currentMoods.map( mood => (
                  <button
                    key={mood}
                    value={mood}
                    className="mood-button inactive"
                  >
                    {mood}
                  </button>
                ))}
                {addedMoods.map( mood => (
                  <button
                    key={mood}
                    value={mood}
                    onClick={handleRemovingMoods} 
                    className="mood-button mood-button-selected"
                  >
                    {mood}
                  </button>
                ))}
              
              
                <h2>Add the moods you think fits this movie:</h2>
                {newAvailableMoods.map( mood => (
                  <button 
                    key={mood}
                    onClick={handleAddingMoods} 
                    value={mood}
                    className="mood-button"
                  >
                    {mood}
                  </button>
                ))}
                <div>
                  <button type="submit" className="submit-button">Add moods</button>
                </div>
              </div>
            </article>
          </div>
        </form>
      )}
    </section>
  )
}

export default AddMovieMood

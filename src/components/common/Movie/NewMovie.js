import React from 'react'
import axios from 'axios'
import ImdbSelect from './ImdbSelect'
import RatingDisplay from './RatingDisplay'
import { useHistory } from 'react-router-dom'
import { addNewMovie } from '../../../lib/api'

const format = (string) => string.split(',').map((s) => s.trim())

function NewMovie() {
  const history = useHistory()
  const [moods, setMoods] = React.useState([])
  const [error, setError] = React.useState('')
  const [movieData, setMovieData] = React.useState({
    imdb: '',
    title: '',
    year: '',
    rated: '',
    released: '',
    runtime: '',
    genres: '',
    director: '',
    actors: '',
    plot: '',
    language: '',
    poster: '',
    ratings: [],
    moods: [],
  })

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/moods')
      setMoods(data)
      console.log(data)
    }
    getData()
  }, [])

  const handleSubmit = async () => {
    try {
      const newMovieData = {
        ...movieData,
        genres: format(movieData.genres),
        director: format(movieData.director),
        actors: format(movieData.actors),
        language: format(movieData.language),
        ratings: movieData.ratings.map(rating => ({ value: rating.Value, source: rating.Source })),
      }
      await addNewMovie(newMovieData)
      history.push('/movies')
    } catch (e) {
      setError(e.response.data.message)
    }
  }
  

  const handleToggleMood = ({ target: { value: mood } }) => {
    setMovieData({
      ...movieData,
      moods: movieData.moods.includes(mood)
        ? movieData.moods.filter((m) => m !== mood)
        : [...movieData.moods, mood],
        
    })
  }

  return (
    <section id="new-movie">
      <ImdbSelect setError={setError} setMovieData={setMovieData} />
      {error && <p>{error}</p>}
      {movieData.imdb && (
        <>
          <article style={{ display: 'flex' }}>
            <div>
              <img className="poster" src={movieData.poster} />
            </div>
            <div>
              <div>
                <h1>{movieData.title}</h1>
              </div>
              <div>
                <h3>Director</h3>
                <p>{movieData.director}</p>
              </div>
              <div>
                <h3>Actors</h3>
                <p>{movieData.actors}</p>
              </div>
              <div>
                <h3>Plot</h3>
                <p>{movieData.plot}</p>
              </div>
              <div>
                <h3>Released</h3>
                <p>{movieData.released}</p>
              </div>
              <div>
                <h3>Runtime</h3>
                <p>{movieData.runtime}</p>
              </div>
              <div>
                <h3>Genres</h3>
                <p>{movieData.genres}</p>
              </div>
              <div>
                {movieData.ratings.map((rating) => {
                  return <RatingDisplay key={rating.Value} rating={rating} />
                }
                )}
              </div>
              <div className='buttons-container'>
                {moods.map(({ mood }) => (
                  <button 
                    key={mood}
                    value={mood} 
                    onClick={handleToggleMood} 
                    className={`mood-button ${movieData.moods.includes(mood) ? 'mood-button-selected' : ''}`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </article>
          <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </>
      )}
    </section>
  )
}

export default NewMovie

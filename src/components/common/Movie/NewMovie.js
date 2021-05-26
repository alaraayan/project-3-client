import React from 'react'
import axios from 'axios'
import ImdbSelect from './ImdbSelect'
import RatingDisplay from './RatingDisplay'
import { useHistory } from 'react-router-dom'

const format = (string) => string.split(',').map((s) => s.trim())

function NewMovie() {
  const history = useHistory()
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
    ratings: '',
    moods: [],
  })

  const [moviePoster, setMoviePoster] = React.useState('')
  const [moods, setMoods] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/moods')
      setMoods(data)
      console.log(data)
    }
    getData()
  }, [])

  const handleSubmit = async () => {
    const newMovieData = {
      ...movieData,
      genres: format(movieData.genres),
      director: format(movieData.director),
      actors: format(movieData.actors),
      language: format(movieData.language),
    }
    const response = await axios.post('/api/movies', newMovieData)
    console.log(response)
    history.push('/movies')
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
    <section>
      <ImdbSelect setMovieData={setMovieData} setMoviePoster={setMoviePoster} />
      {movieData.imdb && (
        <article style={{ display: 'flex' }}>
          <div>
            <img src={moviePoster} />
          </div>
          <div>
            <div>
              <h3>Director</h3>
              <p>{movieData.director}</p>
            </div>
            <div>
              <h3>Actors</h3>
              <p>{movieData.actors}</p>
            </div>
            <div>
              <h5>Plot</h5>
              <p>{movieData.plot}</p>
            </div>
            <div>
              <p>Released</p>
              <p>{movieData.released}</p>
            </div>
            <div>
              <p>Runtime</p>
              <p>{movieData.runtime}</p>
            </div>
            <div>
              <p>Genres</p>
              <p>{movieData.genres}</p>
            </div>
            <div>
              <p>Ratings</p>
              {movieData.ratings.map((rating) => {
                return <RatingDisplay key={rating.Value} rating={rating} />
              }
              )}
            </div>
            {moods.map(({ mood }) => (
              <button key={mood} value={mood} onClick={handleToggleMood}>
                {mood}
              </button>
            ))}
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </article>
      )}
    </section>
  )
}

export default NewMovie

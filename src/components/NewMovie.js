import React from 'react'
import axios from 'axios'
import AsyncSelect from 'react-select/async'
import { useHistory } from 'react-router-dom'

const format = (string) => string.split(',').map((s) => s.trim())

function NewMovie() {
  const history = useHistory()
  console.log(history)
  const [formData, setFormData] = React.useState({
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
  console.log(setMoods)
  React.useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('ENDPOINT FOR ALL MOODS')
      setMoods(data)
    }
    getData()
  }, [])

  const handleLoadOptions = async (inputValue) => {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=1874d202&type=movie&s=${inputValue}`
    )
    if (data.Response === 'False') {
      return []
    }
    return data.Search.map((movie) => ({
      value: movie.imdbID,
      label: `${movie.Title}, ${movie.Year}`,
    }))
  }

  const handleChange = async ({ value: imdbID }) => {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=1874d202&type=movie&plot=full&i=${imdbID}`
    )
    if (data.Response === 'False') {
      console.error('There was an error setting the data')
      return
    }

    setFormData({
      imdb: imdbID,
      title: data.Title,
      year: data.Year,
      rated: data.Rated,
      released: data.Released,
      runtime: data.Runtime,
      genres: data.Genre,
      director: data.Director,
      actors: data.Actors,
      plot: data.Plot,
      language: data.Language,
      ratings: data.Ratings,
      moods: [],
    })
    setMoviePoster(data.Poster)
  }

  const handleSubmit = async () => {
    const newMovieData = {
      ...formData,
      genres: format(formData.genres),
      director: format(formData.director),
      actors: format(formData.actors),
      language: format(formData.language),
    }
    const response = await axios.post('POST A NEW FILM', newMovieData)
    history.push('SOME OTHER PAGE')
    console.log(response)
  }

  const handleToggleMood = ({ target: { value: mood } }) => {
    setFormData({
      ...formData,
      moods: formData.moods.includes(mood)
        ? formData.moods.filter((m) => m !== mood)
        : [...formData.moods, mood],
    })
  }

  return (
    <section>
      <AsyncSelect loadOptions={handleLoadOptions} onChange={handleChange} />
      {formData.imdb && (
        <article style={{ display: 'flex' }}>
          <div>
            <img src={moviePoster} />
          </div>
          <div>
            <div>
              <h3>Director</h3>
              <p>{formData.director}</p>
            </div>
            <div>
              <h3>Actors</h3>
              <p>{formData.actors}</p>
            </div>
            <div>
              <h5>Plot</h5>
              <p>{formData.plot}</p>
            </div>
            <div>
              <p>Released</p>
              <p>{formData.released}</p>
            </div>
            <div>
              <p>Runtime</p>
              <p>{formData.runtime}</p>
            </div>
            <div>
              <p>Genres</p>
              <p>{formData.genres}</p>
            </div>
            <div>
              <p>Ratings</p>
            </div>
            {moods.map((mood) => (
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
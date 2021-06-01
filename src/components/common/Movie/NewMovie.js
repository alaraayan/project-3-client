import React from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import ImdbSelect from './ImdbSelect'
import MoodButtons from '../lib/MoodButtons'
import RatingDisplay from './RatingDisplay'
import { addNewMovie } from '../../../lib/api'
import Error from '../Error'

const initialData = {
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
}


function NewMovie() {
  const history = useHistory()
  const [error, setError] = React.useState('')
  const [movieData, setMovieData] = React.useState(initialData)
  const isLoading = !movieData && !error
  //const adminStatus = isAdmin()

  const handleSubmit = async () => {
    try {
      await addNewMovie(movieData)
      toast.error('Movie successfully added!')
      history.push('/movies')
    } catch (e) {
      setError(e.response.data.message)
      if (e.response.status === 401) {
        history.push('/unauthorized')
      }

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
    <div className="movie-container">
      <div className="header">
        <div className="landing-image-container">

        </div>
      </div>
      <section id="new-movie">
        <h1>Add a movie to Moodflix</h1>
        <p>Search for a movie title, then add the movie to the Moodflix library with the moods it invoked in you..</p>
        <ImdbSelect setError={setError} setMovieData={setMovieData} />
        {error && <Error />}
        {isLoading && <p classNane="error-message">...loading movie - grab the popcorn! 🍿 </p>}
        {movieData.imdb && (
          <>
            <div className="show-movie-container">
              <article>
                <div>
                  <img className="poster" src={movieData.poster} />
                </div>
                <div>
                  <div>
                    <h1>{movieData.title}</h1>
                  </div>
                  <div>
                    <h2>Director</h2>
                    <p>{movieData.director}</p>
                  </div>
                  <div>
                    <h2>Actors</h2>
                    <p>{movieData.actors}</p>
                  </div>
                  <div>
                    <h2>Plot</h2>
                    <p className="plot">{movieData.plot}</p>
                  </div>
                  <div>
                    <h2>Released</h2>
                    <p>{movieData.released}</p>
                  </div>
                  <div>
                    <h2>Runtime</h2>
                    <p>{movieData.runtime}</p>
                  </div>
                  <div>
                    <h2>Genres</h2>
                    <p>{movieData.genres}</p>
                  </div>
                  <div>
                    {movieData.ratings.map((rating) => <RatingDisplay key={rating.value} rating={rating} /> )}
                  </div>
                  <MoodButtons onClick={handleToggleMood} selectedMoods={movieData.moods} />
                </div>
              </article>
              <div className="buttons-container">
                <button className='button submit-button' onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </>
        )}
      </section>
      <ToastContainer />
    </div>
  )
}

export default NewMovie

import React from 'react'
import { useHistory } from 'react-router-dom'

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

// const tempData =   {
//   'title': 'Dances with Wolves',
//   imdb: 'tt0099348',
//   'year': '1990',
//   'rated': 'PG-13',
//   'released': '21 Nov 1990',
//   'runtime': '181 min',
//   'genres': 'Adventure, Drama, Western',
//   'director': 'Kevin Costner',
//   'actors': 'Kevin Costner, Mary McDonnell, Graham Greene, Rodney A. Grant',
//   'plot': 'Lt. John Dunbar is dubbed a hero after he accidentally leads Union troops to a victory during the Civil War. He requests a position on the western frontier, but finds it deserted. He soon finds out he is not alone, but meets a wolf he dubs "Two-socks" and a curious Indian tribe. Dunbar quickly makes friends with the tribe, and discovers a white woman who was raised by the Indians. He gradually earns the respect of these native people, and sheds his white-man\'s ways.',
//   'language': 'English, Sioux, Pawnee',
//   'poster': 'https://m.media-amazon.com/images/M/MV5BMTY3OTI5NDczN15BMl5BanBnXkFtZTcwNDA0NDY3Mw@@._V1_SX300.jpg',
//   'ratings': [
//     { 'source': 'Internet Movie Database', 'value': '8.0/10' },
//     { 'source': 'Rotten Tomatoes', 'value': '83%' },
//     { 'source': 'Metacritic', 'value': '72/100' }
//   ],
//   'moods': ['uplifting', 'thought-provoking'],
// }

function NewMovie() {
  const history = useHistory()
  const [error, setError] = React.useState('')
  const [movieData, setMovieData] = React.useState(initialData)
  const isLoading = !movieData && !error
  //const adminStatus = isAdmin()

  const handleSubmit = async () => {
    try {
      await addNewMovie(movieData)
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
                <button className='button' onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default NewMovie

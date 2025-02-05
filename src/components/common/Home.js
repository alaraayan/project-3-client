import React from 'react'
import { getAllMovies } from '../../lib/api'
import { Link } from 'react-router-dom'

import Hero from './Hero'
import Spinner from './Spinner'

const moods = ['easy', 'dark', 'adventurous', 'lol', 'uplifting', 'weird']

function Home() {
  const [movies, setMovies] = React.useState(null)
  const heroMovie = React.useMemo(
    () => (movies ? movies[Math.floor(Math.random() * movies.length)] : null),
    [movies]
  )

  console.log(movies && movies[Math.floor(Math.random() * 166)])
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data: moviesData } = await getAllMovies()
        
        setMovies(moviesData)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  if (!movies) {
    return <Spinner />
  }

  return (
    <section>
      <Hero movie={heroMovie} />
      {moods.map((mood) => (
        <Gallery key={mood} movies={movies} mood={mood} />
      ))}
    </section>
  )
}

export default Home

function Gallery({ movies, mood }) {
  console.log(`mood: ${mood}`)

  const filteredMovies = movies.filter((movie) => {
    const movieMoods = movie.moods.map((m) => m.mood.mood) 
    return movieMoods.includes(mood)
  })
  console.log(filteredMovies)

  return (
    <section className="mood-gallery-row">
      <h1>Feeling {mood}</h1>
      <div className="horizontal-scroll">
        {filteredMovies.map((movie) => (
          <Link key={movie._id} to={`/movies/${movie._id}`} className="row-poster">
            <img src={movie.poster} alt={movie.title} />
          </Link>
        ))}
      </div>
    </section>
  )
}

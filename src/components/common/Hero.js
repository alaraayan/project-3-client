import React from 'react'
import { getBackdropImage } from '../../lib/tmdb'
import { Link } from 'react-router-dom'


function Hero({ movie }) {
  const [heroMovie, setHeroMovie] = React.useState(movie)
  React.useEffect(() => {
    const getData = async () => {
      try {
        const backdrop = await getBackdropImage(movie)
        setHeroMovie({ ...movie, backdrop })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [movie])

  if (!heroMovie) return null

  return (
    <header className="hero">
      <div
        className="hero-contents"
        style={{ backgroundImage: `url("${heroMovie.backdrop}")` }}
      >
        <div className="filter-layer">
          <Link to={`/movies/${heroMovie._id}`}>
            <img src={heroMovie.poster} alt={heroMovie.title} />
            <h1>{heroMovie.title}</h1>
          </Link>
          {heroMovie.moods
            .map((m) => m.mood.mood)
            .map((mood) => (
              <button key={mood} className="mood-button inactive">
                {mood}
              </button>
            ))}
          <p className="line-clamp">
            {heroMovie.plot}
          </p>

        </div>
      </div>
    </header>
  )
}

export default Hero



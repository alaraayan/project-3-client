import { Link } from 'react-router-dom'

const alphabetical = (a, b) => a.mood.mood < b.mood.mood ? -1 : 1

function MovieCard({ _id, poster, year, plot, title, moods }) {
  console.log(moods)
  return (
    <Link to={`/movies/${_id}`} key={_id}>
      <div className="individual-movies-container" key={_id}>
        <figure>
          <img src={poster} alt={name} />
        </figure>
        <div className="movie-info-on-card">
          <h2>{title}, {year}</h2>
          {moods.sort(alphabetical).map(({ mood }) => (
            <button className="mood-button on-card inactive" key={mood._id} value={mood} >
              {mood.mood}
            </button>
          ))}
          <div className="overflow-text line-clamp">
            {plot}
          </div>
        </div>

      </div>
    </Link>
  )
}

export default MovieCard
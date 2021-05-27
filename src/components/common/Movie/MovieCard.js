import { Link } from 'react-router-dom'


function MovieCard({ _id, poster, year, plot, title, moods }) {
  return (
    <Link to={`/movies/${_id}`} key={_id}>
      <div className="individual-movies-container" key={_id}>
        {/* display each movie */}

        <figure >
          <img src={poster} alt={name} width="240" height="125" />
        </figure>

        <h2>{title}, {year}</h2>
        {moods.map(({ mood }) => (
          <button className="mood-button" key={mood._id} value={mood} >
            {mood.mood}
          </button>
        ))}
        <div className="overflow-text line-clamp">
          {plot}
        </div>

      </div>
    </Link>
  )
}

export default MovieCard
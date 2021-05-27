
function MovieCard({ _id, poster, year, plot, title, moods }) {
  return (
    <div className="individual_movies_container" key={_id}>
      {/* display each movie */}

      <figure >
        <img src={poster} alt={name} width="240" height="125" />
      </figure>

      <h2>{title}, {year}</h2>
      {moods.map(({ mood }) => (
        <button key={mood} value={mood} >
          {mood}
        </button>
      ))}
      <div className="overflow-text line-clamp">
        {plot}
      </div>

    </div>
  )
}

export default MovieCard
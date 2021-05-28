import imdb from '../../../assets/images/imdb-icon.png' 
import metacritic from '../../../assets/images/metacritic-icon.png'
import rottenTomatoes from '../../../assets/images/rotten-tomatoes-icon.png'


const logoReferences = {
  'Internet Movie Database': imdb,
  'Rotten Tomatoes': rottenTomatoes,
  'Metacritic': metacritic,
}

function RatingDisplay({ rating }) {
  return (
    <div className='ratings-card'>
      <img src={logoReferences[rating.source]} />
      <p>{rating.value}</p>
    </div>
  )
}

export default RatingDisplay

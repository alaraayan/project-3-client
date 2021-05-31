import React from 'react'
import { getAllMoods } from '../../../lib/api'

const alphabetical = (a, b) => a.mood < b.mood ? -1 : 1


function MoodButtons({ onClick, selectedMoods }) {
  const [moods, setMoods] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getAllMoods()
      setMoods(data.sort(alphabetical))
    }
    getData()
  }, [])

  return (
    <div className="mood-buttons-container">
      {moods.map(({ mood }) => (
        <button 
          key={mood}
          onClick={onClick} 
          value={mood}
          className={`mood-button ${selectedMoods.includes(mood) ? 'mood-button-selected' : ''}`} 
        >
          {mood}
        </button>
      ))}
    </div>
  )
}

export default MoodButtons
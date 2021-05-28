import React from 'react'
import axios from 'axios'

const alphabetical = (a, b) => a.mood < b.mood ? -1 : 1


function MoodButtons({ onClick, selectedMoods }) {
  const [moods, setMoods] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/moods')
      setMoods(data.sort(alphabetical))
    }
    getData()
  }, [])

  return (
    <div className="buttons-container">
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
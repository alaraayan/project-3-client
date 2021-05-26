import React from 'react'
import AsyncSelect from 'react-select/async'
import axios from 'axios'


function ImdbSelect({ setMovieData, setMoviePoster }) {
  // add a try/catch
  const handleLoadOptions = async (inputValue) => {
    console.log(inputValue)
    try {
      const { data } = await axios.get(
        `http://www.omdbapi.com/?apikey=1874d202&type=movie&s=${inputValue}`
      )
      if (data.Response === 'False') {
        return []
      }
      return data.Search.map((movie) => ({
        value: movie.imdbID,
        label: `${movie.Title}, ${movie.Year}`,
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = async ({ value: imdbID }) => {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=1874d202&type=movie&plot=full&i=${imdbID}`
    )
    if (data.Response === 'False') {
      console.error('There was an error setting the data')
      return
    }

    setMovieData({
      imdb: imdbID,
      title: data.Title,
      year: data.Year,
      rated: data.Rated,
      released: data.Released,
      runtime: data.Runtime,
      genres: data.Genre,
      director: data.Director,
      actors: data.Actors,
      plot: data.Plot,
      language: data.Language,
      ratings: data.Ratings,
      moods: [],
    })

    setMoviePoster(data.Poster)
  }

  return <AsyncSelect loadOptions={handleLoadOptions} onChange={handleChange} />
}

export default ImdbSelect
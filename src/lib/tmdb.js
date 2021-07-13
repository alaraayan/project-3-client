import axios from 'axios'

// NEW FILE IN LIB, tmdb.js
const API_KEY = '683af52a5204568c45f2381400a87e7f'
const tmdbConfigUrl = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

// Call the tmdb api to search for the movie by title and return the match from tmdb
export async function getBackdropImage(movie) {
  const baseImageUrl = await getBaseImageUrl()
  const { data } = await axios.get(searchUrl + encodeURI(movie.title))
  const matchedMovie = data.results.find((result) => {
    return isTitleMatch(result, movie) && result.release_date.includes(movie.year)
  })
  return matchedMovie ? baseImageUrl + matchedMovie.backdrop_path : movie.poster
}

// Call the TMDB configuration endpoint to build the baseUrl for images
async function getBaseImageUrl() {
  const { data } = await axios.get(tmdbConfigUrl)
  const baseUrl = data.images['base_url']

  const backdropSize = data.images['backdrop_sizes'].find((size) =>
    size.includes('1280')
  )

  return baseUrl + backdropSize
}

// Check if the tmdb title contains the omdb title or vice-versa 
// (specifically catered to Indiana Jones and The Raiders of the Lost Ark coming up as 'Raiders of the Lost Ark' on TMDB)
function isTitleMatch(tmdbTitle, imdbTitle) {
  return (
    tmdbTitle.title.toLowerCase().includes(imdbTitle.title.toLowerCase()) ||
    imdbTitle.title.toLowerCase().includes(tmdbTitle.title.toLowerCase())
  )
}
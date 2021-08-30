import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useForm from '../../../hooks/useForm'
import { getSingleMovie, editMovie } from '../../../lib/api'
import RatingDisplay from './RatingDisplay'

export default function MovieEdit() {
  const history = useHistory()
  const { movieId } = useParams()
  const { formData, formErrors, handleChange, setFormErrors, setFormData } = useForm({
    imdb: '',
    title: '',
    year: '',
    rated: '',
    released: '',
    runtime: '',
    genres: '',
    director: '',
    cast: '',
    plot: '',
    language: '',
    poster: '',
    ratings: [],
    moods: [],
  })

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSingleMovie(movieId)
        setFormData(data)
      } catch (e) {
        setFormErrors(e.response.data.formErrors)
      }
    }
    getData()
  }, [movieId, setFormData, setFormErrors])

  console.log(formData)
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await editMovie(movieId, formData)
      history.push(`/movies/${movieId}`)
    } catch (e) {
      setFormErrors(e.response.data.formErrors)
    }
  }


  return (
    <section id="new-movie">
      <div className="show-movie-container">
        <form
          onSubmit={handleSubmit}
        >
          <article>
          
            <div>
              <img className="poster" src={formData.poster} />
            </div>
            <div>
              <h1>Edit &#34;{formData.title}&#34;</h1>
              <div className="info-container">
                <h2 className="inline">IMDB ID:</h2>
                <div>
                  <button className="mood-button inactive">{formData.imdb}</button>
                </div>
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
              <div className="info-container">
                <h2 className="inline">Moods:</h2>
                <div>
                  {formData.moods.map(({ mood }) => (
                    <button 
                      key={mood._id} 
                      value={mood}
                      className="mood-button inactive"
                    >
                      {mood.mood}
                    </button>
                  ))}
                </div>
              </div>
              <div className="info-container">
                <h2 className="inline">Title:</h2>
                
                <input
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
                />
                
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
              <div className="info-container">
                <h2 className="inline">Year:</h2>
                
                <input
                  placeholder="Year"
                  name="year"
                  onChange={handleChange}
                  value={formData.year}
                />
                
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
              <div className="info-container">
                <h2 className="inline">Director:</h2>
                
                <input
                  placeholder="Director"
                  name="director"
                  onChange={handleChange}
                  value={formData.director}
                />
                
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
              <div className="info-container">
                <h2 className="inline">Actors:</h2>
                
                <textarea
                  placeholder="Actors"
                  name="actors"
                  onChange={handleChange}
                  value={formData.actors}
                />
                
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
              <div className="info-container">
                <h2 className="inline">Plot:</h2>
                
                <textarea
                  placeholder="Plot"
                  name="plot"
                  onChange={handleChange}
                  value={formData.plot}
                  className="plot"
                />
                
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
              <div className="info-container">
                <h2 className="inline">Released:</h2>
                
                <input
                  placeholder="Released"
                  name="released"
                  onChange={handleChange}
                  value={formData.released}
                />
                
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
              <div className="info-container">
                <h2 className="inline">Runtime:</h2>
                
                <input
                  placeholder="Runtime"
                  name="runtime"
                  onChange={handleChange}
                  value={formData.runtime}
                />
                
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
              <div className="info-container">
                <h2 className="inline">Genres:</h2>
                
                <input
                  placeholder="Genres"
                  name="genres"
                  onChange={handleChange}
                  value={formData.genres}
                />
                
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
              
              <div className="info-container">
                <h2 className="inline">Rated:</h2>
                
                <input
                  placeholder="Rated"
                  name="rated"
                  onChange={handleChange}
                  value={formData.rated}
                />
                
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
              <div className="info-container">
                <h2 className="inline">Languages:</h2>
                
                <input
                  placeholder="Language"
                  name="language"
                  onChange={handleChange}
                  value={formData.language}
                />
                
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
              <div className="info-container">
                <h2 className="inline">Poster URL:</h2>
                
                <input
                  placeholder="Poster URL"
                  name="poster"
                  onChange={handleChange}
                  value={formData.poster}
                />
                
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
              <div className="info-container">
                <h2>Ratings:</h2>
                <div>
                  {formData.ratings.map((rating) => {
                    return <RatingDisplay key={rating._id} rating={rating} />
                  }
                  )}
                </div>
                {formErrors.name && (
                  <p>{formErrors.name}</p>
                )}
              </div>
          
              <div className="field">
                <button type="submit" className="submit-button">
                Save Movie
                </button>
              </div>
            </div>
          </article>
        </form>
        
      </div>
    </section>
  )
}
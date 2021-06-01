// import React from 'react'
// import { useParams, useHistory } from 'react-router-dom'
// import useForm from '../../../hooks/useForm'
// import { getSingleMovie, editMovie } from '../../../lib/api'
// import RatingDisplay from './RatingDisplay'

// export default function MovieEdit() {
//   const history = useHistory()
//   const { movieId } = useParams()
//   const [movieData, setMovieData] = React.useState(formData)
//   const { formData, formErrors, handleChange, setFormErrors, setFormData } = useForm({
//     imdb: '',
//     title: '',
//     year: '',
//     rated: '',
//     released: '',
//     runtime: '',
//     genres: '',
//     director: '',
//     cast: '',
//     plot: '',
//     language: '',
//     poster: '',
//     ratings: [],
//     moods: [],
//   })

//   React.useEffect(() => {
//     const getData = async () => {
//       try {
//         const { data } = await getSingleMovie(movieId)
//         setFormData(data)
//       } catch (e) {
//         setFormErrors(e.response.data.formErrors)
//       }
//     }
//     getData()
//   }, [movieId, setFormData, setFormErrors])

//   console.log(formData)
//   const handleSubmit = async event => {
//     event.preventDefault()

//     try {
//       await editMovie(movieId, formData)
//       const { data } = await getSingleMovie(movieId)
//       setFormData(data)
//       console.log('formdata', formData)
//       history.push(`/movies/${movieId}`)
//     } catch (e) {
//       setFormErrors(e.response.data.formErrors)
//     }
//   }

//   // const handleToggleMood = ({ target: { value: mood } }) => {

//   //     moods: movieData.moods.includes(mood)
//   //       ? movieData.moods.filter((m) => m !== mood)
//   //       : [...movieData.moods, mood],
        
        

//   // }

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit}
//       >
//         <div>
//           <label>IMDB</label>
//           <div>
//             {formData.imdb}
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Title</label>
//           <div>
//             <input
//               placeholder="Title"
//               name="title"
//               onChange={handleChange}
//               value={formData.title}
//             />
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Year</label>
//           <div>
//             <input
//               placeholder="Year"
//               name="year"
//               onChange={handleChange}
//               value={formData.year}
//             />
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Rated</label>
//           <div>
//             <input
//               placeholder="Rated"
//               name="rated"
//               onChange={handleChange}
//               value={formData.rated}
//             />
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Released</label>
//           <div>
//             <input
//               placeholder="Released"
//               name="released"
//               onChange={handleChange}
//               value={formData.released}
//             />
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Runtime</label>
//           <div>
//             <input
//               placeholder="Runtime"
//               name="runtime"
//               onChange={handleChange}
//               value={formData.runtime}
//             />
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Genres</label>
//           <div>
//             <input
//               placeholder="Genres"
//               name="genres"
//               onChange={handleChange}
//               value={formData.genres}
//             />
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Director</label>
//           <div>
//             <input
//               placeholder="Director"
//               name="director"
//               onChange={handleChange}
//               value={formData.director}
//             />
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Cast</label>
//           <div>
//             <textarea
//               placeholder="Cast"
//               name="actors"
//               onChange={handleChange}
//               value={formData.actors}
//             />
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Plot</label>
//           <div>
//             <textarea
//               placeholder="Plot"
//               name="plot"
//               onChange={handleChange}
//               value={formData.plot}
//             />
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Language</label>
//           <div>
//             <input
//               placeholder="Language"
//               name="language"
//               onChange={handleChange}
//               value={formData.language}
//             />
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Poster</label>
//           <div>
//             <input
//               placeholder="Poster URL"
//               name="poster"
//               onChange={handleChange}
//               value={formData.poster}
//             />
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Ratings</label>
//           <div>
//             {formData.ratings.map((rating) => {
//               return <RatingDisplay key={rating._id} rating={rating} />
//             }
//             )}
//           </div>
//           {formErrors.name && (
//             <p>{formErrors.name}</p>
//           )}
//         </div>
//         <div>
//           <label>Moods</label>
//           {/* <div className='buttons-container'>
//             {formData.moods.map(({ mood }) => {
//               return <button 
//                 key={mood}
//                 value={mood} 
//                 onClick={handleToggleMood} 
//                 className={`mood-button ${formData.moods.includes(mood) ? 'mood-button-selected' : ''}`}
//               >
//                 {mood}
//               </button>
//             })}
//           </div> */}
//           {formData.moods.map(({ mood }) => (
//             <p 
//               key={mood._id} 
//               value={mood}
//               className="mood-button" 
//             >
//               {mood.mood}
//             </p>
//           ))}
//         </div>
//         <div className="field">
//           <button type="submit">
//                 Save Movie
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }
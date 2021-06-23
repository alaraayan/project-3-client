
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import React from 'react'
import NewMovie from './components/common/movie/NewMovie'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import MoviesIndex from './components/common/movie/MoviesIndex'
import MovieShow from './components/common/movie/MovieShow'
import MovieSearch from './components/common/movie/MovieSearch'
import Home from './components/common/Home'
import Nav from './components/common/Nav'
import AddMovieMood from './components/common/movie/AddMovieMood'
import NotFound from './components/common/NotFound'
import NotAuthorized from './components/common/NotAuthorized'
import MovieEdit from './components/common/movie/MovieEdit'

function App() {

  return (
    <Router>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movies/new" component={NewMovie} />
        <Route path="/movies/search" component={MovieSearch}/>
        <Route path="/movies/:movieId/mood" component={AddMovieMood} />
        <Route path="/movies/:movieId/edit" component={MovieEdit} />
        <Route path="/movies/:movieId" component={MovieShow} />
        <Route path="/movies" component={MoviesIndex} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        {/* for any page not found */}
        <Route path="/unauthorized" component={NotAuthorized} />

        <Route exact path="*" component={NotFound} />

      </Switch>
      
    </Router>
  )
}

export default App

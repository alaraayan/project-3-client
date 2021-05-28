
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NewMovie from './components/common/movie/NewMovie'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import MoviesIndex from './components/common/movie/MoviesIndex'
import MovieShow from './components/common/movie/MovieShow'
import MovieSearch from './components/common/movie/MovieSearch'
import Home from './components/common/Home'
import MovieEdit from './components/common/movie/MovieEdit'
import Nav from './components/common/Nav'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movies/new" component={NewMovie} />
        <Route path="/movies/search" component={MovieSearch}/>
        <Route path="/movies/:movieId/edit" component={MovieEdit} />
        <Route path="/movies/:movieId" component={MovieShow} />
        <Route path="/movies" component={MoviesIndex} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        
      </Switch>
      
    </Router>
  )
}

export default App

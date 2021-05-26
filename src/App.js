import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NewMovie from './components/NewMovie'
import Register from './components/auth/Register'
import Login from './components/auth/Login'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movies/new" component={NewMovie} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
      
    </Router>
  )
}

export default App

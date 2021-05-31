import React, { useState } from 'react'
import moodflixLogo from '../../assets/images/moodflix-logo.png'
import Hamburger from 'hamburger-react'


import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'


function Nav() {
  const history = useHistory()
  // const location = useLocation()
  const isLoggedIn = isAuthenticated()
  const [showColor, setShowColor] = React.useState(false)
  const [sidebarShow, setSidebarShow] = useState(false)

  const handleSideBar = () => setSidebarShow(!sidebarShow)


  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  React.useEffect(() => {
    const scrollListener = () => {
      (window.scrollY > 150) ? setShowColor(true) : setShowColor(false)
    }
    window.addEventListener('scroll', scrollListener) 
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <>
      <div className={`navbar ${showColor ? 'navbar-show-color' : 'navbar-default-color'}`}>
        <Link to="/"><img src={moodflixLogo} alt="logo of Moodflix" width="130" /></Link>

        <div className="menu-items-end" onClick={handleSideBar}>
          <Hamburger onClick={handleSideBar} />

        </div>
      </div>
      <div className={sidebarShow ? 'side-nav-menu-container active' : 'side-nav-menu-container'}>
        <ul className="navbar-content-container" >
          <li><Link to="/" className="navbar-item">Home</Link></li>
          <li><Link to="/movies" className="navbar-item">Movies</Link></li>
          {isLoggedIn && <li><Link to="/movies/new" className="navbar-item">New Movie</Link></li>}
          {!isLoggedIn ?
            <>
              <li><Link to="/register" className="navbar-item">Register</Link></li>
              <li><Link to="/login" className="navbar-item">Log In</Link></li>
            </>
            :
            <button onClick={handleLogout}>Log out</button>
          }
          <li className="search_list_item">
            <input type="text" placeholder="Search"></input>
          </li>

        </ul>
      </div>
    </>
  )
}

export default Nav



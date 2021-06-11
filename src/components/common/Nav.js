import React, { useState } from 'react'
import moodflixLogo from '../../assets/images/moodflix-logo.png'
import Hamburger from 'hamburger-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faFilm,faSearch,faUsers,faUserPlus, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
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
    toast.error('Successfully logged out!')
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
          <Hamburger toggled={sidebarShow} toggle={setSidebarShow} />

        </div>
      </div>
      <div className={sidebarShow ? 'side-nav-menu-container active' : 'side-nav-menu-container'}>
        <ul className="navbar-content-container" onClick={handleSideBar}>
          <li><Link to="/" className="navbar-item" ><FontAwesomeIcon className="fa-items-icon" icon={faHome} />Home</Link></li>
          <li><Link to="/movies" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faFilm} />Movies</Link></li>
          <li><Link to="/movies/search" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faSearch} />Search Movies</Link></li>

          {isLoggedIn && <li><Link to="/movies/new" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faPlus} />Add a Movie</Link></li>}
          {!isLoggedIn ?
            <>
              <li><Link to="/register" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faUserPlus} />Register</Link></li>
              <li><Link to="/login" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faUsers} />Log In</Link></li>
            </>
            :
            <>
              <li className="navbar-item logout-link" onClick={handleLogout}><FontAwesomeIcon className="fa-items-icon" icon={faSignOutAlt} />Log out</li>
              <ToastContainer />
            </>
          }
        </ul>
        
      </div>
      
    </>
  )
}

export default Nav



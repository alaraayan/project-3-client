import React, { useState } from 'react'
import moodflixLogo from '../../assets/images/moodflix-logo.png'
import Hamburger from 'hamburger-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faFilm,faSearch,faUsers,faUserPlus, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'

// function Nav() {
//   const history = useHistory()
//   const location = useLocation()
//   const [isOpen, setIsOpen] = React.useState(false)
//   const isLoggedIn = isAuthenticated()

//   const handleToggle = () => {
//     setIsOpen(!isOpen)
//   }

//   const handleLogout = () => {
//     removeToken()
//     history.push('/')
//   }

//   React.useEffect(() => {
//     setIsOpen(false)
//   }, [location.pathname])

//   return (
//     <nav className="navbar is-dark">
//       <div className="container">
//         <div className="navbar-brand">
//           <Link to="/" className="navbar-item">
//             Take Me Home
//           </Link>
//           <span
//             className={`navbar-burger ${isOpen ? 'is-active' : ''}`}
//             aria-label="menu"
//             aria-expanded="false"
//             onClick={handleToggle}
//           >
//             <span aria-hidden="true"></span>
//             <span aria-hidden="true"></span>
//             <span aria-hidden="true"></span>
//           </span>
//         </div>
//         <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
//           <div className="navbar-start">
//             <Link to="/movies" className="navbar-item">
//               Movies
//             </Link>
//             {isLoggedIn && <Link to="/movies/new" className="navbar-item">
//               Add a Movie
//             </Link>}
//           </div>
//           <div className="navbar-end">
//             <div className="navbar-item">
//               <div className="buttons">
//                 {!isLoggedIn ?
//                   <>
//                     <Link to="/register" className="button is-warning">
//                   Register
//                     </Link>
//                     <Link to="/login" className="button is-warning">
//                   Log In
//                     </Link>
//                   </>
//                   :
//                   <button
//                     className="button is-warning"
//                     onClick={handleLogout}
//                   >
//                   Logout
//                   </button>
//                 }
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Nav


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
      <div className={`navbar ${showColor ? 'navbar_show_color' : 'navbar_default_color'}`}>
        <Link to="/"><img src={moodflixLogo} alt="logo of Moodflix" width="130" /></Link>

        <div className="menu_items_end" onClick={handleSideBar}>
          <Hamburger toggled={sidebarShow} toggle={setSidebarShow} />

        </div>
      </div>
      <div className={sidebarShow ? 'side_nav_menu_container active' : 'side_nav_menu_container'}>
        <ul className="navbar_content_container" onClick={handleSideBar}>
          <li><Link to="/" className="navbar-item" ><FontAwesomeIcon className="fa-items-icon" icon={faHome} />Home</Link></li>
          <li><Link to="/movies" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faFilm} />Movies</Link></li>
          <li><Link to="/movies/search" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faSearch} />Search Movies</Link></li>

          {isLoggedIn && <li><Link to="/movies/new" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faPlus} />New Movie</Link></li>}
          {!isLoggedIn ?
            <>
              <li><Link to="/register" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faUserPlus} />Register</Link></li>
              <li><Link to="/login" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faUsers} />Log In</Link></li>
            </>
            :
            <li className="navbar-item logout-link" onClick={handleLogout}><FontAwesomeIcon className="fa-items-icon" icon={faSignOutAlt} />Log out</li>
          }
        </ul>
      </div>
    </>
  )
}

export default Nav



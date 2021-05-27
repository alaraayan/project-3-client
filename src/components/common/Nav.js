// import React from 'react'
// import { Link, useHistory, useLocation } from 'react-router-dom'
// import { isAuthenticated, removeToken } from '../../lib/auth'

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






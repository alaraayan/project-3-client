import { Link } from 'react-router-dom'
function NotAuthorized() {
  const quotes = [
    [{ movieName: 'Jaws', character: 'Martin Brody', quote: '\'You\'re gonna need a bigger boat\'' }],
    [{ movieName: 'The Wizard of Oz', character: 'Dorothy Gale', quote: '\'Toto, I\'ve got a feeling we\'re not in Kansas anymore\'' }],
    [{ movieName: 'Apollo 13', character: 'Jim Lovell', quote: 'Houston, we have a problem' }],
    [{ movieName: 'Forrest Gump', character: 'Forrest', quote: '\'Mama always said life was like a box of chocolates. You never know what you\'re gonna get\'' }],
    [{ movieName: 'A Few Good Men', character: 'Col. Nathan R. Jessup', quote: '\'You can\'t handle the truth!\'' }],
    [{ movieName: 'Dirty Dancing', character: 'Johnny Castle', quote: '\'Nobody puts Baby in a corner\'' }],
    [{ movieName: 'Se7en (1995)', character: 'Detective David Mills', quote: '\'What\'s on the page?!\'' }],
    [{ movieName: 'Fight Club (1999)', character: 'The Narrator', quote: '\'I am Jack\'s missing page\'' }],
    [{ movieName: 'Star Wars: Episode IV - A New Hope (1977)', character: 'Obi-Wan Kenobi', quote: '\'This is not the webpage you\'re looking for.\'' }]
  ]
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  return (
    <div className="main-container-pagenotfound">
      <div className="main-content-container">
        {randomQuote.map(quoteDetails => {
          return (
            <>
              <div className="quotes-container" key={quoteDetails.movieName}>
                <figure className="quote">
                  <div className="error-container">
                    <h1>401 <br /> ERROR</h1>
                  </div>
                  <div>
                    <blockquote>
                      <p>{quoteDetails.quote}</p>
                    </blockquote>
                  </div>
                </figure>
                <figcaption>
                  <p> &mdash;{quoteDetails.character}, <cite>{quoteDetails.movieName}</cite></p>
                </figcaption>
              </div>
              <p>Unauthorized request! Please <Link className="homepage-link" to="/login">Login</Link> or <Link className="homepage-link" to="/register">Register</Link> in order to proceed. Otherwise, you can head back to the <Link className="homepage-link" to="/">homepage</Link>.</p>
              
            </>
          )
        })}
      </div>
    </div>
  )
}
export default NotAuthorized
import { Link } from 'react-router-dom'
function NotFound() {
  const quotes = [
    [{ moviename: 'Jaws', character: 'Martin Brody', quote: '\'You\'re gonna need a bigger boat\'' }],
    [{ moviename: 'The Wizard of Oz', character: 'Dorothy Gale', quote: '\'Toto, I\'ve got a feeling we\'re not in Kansas anymore\'' }],
    [{ moviename: 'Apollo 13', character: 'Jim Lovell', quote: '\'Houston, we have a problem\'' }],
    [{ moviename: 'Forrest Gump', character: 'Forrest', quote: '\'Mama always said life was like a box of chocolates. You never know what you\'re gonna get\'' }],
    [{ moviename: 'A Few Good Men', character: 'Col. Nathan R. Jessup', quote: '\'You can\'t handle the truth!\'' }],
    [{ moviename: 'Dirty Dancing', character: 'Johnny Castle', quote: '\'Nobody puts Baby in a corner\'' }],
    [{ moviename: 'Se7en (1995)', character: 'Detective David Mills', quote: '\'What\'s on the page?!\'' }],
    [{ moviename: 'Fight Club (1999)', character: 'The Narrator', quote: '\'I am Jack\'s missing page\'' }],
    [{ moviename: 'Star Wars: Episode IV - A New Hope', character: 'Obi-Wan Kenobi', quote: '\'This is not the webpage you\'re looking for.\'' }]
  ]
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  return (
    <div className="main-container-pagenotfound">
      <div className="main-content-container">
        <p className="error-redirect">
          Uh oh! The requested URL was not found on our server. <br/>
          Head back to  
          <Link className="homepage-link" to="/"> moodflix</Link> </p>
        {randomQuote.map(quoteDetails => {
          return (
            <>
              <div className="error-container" key={quoteDetails.moviename}>
                <figure className="quote-container">
                  <div className="error">
                    <h1 className="error-text"><span className="error-code">404</span><br/> error</h1>
                  </div>
                  <blockquote>
                    <p className="quote">{quoteDetails.quote}</p>
                    <p className="quote quote-caption"> &mdash;{quoteDetails.character}, <cite>{quoteDetails.moviename}</cite></p>
                  </blockquote>
                </figure>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}
export default NotFound

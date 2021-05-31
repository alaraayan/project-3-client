import { Link } from 'react-router-dom'

function NotAuthorized() {
  const quotes = [
    [{ moviename: 'Jaws', character: 'Martin Brody', quote: `'You're gonna need a bigger boat'` }],
    [{ moviename: 'The Wizard of Oz', character: 'Dorothy Gale', quote: `'Toto, I've got a feeling we're not in Kansas anymore'` }],
    [{ moviename: 'Apollo 13', character: 'Jim Lovell', quote: 'Houston, we have a problem' }],
    [{ moviename: 'Forrest Gump', character: 'Forrest', quote: `'Mama always said life was like a box of chocolates. You never know what you're gonna get'` }],
    [{ moviename: 'A Few Good Men', character: 'Col. Nathan R. Jessup', quote: `'You can't handle the truth!'` }],
    [{ moviename: 'Dirty Dancing', character: 'Johnny Castle', quote: `'Nobody puts Baby in a corner'` }],
    [{ moviename: 'Se7en (1995)', character: 'Detective David Mills', quote: `'What's on the page?!'` }],
    [{ moviename: 'Fight Club (1999)', character: 'The Narrator', quote: `'I am Jack's missing page'` }],
    [{ moviename: 'Star Wars: Episode IV - A New Hope (1977)', character: 'Obi-Wan', quote: `'This is not the webpage you're looking for.'` }]
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]




  return (
    <div className="main-container-pagenotfound">
      <div className="main-content-container">
        <p>unauthorized request! please register in order to perform the action. Go to the <Link className="homepage-link" to="/">homepage »</Link> </p>
        <p>or register here :  <Link className="homepage-link" to="/register">Register »</Link></p>
        {randomQuote.map(quoteDetails => {
          return (
            <>
              <div className="quotes-container" key={quoteDetails.moviename}>
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
                  <p> &mdash;{quoteDetails.character}, <cite>{quoteDetails.moviename}</cite></p>
                </figcaption>
              </div>

            </>
          )
        })}
      </div>

    </div>
  )
}

export default NotAuthorized

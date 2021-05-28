import MoviesIndex from './movie/MoviesIndex'
import Hero from './Hero'

function Home() {
  return (
    <>
      <section className="home-test">
        
        <h1>
              MOODFLIX - NAV BAR GOES HERE
        </h1>
          
      </section>
      <section>
        <Hero />
        <MoviesIndex />
      </section>
    </>
  )
}

export default Home

import Hero from './Hero'
import UpliftingMovieGallery from './movie/UpliftingMovieGallery'
import DarkMovieGallery from './movie/DarkMovieGallery'
import EasyMovieGallery from './movie/EasyMovieGallery'
import AdventurousMovieGallery from './movie/AdventurousMovieGallery'
import LolMovieGallery from './movie/LolMovieGallery'


function Home() {
  return (
    <>
      <section>
        <Hero />
        <UpliftingMovieGallery />
        <DarkMovieGallery />
        <EasyMovieGallery />
        <AdventurousMovieGallery />
        <LolMovieGallery />
      </section>
    </>
  )
}

export default Home
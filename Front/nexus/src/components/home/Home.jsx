import React from 'react'
import MainHeader from '../layout/MainHeader'
import TileService from '../common/TileService'
import Parallax from '../common/Parallax'
import TileCarousel from '../common/TileCarousel'

const Home = () => {
  return (
    <section>
        <MainHeader/>
        <section className="container">
          <TileCarousel/>
          <Parallax/>
          <TileCarousel/>
          <TileService/>
          <Parallax/>
          <TileCarousel/>

        </section>
    </section>
  )
}

export default Home

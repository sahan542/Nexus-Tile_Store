import React from 'react'
import MainHeader from '../layout/MainHeader'
import TileService from '../common/TileService'
import Parallax from '../common/Parallax'
import TileCarousel from '../common/TileCarousel'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation()
  const message = location.state && location.state.message
  const currentUser = localStorage.getItem("userId")
  return (
    <section>
      {message && <p className='text-warning px-5'>{message}</p>}
      {currentUser && <h6 className='text-success text-center'> You are logged in {currentUser}</h6>}
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

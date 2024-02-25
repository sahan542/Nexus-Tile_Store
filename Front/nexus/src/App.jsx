import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddTile from './components/tile/AddTile'
import ExistingTiles from './components/tile/ExistingTiles.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home.jsx'
import EditTile from './components/tile/EditTile.jsx'
import Footer from './components/layout/Footer.jsx'
import NavBar from './components/layout/NavBar.jsx'
import TileListing from './components/tile/TileListing.jsx'



function App() {

  return (
    <>
      <main>
        <Router>
          <NavBar/>
            <Routes>
              <Route  path="/" element={<Home/>} />
              <Route  path="/edit-tile/:tileId" element={<EditTile/>} />
              <Route  path="/add-tiles" element={<AddTile/>} />
              <Route  path="/existing-tiles" element={<ExistingTiles/>} />
              <Route  path="/browse-all-tiles" element={<TileListing/>} />
            </Routes>
        </Router>
        <Footer/>

      </main>
    </>
  )
}

export default App




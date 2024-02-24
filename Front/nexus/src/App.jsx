import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddTile from './components/tile/AddTile'
import ExistingTiles from './components/tile/ExistingTiles.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home.jsx'
import EditTile from './components/tile/EditTile.jsx'



function App() {

  return (
    <>
      <main>
        <Router>
          <Routes>
            <Route  path="/" element={<Home/>} />
            <Route  path="/edit-tile/:tileId" element={<EditTile/>} />
            <Route  path="/add-tiles" element={<AddTile/>} />
            <Route  path="/existing-tiles" element={<ExistingTiles/>} />
          </Routes>
        </Router>
      </main>
    </>
  )
}

export default App




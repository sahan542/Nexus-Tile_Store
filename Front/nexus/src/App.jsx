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
import Admin from './components/admin/Admin.jsx'
import Checkout from './components/bookings/Checkout.jsx'
import BookingForm from './components/bookings/BookingForm.jsx'
import BookingSuccess from './components/bookings/BookingSuccess.jsx'
import Bookings from './components/bookings/Bookings.jsx'
import FindBooking from './components/bookings/FindBooking.jsx'
import Login from './components/auth/Login.jsx'
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile.jsx'
import Logout from './components/auth/Logout.jsx'
import AuthProvider from './components/auth/AuthProvider.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'




function App() {

  return (
    <AuthProvider>
      <main>
        <Router>
          <NavBar/>
            <Routes>
              <Route  path="/" element={<Home/>} />
              <Route  path="/edit-tile/:tileId" element={<EditTile/>} />
              <Route  path="/add-tiles" element={<AddTile/>} />
              <Route  path="/existing-tiles" element={<ExistingTiles/>} />
              <Route  path="/browse-all-tiles" element={<TileListing/>} />
              <Route  path="/book-tile/:tileId" element={
                <RequireAuth>
                       <Checkout/>
                </RequireAuth>
                                 } />
              <Route  path="/admin" element={<Admin/>} />
              <Route  path="/booking-success" element={<BookingSuccess/>} />
              <Route  path="/existing-bookings" element={<Bookings/>} />
              <Route  path="/find-booking" element={<FindBooking/>} />
              <Route  path="/login" element={<Login/>} />
              <Route  path="/register" element={<Registration/>} />
              <Route  path="/profile" element={<Profile/>} />
              <Route  path="/logout" element={<Logout/>} />
        
            </Routes>
        </Router>
        <Footer/>

      </main>
    </AuthProvider>
  )
}

export default App




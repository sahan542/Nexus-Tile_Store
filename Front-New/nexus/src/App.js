import React from 'react'
import Home from './components/home/Home';
import EditTile from './components/tile/EditTile';
import BookingSuccess from './components/bookings/BookingSuccess';
import AddTile from './components/tile/AddTile';
import ExistingTiles from './components/tile/ExistingTiles';
import TileListing from './components/tile/TileListing';
import RequireAuth from './components/auth/RequireAuth';
import Checkout from './components/bookings/Checkout';
import Admin from './components/admin/Admin';
import Bookings from './components/bookings/Bookings';
import FindBooking from './components/bookings/FindBooking';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile';
import Logout from './components/auth/Logout';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import AuthProvider from './components/auth/AuthProvider';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"


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
  );
}

export default App;

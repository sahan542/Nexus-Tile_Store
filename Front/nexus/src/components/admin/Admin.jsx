import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className="container mt-5">
        <h2>Welcome to Admin Panel</h2>
        <hr/>
        <Link to={"/add-tiles"}>
            Manage Tiles
        </Link>
      
    </section>
  )
}

export default Admin

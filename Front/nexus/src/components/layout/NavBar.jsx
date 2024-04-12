import React, { useContext, useState } from 'react'
import { NavLink } from "react-router-dom"
import {Link} from "react-router-dom"
import { AuthContext } from '../auth/AuthProvider'
import Logout from '../auth/Logout'

const NavBar = () => {
	const[showAccount, setShowAccount] = useState(false)
	const { user } = useContext(AuthContext)

	const handleAccountClick = () => {
		setShowAccount(!showAccount)
	}

	const isLoggedIn = user !== null
	const userRole = localStorage.getItem("userRole")


  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
			<div className="container-fluid">
				<Link to={"/"} className="navbar-brand">
					<span className="hotel-color">Nexus Tiles</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						<li className="nav-item">
							<NavLink to={"/browse-all-tiles"} className="nav-link" aria-current="page" >
								Browse all Tiles
							</NavLink>
						</li>


						

		{isLoggedIn && userRole === "ROLE_ADMIN" && (
			<li className="nav-item">
				<NavLink to={"/admin"} className="nav-link" aria-current="page">
					Admin
				</NavLink>
			</li>
			
		)}

						
					</ul>

					<ul className="d-flex navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link" to={"/find-booking"}>
								Find my booking
							</NavLink>
						</li>

						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								>
								{" "}
								Account
							</a>

							<ul
								className={`dropdown-menu ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown">
								{isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
							</ul>

							
						</li>
					</ul>
				</div>
			</div>
		</nav>
  )
}

export default NavBar

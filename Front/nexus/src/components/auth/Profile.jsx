import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteUser, getBookingsByUserrId, getUser, getUserProfile } from '../utils/ApiFunctions';

const Profile = () => {
    const[errorMessage, setErrorMessage] = useState("");
    const[message, setMessage] = useState("");

    const[user, setUser] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        roles: [{id: "", name: ""}]
    })

    const[bookings, setBookings] = ([
        {
        id:"",
        tile: {id:"", collectionType:"", groupType:""},
        bookingConfirmationCode: "",
        tileId: "",
        }
    ])
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const userData = await getUser(userId, token)
                setUser(userData)
            }
            catch(error){
                console.error(error)
            }
        }
        fetchUser()
    }, [userId])

    useEffect(() => {
        const fetchBookings = async () => {
            try{
                const response = await getBookingsByUserrId(userId, token)
                setBookings(response)
            }
            catch(error){
                console.error("Error fetching bookings:", error.message)
                setErrorMessage(error.message)
            }
        }
        fetchBookings()
    }, [userId])

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? this action cannot be undone. "
        )
        if(confirmed) {
            await deleteUser(userId)
                .then((response) => {
                    setMessage(response.data)
                    localStorage.removeItem("token")
                    localStorage.removeItem("userId")
                    localStorage.removeItem("userRole")
                    navigate("/")
                    window.location.reload()
                })
                .catch((error) => {
                    setErrorMessage(error.data)
                })
        }
    }

  return (
    <div className='container'>
        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
        {message && <p className='text-danger'>{message}</p>}
        {user ? (
            <div className='card p-5 mt-5' style={{ backgroundColor: "whitesmoke" }}>
                <h4 className='card-title tex-center'>User Information</h4>
                <div className='card-body'>
                    <div className='card mb-3 shadow'>
                        <div className='row g-0'>
                            <div className='col-md-2'>
                                <div className="d-flex justify-content-center align-items-center mb-4">
                                <img
												src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
												alt="Profile"
												className="rounded-circle"
												style={{ width: "150px", height: "150px", objectFit: "cover" }}
											/>

                                </div>

                            </div>

                            <div className="col-md-10">
										<div className="card-body">
											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">ID:</label>
												<div className="col-md-10">
													<p className="card-text">{user.id}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">First Name:</label>
												<div className="col-md-10">
													<p className="card-text">{user.firstName}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Last Name:</label>
												<div className="col-md-10">
													<p className="card-text">{user.lastName}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Email:</label>
												<div className="col-md-10">
													<p className="card-text">{user.email}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Roles:</label>
												<div className="col-md-10">
													<ul className="list-unstyled">
														{user.roles.map((role) => (
															<li key={role.id} className="card-text">
																{role.name}
															</li>
														))}
													</ul>
												</div>
											</div>
										</div>
							</div>
                        </div>

                    </div>

                    <h4 className="card-title text-center">Booking History</h4>

							{bookings.length > 0 ? (
								<table className="table table-bordered table-hover shadow">
									<thead>
										<tr>
											<th scope="col">Booking ID</th>
											<th scope="col">Tile ID</th>
											<th scope="col">Collection Type</th>
											<th scope="col">Group Type</th>
											<th scope="col">Confirmation Code</th>
										
										</tr>
									</thead>
									<tbody>
										{bookings.map((booking, index) => (
											<tr key={index}>
												<td>{booking.id}</td>
												<td>{booking.tile.id}</td>
												<td>{bookings.tile.collectionType}</td>
												<td>{bookings.tile.groupType}</td>
												<td>{bookings.bookingConfirmationCode}</td>
												
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<p>You have not made any bookings yet.</p>
							)}

							<div className="d-flex justify-content-center">
								<div className="mx-2">
									<button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
										Close account
									</button>
								</div>
							</div>
						</div>
					</div>
				
			) : (
				<p>Loading user data...</p>
			)}
		</div>
	)
}

export default Profile
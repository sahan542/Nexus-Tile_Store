import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getBookingsByUserrId, getUser } from '../utils/ApiFunctions';

const Profile = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState({
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        roles: [{ id: '', name: '' }]
    });
    const [bookings, setBookings] = useState([]);

    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(userId, token);
                setUser(userData);
                localStorage.setItem('email', userData.email);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByUserrId(email);
                setBookings(response);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
                setErrorMessage(error.message);
            }
        };
        fetchBookings();
    }, [email]);

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete your account? This action cannot be undone.'
        );
        if (confirmed) {
            try {
                await deleteUser(userId);
                setMessage('Account deleted successfully.');
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('userRole');
                navigate('/');
                window.location.reload();
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <div className="container">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {message && <p className="text-success">{message}</p>}
            {user.id ? (
                <div className="card p-5 mt-5" style={{ backgroundColor: 'whitesmoke' }}>
                    <h4 className="card-title text-center mb-4">User Information</h4>
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
            ) : (
                <p>Loading user data...</p>
            )}
            <h4 className="card-title text-center mt-5">Booking History</h4>
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
                                <td>{booking.tile.collectionType}</td>
                                <td>{booking.tile.groupType}</td>
                                <td>{booking.bookingConfirmationCode}</td>
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
    );
};

export default Profile;

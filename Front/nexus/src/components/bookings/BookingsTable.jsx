import React, { useEffect, useState } from 'react'
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions'
import { Col, Row } from 'react-bootstrap'
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const BookingsTable = () => {
    const[bookingInfo, setBookingInfo] = useState([{
        id: "",
        tile: {id:"", collectionType:"", groupType:""},
        cusName: "",
        cusEmail: "",
        cusAddress: "",
        cusPhone: "",
        bookingConfirmationCode: ""
    }])
    const[filteredBookings, setFilteredBookings] = useState([{
        id: "",
        tile: {id:"", collectionType:"", groupType:""},
        cusName: "",
        cusEmail: "",
        cusAddress: "",
        cusPhone: "",
        bookingConfirmationCode: ""
    }])
    const[currentPage, setCurrentPage] = useState(1)
    const[bookingsPerPage] = useState(15)
    const[isLoading, setIsLoading] = useState(false)
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchBookings()
    }, [])

    const fetchBookings =async() =>{
        setIsLoading(true)
        try{
            const result = await getAllBookings()
            setBookingInfo(result)
            setIsLoading(false)
        }
        catch(error){
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    const handlePaginationClick = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    const handleDelete = async (bookingId) => {
        try{
            const result = await cancelBooking(bookingId)
            if(result === ""){
                setSuccessMessage(`Booking No ${bookingId} was deleted`)
                fetchBookings()
            }
            else{
                console.error(`Error Deleting Booking : ${result.message}`)
            }
        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const calculateTotalPages = (bookingsPerPage, bookingInfo) => {
        if(bookingInfo.length > 0){
            const totalBookings = bookingInfo.length
            return Math.ceil(totalBookings/bookingsPerPage)
        }   
    }

    const indexOfLastBooking = currentPage * bookingsPerPage
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage
    const currentBookings = bookingInfo.slice(indexOfFirstBooking, indexOfLastBooking)

  return (
    <>
    <div className="container col-md-8 col-lg-6">
				{successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

				{errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
			</div>

    {isLoading ? (
        <p>Loading Existing Bookings</p>
    ):(
        <>
        <section className='mt-5 mb-5 container'>
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Existing Bookings</h2>

            </div>
				
            <table className="table table-borederd table-hover">
                <thead>
                    <tr className="text-center">
                        <th>S/N</th>
                        <th>Booking_ID</th>
                        <th>Tile_ID</th>
                        <th>Collection_TYpe</th>
                        <th>Group_Type</th>
                        <th>Cus_Name</th>
                        <th>Cus_Email</th>
                        <th>Cus_Address</th>
                        <th>Cus_Phone</th>
                        <th>Confirmation_Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBookings.map((booking, index)=>(
                        <tr key={booking.id} className='text-center'>
                            <td>{index + 1}</td>
                            <td>{booking.id}</td>
                            <td>{booking.tile.id}</td>
                            <td>{booking.tile.collectionType}</td>
                            <td>{booking.tile.groupType}</td>
                            <td>{booking.cusName}</td>
                            <td>{booking.cusEmail}</td>
                            <td>{booking.cusAddress}</td>
                            <td>{booking.cusPhone}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td className="gap-2">            
											<button
												className="btn btn-danger btn-sm ml-5"
												onClick={() => handleDelete(booking.id)}>
												<FaTrashAlt />
											</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            

        </section>
        </>

    )}
      
    </>
   
  )
}

export default BookingsTable

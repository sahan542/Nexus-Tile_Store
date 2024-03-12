import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'

const FindBooking = () => {
    const[confirmationCode, setConfirmationCode] = useState("")
    const[error, setError] = useState("")
    const[isLoading, setIsLoading] = useState(false)
    const[bookingInfo, setBookingInfo] = useState({
        id:"",
        tile: {id:""},
        bookingConfirmationCode: "",
        tileId: "",
        cusName: "",
        cusEmail: "",
        cusAddress: "",
        cusPhone: ""
    })

    const[isDeleted, setIsDeleted] = useState(false)

    const clearBookingInfo = {
        id:"",
        tile: {id:""},
        bookingConfirmationCode: "",
        tileId: "",
        cusName: "",
        cusEmail: "",
        cusAddress: "",
        cusPhone: ""

    }

    const handleInputChange = (e) =>{
        setConfirmationCode(e.target.value)
    }

    const handleFormSubmit = async(e) =>{
        e.preventDefault()
        setIsLoading(true)
        try{
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)

        }
        catch(error){
            setBookingInfo(clearBookingInfo)
            if(error.response && error.response.status === 404){
                setError(error.response.data.message)
            }
            else{
                setError(error.response)
            }

        }
        setTimeout(() =>{
            setIsLoading(false)
        }, 2000)
    }

    const handleBookingCancellation = async(bookingId) =>{
        try{
            await cancelBooking(bookingInfo.id)
            setIsDeleted(true)
            setBookingInfo(clearBookingInfo)
            setConfirmationCode("")
            setError("")
        }
        catch(error){
            setError(error.message)


        }

    }
  return (
    <>
        <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
            <h2>Find My Booking</h2>
            <form onSubmit={handleFormSubmit} className="col-md-6">
                <div className="input-group mb-3">
                    <input className="form-control" id='confirmationCode' name='confirmationCode'
                    value={confirmationCode} onChange={handleInputChange} placeholder="Enter the Booking Confirmation Code"/>

                    <button className="btn btn-hotel input-group-text">Find Booking</button>

                   

                </div>

            </form>

            {isLoading ? ( <div>Finding Your Booking</div>): error ? (<div className="text-danger">{error}</div>
            
            ): bookingInfo.bookingConfirmationCode ? (
                <div className="col-md-6 mt-4 mb-5">
                    <h3>Booking Information</h3>
                    <p>Booking ConfirmationCode : {bookingInfo.bookingConfirmationCode}</p>
                    <p>Booking ID : {bookingInfo.id} </p>
                    <p>Tile ID : {bookingInfo.tile.id} </p>
                    <p>Customer Name : {bookingInfo.cusName} </p>
                    <p>Customer Email : {bookingInfo.cusEmail} </p>
                    <p>Customer Address : {bookingInfo.cusAddress} </p>
                    <p>Customer Contact Number : {bookingInfo.cusPhone} </p>

                    {!isDeleted && (
                        <button className="btn btn-danger" onClick={()=> handleBookingCancellation(bookingInfo.id)}>Cancel Booking</button>
                    )}
                   
                    


                </div>
            ): (
                <div>
                    Find Booking ....
                </div>
            )}

            {isDeleted && (
                <div className="alert alert-success mt-3" role="alert"> Booking has benn cancelled succcessfully!</div>
            )}

        </div>
    </>
  )
}

export default FindBooking

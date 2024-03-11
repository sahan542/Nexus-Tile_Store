import React, { useState } from 'react'

const BookingsTable = ({bookingInfo, handleBookingCancellation}) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

  return (
    <section className="p-4">
        <table>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Booking_ID</th>
                    <th>Tile_ID</th>
                    <th>Cus_Name</th>
                    <th>Cus_Email</th>
                    <th>Cus_Address</th>
                    <th>Cus_Phone</th>
                    <th>Confirmation_Code</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody className="text-center">
                <tr key={booking.id}>
                    <th>{index + 1}</th>
                    <th>{booking.id}</th>
                    <th>{booking.tile.id}</th>
                    <th>{booking.cusName}</th>
                    <th>{booking.cusEmail}</th>
                    <th>{booking.cusAddress}</th>
                    <th>{booking.cusPhone}</th>
                    <th>{booking.ConfirmationCode}</th>
                </tr>
            </tbody >
        </table>
      
    </section>
  )
}

export default BookingsTable

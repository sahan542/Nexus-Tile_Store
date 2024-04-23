import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { bookTile, getTileById } from '../utils/ApiFunctions';

const BookingSummary = ({ booking, payment, isFormValid, tileId }) => {
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState("");
    const navigate = useNavigate();
    console.log("Booking code: ", tileId);

    const handleConfirmBooking = async () => {
        console.log(booking);
        console.log(tileId);
        try {
            const confirmationCode = await bookTile(tileId, booking);
            console.log(confirmationCode);
            setConfirmationCode(confirmationCode);
            setIsProcessingPayment(true);
            navigate("/booking-success", { state: { confirmationCode: confirmationCode } });
        } catch (error) {
            // Use the current state value of errorMessage
            navigate("/booking-success", { state: { error: error } });
            console.log(error)
        }
        
    };

    
    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success", { state: { message: "Booking confirmed successfully!" } });
        }
    }, [isBookingConfirmed, navigate]);

    return (
        <div className='card card-body mt-5'>
            <h4>Reservation Summary</h4>
            <p>Full Name : <strong>{booking.cusName}</strong></p>
            <p>Email : <strong>{booking.cusEmail}</strong></p>
            <p>Phone Number : <strong>{booking.cusPhone}</strong></p>
            <p>Address : <strong>{booking.cusAddress}</strong></p>
            {payment > 0 ? (
                <>
                    <p>Total Payment : <strong>${payment}</strong></p>
                    {isFormValid && !isBookingConfirmed ? (
                        <Button variant='success' onClick={handleConfirmBooking}>
                            {isProcessingPayment ? (
                                <>
                                    <span className="spinner-border spinner-border-sm mr-2" role='status' aria-hidden="true"></span>
                                    Booking Confirmed, redirecting to payment ....
                                </>
                            ) : (
                                "Confirm Booking and proceed to payment"
                            )}
                        </Button>
                    ) : isBookingConfirmed ? (
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='spinner-border text-primary' role="status">
                                <span className='sr-only'>Loading</span>
                            </div>
                        </div>
                    ) : null}
                </>
            ) : (
                <p className='text-danger'>Last P tag shows this</p>
            )}
        </div>
    );
};

export default BookingSummary;
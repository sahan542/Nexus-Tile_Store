import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(true);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const navigate = useNavigate();

    const handleConfirmBooking = async () => {
        setIsProcessingPayment(true);
        try {
            await onConfirm(); // Assuming onConfirm handles booking submission
            setIsBookingConfirmed(true);
        } catch (error) {
            console.error("Error confirming booking:", error);
            // Handle error as needed
        } finally {
            setIsProcessingPayment(false);
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
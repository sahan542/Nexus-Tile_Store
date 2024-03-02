
/*
import React, { useEffect, useState } from 'react'
import { bookTile, getTileById } from '../utils/ApiFunctions'
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import BookingSummary from './BookingSummary';

const BookingForm = () => {
    const[isValidated, setIsValidated] = useState(false)
    const[isSubmitted, setIsSubmitted] = useState(false)
    const[errorMessage, setErrorMessage] = useState("")
    const[tilePrice, setTilePrice] = useState(0)
    const[booking, setBooking] = useState({
        cusName: "",
        cusEmail: "",
        bookingDate: "",
        cusAddress: "",
        cusPhone: "",
        bookingConfirmationCode: ""
    })


    const[tileInfo, setTileInfo] = useState({
        photo: "",
        collectionType: "",
        groupType: "",
        price: "",
        color: "",
        size: "",
        finishingType: ""       
    })

    const{ tileId } = useParams()

    const navigate = useNavigate()
    
    const handleInputChange = (e) =>{
        const{name, value} = e.target 
        setBooking({...booking, [name]: value})
        setErrorMessage("")
    }

    const getTilePriceById = async(tileId) =>{
        try{
            const response = await getTileById(tileId)
            setTilePrice(response.tilePrice)
        }
        catch(error){
            throw new Error(error)

        }
    }

    useEffect(() =>{
        getTilePriceById(tileId)
    }, [tileId])

    const calculatePayment = ()=>{
        const totalPrice = tilePrice ? tilePrice : 0
        return totalPrice
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const form = e.currentTarget 
        if(form.checkValidity() === true){
        setIsSubmitted(true)
        setIsValidated(true)
        }
    }

    const handleBooking = async() =>{
        try{
            const confirmationCode = await bookTile(tileId, booking)
            setIsSubmitted(true)
            navigate("/", {state:{message : confirmationCode}})


        }
        catch(error){
            setErrorMessage(error.message)
            navigate("/", {state:{error : errorMessage}})
        }
    }

  return (
    <>
    <div className='container mb-5'>
            <div className="row">
                <div className='col-md-6'>
                    <div className="card card-body mt-5">
                        <h4 className="card card-title">Reserve Tile Design</h4>
                        <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="cusName">Full Name :</Form.Label>
                            <FormControl required type="text" id="cusName" name="cusName" value={booking.cusName} placeholder="Enter your full name" onChange={handleInputChange}/>
                            <Form.Control.Feedback type="invalid">
                                    Please Enter your Full Name
                            </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group>
                                <Form.Label htmlFor="cusEmail">Email Address :</Form.Label>
                            <FormControl required type="text" id="cusEmail" name="cusEmail" value={booking.cusEmail} placeholder="Enter your your Email Address" onChange={handleInputChange}/>
                            <Form.Control.Feedback type="invalid">
                                    Please Enter your Email Address
                            </Form.Control.Feedback>
                            </Form.Group>

                            <fieldset style={{border: "2px"}}>
                                <legend>Lodging Period</legend>
                                <div className="row">
                                    <div className="col-6">

                                    <Form.Label htmlFor="bookingDate">Full Name :</Form.Label>
                            <FormControl required type="date" id="bookingDate" name="bookingDate" value={booking.bookingDate} placeholder="Booking Date" onChange={handleInputChange}/>
                            <Form.Control.Feedback type="invalid">
                                    Select a booking Date 
                            </Form.Control.Feedback>


                                    </div>
                                </div>
                            </fieldset>


                            <Form.Group>
                                <Form.Label htmlFor="cusAddress">Address :</Form.Label>
                            <FormControl required type="text" id="cusAddress" name="cusAddress" value={booking.cusAddress} placeholder="Enter your Address" onChange={handleInputChange}/>
                            <Form.Control.Feedback type="invalid">
                                    Please Enter your Address
                            </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group>
                                <Form.Label htmlFor="cusPhone">Full Name :</Form.Label>
                            <FormControl required type="text" id="cusPhone" name="cusPhone" value={booking.cusPhone} placeholder="Enter your phone Number" onChange={handleInputChange}/>
                            <Form.Control.Feedback type="invalid">
                                    Please Enter your Phone Number
                            </Form.Control.Feedback>
                            </Form.Group>

                            <div className="form-group mt-2 mb-2">
                                <button className="btn btn-hotel" type="submit">
                                    Continue
                                </button>
                            </div>

                            

                        </Form>
                    </div>

                </div>
                <div className="col-md-6">
                    {isSubmitted && (
                        <BookingSummary booking={booking} payment={calculatePayment} isFormValid={isValidated} onConfirm={handleBooking}/>
                    )}
                </div>
            </div>
    </div>
    
    </>

  )
}

export default BookingForm


import React, { useEffect, useState } from 'react';
import { bookTile, getTileById } from '../utils/ApiFunctions';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import BookingSummary from './BookingSummary';

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [tilePrice, setTilePrice] = useState(0);
    const [booking, setBooking] = useState({
        cusName: "",
        cusEmail: "",
        bookingDate: "",
        cusAddress: "",
        cusPhone: "",
        bookingConfirmationCode: ""
    });

    const { tileId } = useParams();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    };

    const getTilePriceById = async (tileId) => {
        try {
            const response = await getTileById(tileId);
            setTilePrice(response.tilePrice);
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        getTilePriceById(tileId);
    }, [tileId]);

    const calculatePayment = () => {
        
        return 800;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            setIsSubmitted(true);
            setIsValidated(true);
            form.classList.add('was-validated'); // Mark form fields as validated
        }
    };

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookTile(tileId, booking);
            setIsSubmitted(true);
            navigate("/", { state: { message: confirmationCode } });
        } catch (error) {
            // Set the error message directly from the error object
            setErrorMessage(error.message);
            // Use the current state value of errorMessage
            navigate("/", { state: { error: error.message } });
        }
    };

    return (
        <div className='container mb-5'>
            <div className="row">
                <div className='col-md-6'>
                    <div className="card card-body mt-5">
                        <h4 className="card card-title">Reserve Tile Design</h4>
                        <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                            
                                <Form.Group>
                                <Form.Label htmlFor="cusName">Full Name :</Form.Label>
                            <FormControl required type="text" id="cusName" name="cusName" value={booking.cusName} placeholder="Enter your full name" onChange={handleInputChange}/>
                            <Form.Control.Feedback type="invalid">
                                    Please Enter your Full Name
                            </Form.Control.Feedback>
                            </Form.Group>
                            


                            <Form.Group>
                                <Form.Label htmlFor="cusEmail">Email Address :</Form.Label>
                            <FormControl required type="text" id="cusEmail" name="cusEmail" value={booking.cusEmail} placeholder="Enter your your Email Address" onChange={handleInputChange}/>
                            <Form.Control.Feedback type="invalid">
                                    Please Enter your Email Address
                            </Form.Control.Feedback>
                            </Form.Group>

                            <fieldset style={{border: "2px"}}>
                                <legend>Lodging Period</legend>
                            </fieldset>


                            <Form.Group>
                                <Form.Label htmlFor="cusAddress">Address :</Form.Label>
                            <FormControl required type="text" id="cusAddress" name="cusAddress" value={booking.cusAddress} placeholder="Enter your Address" onChange={handleInputChange}/>
                            <Form.Control.Feedback type="invalid">
                                    Please Enter your Address
                            </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group>
                                <Form.Label htmlFor="cusPhone">PhoneNumber :</Form.Label>
                            <FormControl required type="text" id="cusPhone" name="cusPhone" value={booking.cusPhone} placeholder="Enter your phone Number" onChange={handleInputChange}/>
                            <Form.Control.Feedback type="invalid">
                                    Please Enter your Phone Number
                            </Form.Control.Feedback>
                            </Form.Group>

                            <div className="form-group mt-2 mb-2">
                                <button className="btn btn-hotel" type="submit">
                                    Continue
                                </button>
                            </div>
                            
                        </Form>
                    </div>
                </div>
                <div className="col-md-6">
                    {isSubmitted && (
                        <BookingSummary booking={booking} payment={calculatePayment()} isFormValid={isValidated} onConfirm={handleBooking} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
*/


import React, { useEffect, useState } from 'react';
import { bookTile, getTileById } from '../utils/ApiFunctions';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import BookingSummary from './BookingSummary';

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [tilePrice, setTilePrice] = useState(0);
    const [booking, setBooking] = useState({
        cusName: "",
        cusEmail: "",
        bookingDate: "",
        cusAddress: "",
        cusPhone: "",
        bookingConfirmationCode: ""
    });

    const { tileId } = useParams();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    };

    const [tileInfo, setTileInfo] = useState({
        photo: "",
        collectionType: "",
        groupType: "",
        price: "",
        color: "",
        size: "",
        finishingType: ""

    })

    const getTilePriceById = async (tileId) => {
        try {
            const response = await getTileById(tileId);
            setTilePrice(response.tilePrice);
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        getTilePriceById(tileId);
    }, [tileId]);

    const calculatePayment = () => {
        // You can calculate payment based on the tile price or any other criteria
        return 800;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation()
        }
        else{
            setIsSubmitted(true)
        }
        setIsValidated(true)
    };

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookTile(tileId, booking);
            setIsSubmitted(true);
            navigate("/", { state: { message: confirmationCode } });
        } catch (error) {
            // Set the error message directly from the error object
            setErrorMessage(error.message);
            // Use the current state value of errorMessage
            navigate("/", { state: { error: errorMessage } });
        }
    };

    return (
        <div className='container mb-5'>
            <div className="row">
                <div className='col-md-6'>
                    <div className="card card-body mt-5">
                        <h4 className="card card-title">Reserve Tile Design</h4>
                        <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="cusName">Full Name:</Form.Label>
                                <FormControl required type="text" id="cusName" name="cusName" value={booking.cusName} placeholder="Enter your full name" onChange={handleInputChange} />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter your Full Name
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="cusEmail">Email Address:</Form.Label>
                                <FormControl required type="email" id="cusEmail" name="cusEmail" value={booking.cusEmail} placeholder="Enter your email address" onChange={handleInputChange} />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter a valid Email Address
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="cusAddress">Address:</Form.Label>
                                <FormControl required type="text" id="cusAddress" name="cusAddress" value={booking.cusAddress} placeholder="Enter your address" onChange={handleInputChange} />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter your Address
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="cusPhone">Phone Number:</Form.Label>
                                <FormControl required type="text" id="cusPhone" name="cusPhone" value={booking.cusPhone} placeholder="Enter your phone number" onChange={handleInputChange} />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter your Phone Number
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="form-group mt-2 mb-2">
                                <button className="btn btn-hotel" type="submit">
                                    Continue
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="col-md-6">
                    {isSubmitted && (
                        <BookingSummary booking={booking} payment={calculatePayment()} isFormValid={isValidated} onConfirm={handleBooking} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
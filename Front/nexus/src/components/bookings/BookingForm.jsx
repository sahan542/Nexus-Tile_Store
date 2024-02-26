import React, { useEffect, useState } from 'react'
import { bookTile, getTileById } from '../utils/ApiFunctions'
import { useNavigate, useParams } from 'react-router-dom';

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
    <div>BookingForm</div>
  )
}

export default BookingForm
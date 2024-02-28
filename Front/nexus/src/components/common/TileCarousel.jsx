import React, { useEffect, useState } from 'react'
import { getAllTiles } from '../utils/ApiFunctions'
import { Link } from "react-router-dom"
import { Card, Carousel, Col, Container, Row} from "react-bootstrap"

const TileCarousel = () => {
    const[tiles,setTiles] = useState([{id :"", collectionType: "", 
                                groupType: "", price: "", color: "", size: "", 
                                finishingType: "", photo: ""}])
    const[errorMessage, setErrorMessage] = useState("")
    const[isLoading, setIsLoading] = useState(false)

    useEffect(() =>{
        setIsLoading(true)
        getAllTiles().then((data)=>{
            setTiles(data)
            setIsLoading(false)
        }).catch((error)=>{
            setErrorMessage(error.message)
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <div className='mt-5'>Loading Tile Designs...</div>
    }
    if(errorMessage){
        return <div className='text-danger mb-5 mt-5'>Error : {errorMessage}</div>
    }
  return (
    <section className="bg-light mb-5 mt-5 shadow">
        <Link className="hotel-color text-center" to={"/browse-all-tiles"}>
            Browse All Tiles
        </Link>

        <Container>
            <Carousel indicators={false}>
                {[...Array(Math.ceil(tiles.length / 4))].map((_, index)=>(
                    <Carousel.Item key={index}>
                        <Row>
                            {tiles.slice(index *4, index*4 + 4).map((tile)=>(
                                <Col key={tile.id} className="mb-4" xs={12} md={6} lg={3}>
                                    <Card>
                                        <Link to={`/book-tile/${tile.id}`}>
                                            <Card.Img
                                              variant="top"
                                              src={`data:image/png;base64, ${tile.photo}`}
                                              alt="Tile Photo"
                                              className="w-100"
                                              style={{height: "200px"}}  />  
                                        </Link>
                                        <Card.Body>
                                            <Card.Title className="hotel-color">{tile.collectionType}</Card.Title>
                                            <Card.Title className="hotel-color">{tile.groupType}</Card.Title>
                                            <Card.Title className="tile-price">{tile.price}</Card.Title>
                                            <Card.Title className="tile-color">{tile.color}</Card.Title>
                                            <Card.Title className="tile-size">{tile.size}</Card.Title>
                                            <Card.Title className="tile-finishingType">{tile.finishingType}</Card.Title>
                                            <div className="flex-shrink-0">
                                                <Link className="btn btn-sm btn-hotel" to={`/book-tile/${tile.id}`}>
                                                    Book Now
                                                </Link>

                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Carousel.Item>
                ))}

            </Carousel>
        </Container>
      
    </section>
  )
}

export default TileCarousel

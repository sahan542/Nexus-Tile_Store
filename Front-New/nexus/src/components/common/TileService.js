import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi  } from 'react-icons/fa'

const TileService = () => {
  return (
    <>
    <Container className="mb-2">
        <Header title={"Our Services"}/>
        <Row>
            <h4 className="text-center">
                Services at <span className='hotel-color'>Nexus</span>-Tiles
                <span className='gap-2'>
                    <FaClock /> -24-Hour Front Desk

                </span>
            </h4>
        </Row>
        <hr/>

        <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="hotel-color">
                            <FaWifi/> WiFi
                        </Card.Title>
                        <Card.Text>Stay Connectyed with High Speed Internet Access</Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="hotel-color">
                            <FaUtensils/> Breakfast
                        </Card.Title>
                        <Card.Text>Start your day with delicious breakfast buffet</Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="hotel-color">
                            <FaTshirt/> Laundry
                        </Card.Title>
                        <Card.Text>Keey your clothes clean & fresh with our laundry service</Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="hotel-color">
                            <FaCocktail/> Mini-bar
                        </Card.Title>
                        <Card.Text>Enjoy a refreshing drink with  from  our in-room mini bar</Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="hotel-color">
                            <FaParking/> Parking-Area
                        </Card.Title>
                        <Card.Text>Enjoy a refreshing drink with  from  our in-room mini bar</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="hotel-color">
                            <FaSnowflake/> Air Conditioning
                        </Card.Title>
                        <Card.Text>Enjoy a refreshing drink with  from  our in-room mini bar</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    </Container>
      
    </>
  )
}

export default TileService

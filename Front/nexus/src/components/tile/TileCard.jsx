import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TileCard = ({tile}) => {
  return (
    <Col key={tile.id} className='mb-4' xs={12}>
        <Card>
            <Card.Body className="d-flex flex-wrap align-items-center">
                <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
                    <Link to={`book-tile/${tile.id}`} className="btn btn-hotel btn-sm">
                    <Card.Img 
                    variant='top'
                    src={`data:image/png;base64, ${tile.photo}`}
                    alt="Tilem Photo"
                    style={{width:"100%", maxWidth: "200px", height: "auto"}}
                    />
                    </Link>
                </div>
                <div className="flex-grow-1 ml-3 px-5">
                    <Card.Title className="hotel-color"> {tile.collectionType}</Card.Title>
                    <Card.Title className="hotel-color"> {tile.groupType}</Card.Title>
                    <Card.Title className="hotel-color"> {tile.price}</Card.Title>
                    <Card.Text>Some Tile info goes here for the guest to read through</Card.Text>
                    <Card.Text>{tile.color}</Card.Text>
                    <Card.Text>{tile.size}</Card.Text>
                    <Card.Text>{tile.finishingType}</Card.Text>
                    <Card.Text>Some Tile info goes here for the guest to read through</Card.Text>

                </div>
                <div className="flex-shrink-0 mt-3">
                    <Link to={`http://localhost:5173/book-tile/${tile.id}`} className="btn btn-hotel btn-sm">
                        Book Now
                    </Link>
                </div>
            </Card.Body>
        </Card>
      
    </Col>
  )
}

export default TileCard

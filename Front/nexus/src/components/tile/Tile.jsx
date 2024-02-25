import React, { useEffect, useState } from 'react'
import { getAllTiles } from '../utils/ApiFunctions'
import TileCard from './TileCard'
import { Col, Container, Row } from 'react-bootstrap'
import TileFilter from '../common/TileFilter'
import TilePaginator from '../common/TilePaginator'

const Tile = () => {
    const[data, setData] = useState([])
    const[error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(false)
    const[currentPage, setCurrentPage] = useState(1)
    const[tilesPerPage] = useState(6)
    const[filteredData, setFilteredData] = useState([{id:""}])


    useEffect(() =>{
        setIsLoading(true)
        getAllTiles().then((data) =>{
            setData(data)
            setFilteredData(data)
            setIsLoading(false)
        }).catch((error)=>{
            setError(error.message)
            setIsLoading(false)
        })
    }, [])
    if(isLoading){
    return <div>Loading Tiles...</div>
}
if(error){
    return <div className="text-danger">Error : {error}</div>
}
const handlePageChange = (pageNumber) =>{
    setCurrentPage(pageNumber)
}
const totalPages = Math.ceil(filteredData.length / tilesPerPage)

const renderedTiles = () =>{
    const startIndex = (currentPage -1)* tilesPerPage
    const endIndex = startIndex + tilesPerPage
    return filteredData
            .slice(startIndex, endIndex)
            .map((tile) => <TileCard key={tile.id} tile={tile}/>)
}

return (
    <Container>
        <Row>
            <Col md={6} className="mb-3 mb-md-0">
                <TileFilter data={data} setFilteredData={setFilteredData}/>

            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-end">
                <TilePaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>

            </Col>
        </Row>
        <Row>
            {renderedTiles()}
        </Row>
        
        <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
                <TilePaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>

            </Col>

        </Row>

    </Container>
)
}

export default Tile

import React, { useEffect, useState } from 'react'
import { getAllTiles } from '../utils/ApiFunctions'
import { Col } from "react-bootstrap"
import TileFilter from '../common/TileFilter'
import TilePaginator from '../common/TilePaginator'


const ExistingTiles = () => {
    const[tiles, setTiles] = useState([{ id: "", collectionType: "", groupType: "", price: "", color: "", size: "", finishingType: ""}])
    const[currentPage, setCurrentPage] = useState(1)
    const[tilesPerPage] = useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const[filteredTiles, setFilteredTiles] = useState([{ id: "", collectionType: "", groupType: "", price: "", color: "", size: "", finishingType: ""}])
    const[selectedCollectionType, setSelectedCollectionType] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchTiles()
    }, [])

    const fetchTiles = async() =>{
        setIsLoading(true)
        try{
            const result = await getAllTiles()
            setTiles(result)
            setIsLoading(false)
        }
        catch(error){
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() =>{
        if(selectedCollectionType === ""){
            setFilteredTiles(tiles)
        }
        else{
            const filteredTiles = tiles.filter((tile)=> tile.collectionType === selectedCollectionType)
            setFilteredTiles(filteredTiles)
        }
        setCurrentPage(1)
    }, [tiles, selectedCollectionType])

    const handlePaginationClick = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    const calculateTotalPages = (filteredTiles, tilesPerPage, tiles) =>{
        const totalTiles = filteredTiles.length > 0 ? filteredTiles.length : tiles.length
        return Math.ceil(totalTiles / tilesPerPage)
    }

    const indexOfLastTile = currentPage * tilesPerPage
    const indexOfFirstTile = indexOfLastTile - tilesPerPage
    const currentTiles = filteredTiles.slice(indexOfFirstTile, indexOfLastTile) 


  return (
    <>
    {isLoading ? (
        <p>Loading Existing Tile Designs</p>
    ):(
        <>
        <section className='mt-5 mb-5 container'>
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Existing Tile Designs</h2>

            </div>
            <Col md={6} className="mb-3 mb-md-0">
                <TileFilter data={tiles} setFilteredData={setFilteredTiles} />
            
            </Col>
            <table className="table table-borederd table-hover">
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Collection Type</th>
                        <th>Group Type</th>
                        <th>Price</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Finishing</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTiles.map((tile)=>(
                        <tr key={tile.id} className='text-center'>
                            <td>{tile.collectionType}</td>
                            <td>{tile.groupType}</td>
                            <td>{tile.price}</td>
                            <td>{tile.color}</td>
                            <td>{tile.size}</td>
                            <td>{tile.finishingType}</td>
                            <td>
                                <button>View/Edit</button>
                                <button>Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <TilePaginator currentPage={currentPage} totalPages={calculateTotalPages(filteredTiles, tilesPerPage, tiles)} onPageChange={handlePaginationClick}/>

        </section>
        </>

    )}
      
    </>
  )
}

export default ExistingTiles

import React, { useEffect, useState } from 'react'
import { deleteTile, getAllTiles } from '../utils/ApiFunctions'
import { Col, Row } from "react-bootstrap"
import TileFilter from '../common/TileFilter'
import TilePaginator from '../common/TilePaginator'
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"


const ExistingTiles = () => {
    const[tiles, setTiles] = useState([{ 
                id: "", 
                collectionType: "", 
                groupType: "", 
                price: "", 
                color: "", 
                size: "", 
                finishingType: ""}])
    const[currentPage, setCurrentPage] = useState(1)
    const[tilesPerPage] = useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const[filteredTiles, setFilteredTiles] = useState([{ id: "", 
                                            collectionType: "", 
                                            groupType: "", 
                                            price: "", 
                                            color: "", 
                                            size: "", 
                                            finishingType: ""}])
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

    const handleDelete = async (tileId) =>{
        try{
            const result = await deleteTile(tileId)
            if(result === ""){
                setSuccessMessage(`Tile No ${tileId} was deleted`)
                fetchTiles()
            }
            else{
                console.error(`Error Deleting Tile Design : ${result.message}`)
            }
            }
            catch (error) {
                setErrorMessage(error.message)
            }
            setTimeout(() => {
                setSuccessMessage("")
                setErrorMessage("")
            }, 3000)
        }

    const calculateTotalPages = (filteredTiles, tilesPerPage, tiles) => {
        const totalTiles = filteredTiles.length > 0 ? filteredTiles.length : tiles.length
        return Math.ceil(totalTiles / tilesPerPage)
    }

    const indexOfLastTile = currentPage * tilesPerPage
    const indexOfFirstTile = indexOfLastTile - tilesPerPage
    const currentTiles = filteredTiles.slice(indexOfFirstTile, indexOfLastTile) 


  return (
    <>
    <div className="container col-md-8 col-lg-6">
				{successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

				{errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
			</div>

    {isLoading ? (
        <p>Loading Existing Tile Designs</p>
    ):(
        <>
        <section className='mt-5 mb-5 container'>
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Existing Tile Designs</h2>

            </div>
				<Row>
					<Col md={6} className="mb-2 md-mb-0">
                        <TileFilter data={tiles} setFilteredData={setFilteredTiles}
                            />
					</Col>

					<Col md={6} className="d-flex justify-content-end">
						<Link to={"/add-tiles"}>
							<FaPlus /> Add Tile
						</Link>
					</Col>
				</Row>
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
                            <td>{tile.id}</td>
                            <td>{tile.collectionType}</td>
                            <td>{tile.groupType}</td>
                            <td>{tile.price}</td>
                            <td>{tile.color}</td>
                            <td>{tile.size}</td>
                            <td>{tile.finishingType}</td>
                            <td className="gap-2">
                            <Link to={`/edit-tile/${tile.id}`} className="gap-2">
												<span className="btn btn-info btn-sm">
													<FaEye />
												</span>
												<span className="btn btn-warning btn-sm ml-5">
													<FaEdit />
												</span>
											</Link>
											<button
												className="btn btn-danger btn-sm ml-5"
												onClick={() => handleDelete(tile.id)}>
												<FaTrashAlt />
											</button>
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

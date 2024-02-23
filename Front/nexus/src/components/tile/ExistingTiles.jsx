import React, { useEffect, useState } from 'react'
import { getAllTiles } from '../utils/ApiFunctions'

const ExistingTiles = () => {
    const[tiles, setTiles] = useState([])
    const[currentPage, setCurrentPage] = useState(1)
    const[tilesPerPage] = useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const[filteredTiles, setFilteredTiles] = useState([])
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
        }
    }

    useEffect(() =>{
        if(selectedCollectionType === ""){
            setFilteredTiles(tiles)
        }
        else{
            const filtered = tiles.filter((tile)=> tile.collectionType === selectedCollectionType)
            setFilteredTiles(filtered)
        }
        setCurrentPage(1)
    }, [tiles, selectedCollectionType])

    const calculateTotalPages = (filteredTiles, tilesPerPage, tiles) =>{
        const totalTiles = filteredTiles.length > 0 ? filteredTiles.length : tiles.length
        return Math.ceil(totalTiles / tilesPerPage)
    }

    const indexOfLastTile = currentPage * tilesPerPage
    const indexOfFirstTile = indexOfLastTile - tilesPerPage
    const currentTiles = filteredTiles.slice(indexOfFirstTile, indexOfLastTile) 


  return (
    <div>
      
    </div>
  )
}

export default ExistingTiles

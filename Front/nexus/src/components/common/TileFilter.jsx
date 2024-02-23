import React, { useState } from 'react'

const TileFilter = ({ data, setFilteredData }) => {
    const[filter, setFilter] = useState("")
    const handleSelectChange = (e) =>{
        const selectedCollectionType = e.target.value 
        setFilter(selectedCollectionType)

        const filteredTiles = data.filter((tile) =>
            tile.collectionType.toLowerCase().includes(selectedCollectionType.toLowerCase()))
        setFilteredData(filteredTiles)
    }

    const clearFilter = () =>{
        setFilter("")
        setFilteredData(data)
    }

    const collectionTypes = ["", ...new Set(data.map((tile) => tile.collectionType))]

  return (
    <div className="input-group mb-3">
        <span className="input-group-text" id="collection-type-filter">Filter Tiles by Collection Type</span>
        <select className="form-select" value={filter} onChange={handleSelectChange}>
            <option value={""}>Select a collection type to filter...</option>
            {collectionTypes.map((type, index) =>(
                <option key={index} value={String(type)}>
                    {String(type)}
                </option>
            ))}
        </select>
        <button className="btn btn-hotel" type="button" onClick={clearFilter}>Clear Filter</button>
      
    </div>
  )
}

export default TileFilter

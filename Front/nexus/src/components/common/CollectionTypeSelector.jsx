import React, { useEffect, useState } from 'react'
import { getCollectionTypes } from '../utils/ApiFunctions';
import PropTypes from 'prop-types';

const CollectionTypeSelector = ({handleCollectionInputChange, newTile}) => {
    const[collectionTypes, setCollectionTypes] = useState([""]);
    const[showNewCollectionTypeInput, setShowNewCollectionTypeInput] = useState(false);
    const[newCollectionType, setNewCollectionType] = useState("");

    useEffect(() => {
        getCollectionTypes().then((data) =>{
            if (Array.isArray(data)) {
                setCollectionTypes(data);
            } else {
                console.log("Invalid data received from getCollectionTypes:", data);
            }
        })
        .catch((error) => {
            console.error("Error fetching room types:", error);
        });
    }, [])

    const handleNewCollectionTypeInputChange = (e) => {
        setNewCollectionType(e.target.value);

    }

    const handleAddNewCollectionType = () =>{
        if(newCollectionType !== ""){
            setCollectionTypes([...collectionTypes, newCollectionType]);
            setNewCollectionType("");
            setShowNewCollectionTypeInput(false);
        }
    }


  return (
    <>
    {collectionTypes.length > 0 && (
        <div>
            <select
                id='collectionType'
                name='collectionType'
                value={newTile.collectionTypes}
                onChange={(e) =>{
                    if(e.target.value == "Add New"){
                        setShowNewCollectionTypeInput(true);
                    }
                    else{
                        handleCollectionInputChange(e);
                    }
                }}
                >
                    <option value={""}>select a collection Type</option>
                    <option value={"Add New"}>Add New Collection</option>
                    {collectionTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}

            </select>
            {showNewCollectionTypeInput && (
                <div className='input-group'>
                    <input className='form-control'
                    type='text'
                    placeholder='Enter a new Collection Type'
                    onChange={handleNewCollectionTypeInputChange}
                    />
                    <button className='btn btn-tile' type='button' onClick={handleAddNewCollectionType}>Add</button>
                   
                </div>
            )}
        </div>
    )}
      
    </>
  )
}


export default CollectionTypeSelector

import React, { useEffect, useState } from 'react'
import { getGroupTypes } from '../utils/ApiFunctions';
import PropTypes from 'prop-types';

const GroupTypeSelector = ({handleGroupInputChange, newTile}) => {
    const[groupTypes, setGroupTypes] = useState([""]);
    const[showNewGroupTypeInput, setShowNewGroupTypeInput] = useState(false);
    const[newGroupType, setNewGroupType] = useState("");

    useEffect(() => {
        getGroupTypes().then((data) => {
            if (Array.isArray(data)) {
                setGroupTypes(data);
            } else {
                console.log("Invalid data received from getGroupTypes:", data);
            }
        })
        .catch((error) => {
            console.error("Error fetching room types:", error);
        });
    }, [])

    const handleNewGroupTypeInputChange = (e) =>{
        setNewGroupType(e.target.value);
    }

    const handleAddNewGroupType = () =>{
        if(newGroupType !== ""){
            setGroupTypes([...groupTypes, newGroupType]);
            setNewGroupType("");
            setShowNewGroupTypeInput(false);
        }
    }


  return (
    <>
    {groupTypes.length > 0 && (
        <div>
            <select
                id='groupType'
                name='groupType'
                value={newTile.groupTypes}
                onChange={(e) =>{
                    if(e.target.value == "Add New"){
                        setShowNewGroupTypeInput(true);
                    }
                    else{
                        handleGroupInputChange(e);
                    }
                }}
            >
                <option value={""}>Select a Group Type</option>
                <option value={"Add New"}>Add New Group</option>
                {groupTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}

            </select>
            {showNewGroupTypeInput && (
                <div className='input-group'>
                    <input className='form-control'
                        type='text'
                        placeholder='Enter a new group Type'
                        onChange={handleNewGroupTypeInputChange}
                    />
                    <button className='btn btn-hotel' type='button' onClick={handleAddNewGroupType}>
                        Add</button>
                    
                </div>
            )}
        </div>
    )}
      
    </>
  )
}

export default GroupTypeSelector
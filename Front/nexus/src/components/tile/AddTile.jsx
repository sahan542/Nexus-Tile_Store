import React, { useState } from 'react';
import { addTile } from '../utils/ApiFunctions';

const AddTile = () => {

    const [newTile, setNewTile] = useState({
        photo : null,
        collectionType : "",
        groupType : "",
        price : "",
        color : "",
        size : "",
        finishingType : ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleTileInputChange = (e) =>{
        const name = e.target.name 
        let value = e.target.value 
        if(name === "price"){
            if(!isNaN(value)){
                value.parseInt(value)
            }
            else{
                value=""
            }
        }
        setNewTile({...newTile, [name]: value})
    }

    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setNewTile({...newTile, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const success = await addTile(newTile.photo, newTile.collectionType, newTile.groupType, 
                newTile.price, newTile.color, newTile.size, newTile.finishingType)
                if(success !==undefined){
                    setSuccessMessage("A new Tile was added to the database")
                    setNewTile({photo: null, collectionType: "", groupType: "", price: "", color: "", size: "", finishingType: ""})
                    setImagePreview("")
                    setErrorMessage("")
                }
                else{
                    setErrorMessage("Error adding Tile")
                }

        }
        catch(error){
            setErrorMessage(error.message)
        }
    }



  return (
    <>
    <section className="container, mt-5, mb-5">
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
                <h2 className="mt-5 mb-2">Add a New Tile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="collectionType" className="form-label">Collection Type</label>
                        <div></div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="groupType" className="form-label">Group Type</label>
                        <div></div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            className="form-control"
                            required
                            id='price'
                            name='price'
                            type="number"
                            value={newTile.price}
                            onChange={handleTileInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="color" className="form-label">Color</label>
                        <input
                            className="form-control"
                            required
                            id='color'
                            name='color'
                            type="text"
                            value={newTile.color}
                            onChange={handleTileInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="size" className="form-label">Size</label>
                        <input
                            className="form-control"
                            required
                            id='size'
                            name='size'
                            type="text"
                            value={newTile.size}
                            onChange={handleTileInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="size" className="form-label">Finishing Type</label>
                        <input
                            className="form-control"
                            required
                            id='finishingType'
                            name='finishingType'
                            type="text"
                            value={newTile.finishingType}
                            onChange={handleTileInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="photo" className="form-label">Tile Photo</label>
                        <input
                            id="photo"
                            name="photo"
                            type="file"
                            className="form-control"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <img src={imagePreview} 
                            alt="Preview Tile Photo"
                            style={{maxWidth: "400px", maxHeight: "400px"}}
                            className="mb-3"
                            />
                        )}
                    </div>

                    <div className="d-grid d-md-flex mt-2">
                        <button className="btn btn-outline-primary ml-5">Save Tile</button>
                    </div>

                </form>
            </div>
        </div>
    </section>
      
    </>
  )
}

export default AddTile

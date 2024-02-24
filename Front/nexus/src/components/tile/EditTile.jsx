import React, { useEffect, useState } from 'react'
import { getTileById, updateTile } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom"

const EditTile = () => {
    const [tile, setTile] = useState({
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

    const { tileId } = useParams()


    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setTile({...tile, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleTileInputChange = (event) => {
        const { name, value } = event.target;
        setTile({ ...tile, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await updateTile(tileId, tile)
                if(response.status === 200){
                    setSuccessMessage("Tile Updated successfully!")
                    const updatedTileData = await getTileById(tileId)
                    setTile(updatedTileData)

                    setImagePreview(updatedTileData.photo)
                    setErrorMessage("")
                }
                else{
                    setErrorMessage("Error in Updating Tile")
                }

        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    useEffect(() => {
        const fetchTile = async () => {
            try{
                const tileData = await getTileById(tileId)
                setTile(tileData)
                setImagePreview(tileData.photo)
            }
            catch(error){
                console.error(error)
            }
        }
        fetchTile()
    }, [tileId])


  return (
    <div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit Room</h3>
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					{successMessage && (
						<div className="alert alert-success" role="alert">
							{successMessage}
						</div>
					)}
					{errorMessage && (
						<div className="alert alert-danger" role="alert">
							{errorMessage}
						</div>
					)}
					<form onSubmit={handleSubmit}>
                    <div className="mb-3">
							<label htmlFor="collectionType" className="form-label hotel-color">
                                CollectionType
							</label>
							<input
								type="text"
								className="form-control"
								id="collectionType"
								name="collectionType"
								value={tile.collectionType}
								onChange={handleTileInputChange}
							/>
						</div>

                        <div className="mb-3">
							<label htmlFor="groupType" className="form-label hotel-color">
								Group Type
							</label>
							<input
								type="text"
								className="form-control"
								id="groupType"
								name="groupType"
								value={tile.groupType}
								onChange={handleTileInputChange}
							/>
						</div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            className="form-control"
                            required
                            id='price'
                            name='price'
                            type="number"
                            value={tile.price}
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
                            value={tile.color}
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
                            value={tile.size}
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
                            value={tile.finishingType}
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
						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
								back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Room
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
  )
}

export default EditTile

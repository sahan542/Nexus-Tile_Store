import axios from "axios"

export const api = axios.create({
	baseURL: "http://localhost:8092"
})

//This function add new tiles to he database
export async function addTile(photo, collectionType, groupType, price, color, size, finishingType){
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("collectionType", collectionType)
    formData.append("groupType", groupType)
    formData.append("price", price)
    formData.append("color", color)
    formData.append("size", size)
    formData.append("finishingType", finishingType)

    const response = await api.post("/tiles/add/new-tile", formData)
    if(response.status === 201){
        return true
    }
    else{
        return false
    }
}

//this function get all collection types from database
export async function getCollectionTypes(){
    try{
        const response = await api.get("/tiles/collection-types")
        return response.data
    }
    catch(error){
        throw new Error("Error Fetching Collection Types")
    }
}

//this function get all group types from database
export async function getGroupTypes(){
    try{
        const response = await api.get("/tiles/group-types")
        return response.data
    }
    catch(error){
        throw new Error("Error Fetching Group Types")
    }
}

/*This function gets all tiles from database */
export async function getAllTiles(){
    try{
        const result = await api.get("/tiles/all-tiles")
        return result.data

    }
    catch(error){
        throw new Error("Error Fetching Tiles");

    }
}

/*This function deletes tiles by tileID from database */
export async function deleteTile(tileId){
    try{
        const result = await api.delete(`/tiles/delete/tile/${tileId}`)
        return result.data
    }
    catch(error){
        throw new Error(`Error Deleting Tile Design ${error.message}`)
    }
}

//This function uses to update Tile Information
export async function updateTile(tileId, tileData){
    const formData = new FormData()
    formData.append("collectionType", tileData.collectionType)
    formData.append("groupType", tileData.groupType)
    formData.append("price", tileData.price)
    formData.append("color", tileData.color)
    formData.append("size", tileData.size)
    formData.append("finishingType", tileData.finishingType)
    formData.append("photo", tileData.photo)

    const response = await api.put(`/tiles/update/${tileId}`, formData)
    return response
}

//This function can get a Tile design by Its ID
export async function getTileById(tileId){
    try{
        const result = await api.get(`/tiles/tile/${tileId}`)
        return result.data
    }
    catch(error){
        throw new Error(`Error Fetching tile ${error.message}`)

    }
}
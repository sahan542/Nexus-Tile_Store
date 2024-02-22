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
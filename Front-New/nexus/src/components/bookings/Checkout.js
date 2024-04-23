import React, { useEffect, useState } from 'react'
import BookingForm from "./BookingForm"
import { getTileById } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa'
import TileCard from '../tile/TileCard'
import TileCarousel from '../common/TileCarousel'

const Checkout = () => {
  const[error, setError] = useState("")
  const[isLoading, setIsLoading] = useState(false)
  const[tileInfo, setTileInfo] = useState({
                                  photo: "", 
                                  collectionType: "",
                                  groupType: "",
                                  price: "",
                                  color: "",
                                  size: "",
                                  finishingType: ""
                                })
  const{ tileId } = useParams()

  useEffect(() => {
    setTimeout(() =>{
      getTileById(tileId).then((response) =>{
        setTileInfo(response)
        setIsLoading(false)
      }).catch((error) => {
        setError(error)
        setIsLoading(false)
      })
    },2000)
  }, [tileId])

  return (
    <div>
      <section className='container'>
        <div className="row flex-column flex-md-row align-items-center">
            <div className="col-md-4 mb-5">
              {isLoading ? (
                <p>Loading Tile Designs...</p>
              ): error? (
                <p>{error}</p>
              ): (
                <div className="tile-info mt-5">
                  <img 
                      src={`data:image/png;base64,${tileInfo.photo}`}
                      alt="Tile Photo"
                      style={{width : "100%", height: "200px"}}
                  />
                  <table className='table table-bordered mt-3'>
                    <tbody >
                      <tr>
                        <th>Collection Type :</th>
                        <td>{tileInfo.collectionType}</td>
                      </tr>
                      <tr>
                        <th>Group Type :</th>
                        <td>{tileInfo.groupType}</td>
                      </tr>
                      <tr>
                        <th>Price :</th>
                        <td>{tileInfo.price}</td>
                      </tr>
                      <tr>
                        <th>Color :</th>
                        <td>{tileInfo.color}</td>
                      </tr>
                      <tr>
                        <th>Size :</th>
                        <td>{tileInfo.size}</td>
                      </tr>
                      <tr>
                        <th>Finishing Type :</th>
                        <td>{tileInfo.finishingType}</td>
                      </tr>

                      <tr>
                        <td>
                          <ul className="list-unstyled">
                            <li>
                              <FaWifi/> WiFi
                            </li>
                            <li>
                              <FaTv/> Netflix Premium
                            </li>
                            <li>
                              <FaUtensils/> Breakfast
                            </li>
                            <li>
                              <FaWineGlassAlt/> Mini bar Refreshments
                            </li>
                            <li>
                              <FaCar/> Car Service
                            </li>
                            <li>
                              <FaParking/> Parking Space
                            </li>
                            <li>
                              <FaTshirt/> Laundary
                            </li>
                          </ul>
                        </td>
                      </tr>

                    </tbody>
                  </table>

                </div>
              )}

            </div>
            <div className="col-md-6">
            <BookingForm/>

            </div>
        </div>

      </section>
      <div className="container">
          <TileCarousel/>
      </div>
      
    </div>
  )
}

export default Checkout
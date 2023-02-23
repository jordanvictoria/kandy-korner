import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Locations.css"




export const LocationList = () => {
    const [locations, setLocations] = useState([])

useEffect(
    () => {
        fetch(`http://localhost:8088/locations`)
        .then(response => response.json())
        .then((locationsArr) => {
            setLocations(locationsArr)
        })
    },
    [] // When this array is empty, you are observing initial component state
)

return <>

<h2>List of Locations</h2>

<article className="locations">
    {
        locations.map(
            (location) => {
                return <section className="location">
                    <header>{location.name}</header>
                    <footer>
                        <div>Address: {location.address}</div>
                        <div>Square Footage: {location.squareFootage}</div>
                    </footer>
                </section>
            }
        )
    }
</article>

</>

}
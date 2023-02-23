import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CandyLocationDetails = () => {
    const {locationId} = useParams([])
    const [candy, updateCandy] = useState({})    

    useEffect(
        () => {
            fetch(` http://localhost:8088/products?_expand=location&locationId=${locationId}`)
            .then(response => response.json())
            .then((data) => {
                const singleLocation = data[0]
                updateCandy(singleLocation)
            })
        },
        [locationId]
    )





    return <section className="location">
                    <div>Name: {candy?.location?.name}</div>
                    <div>Address: {candy.location?.address}</div>
                </section>
}
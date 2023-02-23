import { useEffect, useState } from "react"
import { CandyLocation } from "./Candy"
import "./Candy.css"




export const CandyList = ({ searchTermState }) => {
    const [candies, setCandies] = useState([])
    const [filteredCandies, setFilteredCandies] = useState([])
    



    useEffect(
        () => {
            const searchedCandy = candies.filter(candy => {
                return candy.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredCandies(searchedCandy)
        },
        [ searchTermState ]
    )

 

useEffect(
    () => {
        fetch(`http://localhost:8088/products?_expand=location`)
        .then(response => response.json())
        .then((candiesArr) => {
            setCandies(candiesArr)
        })
    },
    [] // When this array is empty, you are observing initial component state
)






return <> 

<h2>List of Candy</h2>

<article className="products">
    {
        filteredCandies.map(
            (candy) => {
                return <section className="product">
                    <header>{candy.name}</header>
                    <footer>
                        <div>Price: {candy.price}</div>
                        <div> < CandyLocation key={`location--${candy.locationId}`}
                        id={candy.locationId} />
                        </div>
                    </footer>    
                </section>
            }
        )
    }
</article>

</>

}
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CandyLocation } from "./Candy"
import "./Candy.css"

// HAVE TO REFRESH THE PAGE TO SEE NEW QUANTITY ??


export const CandyList = ({ searchTermState }) => {
    const [candies, setCandies] = useState([])
    const [filteredCandies, setFilteredCandies] = useState([])

    

    
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    const navigate = useNavigate()



    

 

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

useEffect(
    () => {
        setFilteredCandies(candies)
    },
    [candies] // When this array is empty, you are observing initial component state
)

useEffect(
    () => {
        const searchedCandy = candies.filter(candy => {
            return candy.name.toLowerCase().startsWith(searchTermState.toLowerCase())
        })
        setFilteredCandies(searchedCandy)
    },
    [ searchTermState ]
)





    const handleSaveButtonClick = (event, candy) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API

        const purchaseToSendToAPI = {
            userId: kandyUserObject.id,
            productId: candy.id
        }

        const quantityToSendToAPI = {
            
            name: candy.name,
            price: candy.price,
            quantity: candy.quantity - 1,
            productTypeId: candy.productTypeId,
            locationId: candy.locationId
        }
        // TODO: Perform the fetch() to POST the object to the API

        return fetch(`http://localhost:8088/purchases`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(purchaseToSendToAPI)
            })
        .then(response => response.json())
        .then(() => {
            return fetch(`http://localhost:8088/products/${candy.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(quantityToSendToAPI)
            })
        })
        .then(response => response.json())
        .then(() => {
            navigate("/candySearch")
        })
    
    }



return <> 

<h2>List of Candy</h2>

<article className="products">
    {
        filteredCandies.map(
            (filteredCandy) => {
                return <section className="product">
                    <header>{filteredCandy.name}</header>
                    <footer>
                        <div>Price: {filteredCandy.price}</div>
                        <div>There are {filteredCandy.quantity} left</div>
                        <div> < CandyLocation key={`location--${filteredCandy.locationId}`}
                        id={filteredCandy.locationId} />
                        </div>
                        <button onClick={ 
                            (evt) => {
                                handleSaveButtonClick(evt, filteredCandy)}}
                        className="btn btn-primary">
                        Purchase
                        </button>
                    </footer>    
                </section>
            }
        )
    }
</article>

</>

}


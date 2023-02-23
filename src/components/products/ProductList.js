import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"




export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [topPriced, setTopPriced] = useState(false)
    const navigate = useNavigate()


    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)




useEffect(
        () => {
            if (topPriced) {
                const topPricedProducts = products.filter(product => product.price > 2)
                setFilteredProducts(topPricedProducts)
            } else {
                setFilteredProducts(products)
            }
        },
        [topPriced]
    )

 

useEffect(
    () => {
        fetch(`http://localhost:8088/products?_expand=productType&_sort=name&_order=asc`)
        .then(response => response.json())
        .then((productsArr) => {
            setProducts(productsArr)
        })
    },
    [] // When this array is empty, you are observing initial component state
)

useEffect(
    () => {
        if (kandyUserObject.staff) {
            // For employees
            setFilteredProducts(products)
        } 
    },
    [products]
)




return <> {

    kandyUserObject.staff
            ? <>
            <button onClick={ () => { setTopPriced(true) } } >Top Priced</button>
            <button onClick={ () => { setTopPriced(false) } } >Show All</button>
            <button onClick={() => navigate("/product/create")}>Add Product</button>
            </>
            : 
            <>
            {/* <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
            <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
            <button onClick={() => updateOpenOnly(false)}>All My Tickets</button> */}
            </>
}

<h2>List of Products</h2>

<article className="products">
    {
        filteredProducts.map(
            (product) => {
                return <section className="product">
                    <header>{product.name}</header>
                    <footer>
                        <div>Price: {product.price}</div>
                        <div>Product Type: {product.productType.category}</div>
                    </footer>    
                </section>
            }
        )
    }
</article>

</>

}
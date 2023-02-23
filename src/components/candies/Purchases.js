import { useEffect, useState } from "react"





export const Purchases = () => {
    const [purchases, setPurchases] = useState([])



    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

useEffect(
    () => {
        fetch(`http://localhost:8088/purchases?_expand=product&userId=${kandyUserObject.id}`)
        .then(response => response.json())
        .then((purchasesArr) => {
            setPurchases(purchasesArr)
        })
    },
    [] // When this array is empty, you are observing initial component state
)

return <>

<h2>List of Orders</h2>

<article className="purchases">
    {
        purchases.map(
            (purchase) => {
                return <section className="purchase">
                    <header>{purchase?.product?.name}</header>
                    <footer>
                        <div>Price: {purchase?.product?.price}</div>
                    </footer>
                </section>
            }
        )
    }
</article>

</>

}
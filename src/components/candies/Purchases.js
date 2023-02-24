import { useEffect, useState } from "react"


export const Purchases = () => {
    const [purchases, setPurchases] = useState([])
    const [quantifiedPurchases, setQuantifiedPurchases] = useState([])
    
    



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
    [] 
)




// You can use a basic for..of loop to do this. For this option, you can create a new createLineItem() function in your module. 
//It will need to iterate the purchases for the current customer.

// Perhaps start with a blank JavaScript Map(). Then, as you iterate the purchases for the current customer, 
//check if the object has the current product's id as a key. If not, add a new key/value pair.

// The key will be an object with the product's id and price as properties.
// The value will be the quantity.
// As you iterate the purchases, whenever you hit a product that is already in the Map(), increment the value by 1.

useEffect(
    () => {
        let purchasesbyProduct = []
    for (const purchase of purchases) {
        const foundProductId = purchasesbyProduct.find(pbp => pbp.id === purchase.productId)
        const foundIndex = purchasesbyProduct.findIndex(pbp => pbp.id === purchase.productId)
        // console.log(foundProductId)
        // console.log(foundIndex)
            if (!foundProductId) {
                const newObj = {
                    id: purchase.productId,
                    name: purchase?.product?.name,
                    price: purchase?.product?.price,
                    totalCost: purchase?.product?.price,
                    quantity: 1
                }
                purchasesbyProduct.push(newObj)
            } else {
                foundProductId.quantity += 1
                foundProductId.totalCost += purchase?.product?.price
                purchasesbyProduct[foundIndex] = foundProductId
            }
        }
        setQuantifiedPurchases(purchasesbyProduct)
        
    },
    [purchases] 
)






return <>

<h2>List of Orders</h2>

<article className="purchases">
    {
        quantifiedPurchases.map(
            (purchase) => {
                return <section className="purchase">
                    <header>{purchase.name}</header>
                    <div>Quantity: {purchase.quantity}</div>
                    <div>Total Cost: {purchase.totalCost}</div>
                </section>
            }
        )
    }
</article>

</>

}
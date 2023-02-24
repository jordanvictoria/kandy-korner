import { useEffect, useState } from "react"
import { Customer } from "./Customer"



export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [sortedCustomers, setSorted] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false&_embed=purchases`)
            .then(response => response.json())
            .then((customerArray) => {
                setCustomers(customerArray)
            })
        },
        []
    )

    useEffect(
        () => {
            const sortByPurchases = customers.sort((a, b) => b.purchases.length - a.purchases.length)
            setSorted(sortByPurchases)
        },
        [customers]
    )





    return <article className="customers">
        {
            sortedCustomers.map(customer => < Customer key={`customer--${customer.id}`}
                id={customer.id}
                fullName={customer.fullName}
                email={customer.email}
                numofCandies={customer.purchases.length} />)
        }
    </article>
}

//SORT METHOD FOR NUMOFCANDIES ???
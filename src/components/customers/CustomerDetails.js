import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const CustomerDetails = () => {
    const {customerId} = useParams([])
    const [customer, updateCustomer] = useState({})    
    const [custProfile, updateCustProfile] = useState({
        loyaltyNumber: 0,
        userId: 0
    })
    const [feedback, setFeedback] = useState("")




    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])




    useEffect(
        () => {
            fetch(` http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            .then(response => response.json())
            .then((data) => {
                const singleCustomer = data[0]
                updateCustomer(singleCustomer)
            })
        },
        [customerId]
    )








    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/customers/${custProfile.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(custProfile)
        })
        .then(response => response.json())
        .then(() => {
            setFeedback("Customer profile successfully saved")
        })
        .then(() => {

        })
    }



    return ( <>
        <section className="customer">
        <header className="customer_header">{customer?.user?.fullName}</header>
        <div>Email: {customer?.user?.email}</div>
        <div>Loyalty Number: {customer.loyaltyNumber}</div>
    </section>

    
    
        
        <form className="profile">
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
        </div>
            <h2 className="profile__title">Change Loyalty ID</h2>
            <fieldset>
                <div className="form-group">
                    <label>Add New Loyalty ID:</label>
                    <input type="number"
                        className="form-control"
                        // value={customer.loyaltyNumber}
                        onChange={
                            (evt) => {
                                const copy = {...customer}
                                copy.loyaltyNumber = evt.target.value
                                updateCustProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    </>)
}
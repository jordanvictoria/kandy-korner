import { useState } from "react"
import { useNavigate } from "react-router-dom"





export const EmployeeForm = () => {

    const [user, updateUser] = useState({
        fullName: "",
        email: ""
    })

    const [employee, updateEmp] = useState({
        userId: "",
        locationId: "",
        startDate: "",
        payRate: ""

    })
    
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const userToSendToAPI = {
            fullName: user.fullName,
            email: user.email,
            isStaff: true
        }

        let empToSendToAPI = {
            locationId: parseInt(employee.locationId),
            startDate: employee.startDate,
            payRate: parseFloat(employee.payRate, 2)
        }

        return fetch(` http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        })
            .then(response => response.json())
            .then(createdUser => {
                empToSendToAPI.userId = parseInt(createdUser.id)
                fetch(` http://localhost:8088/employees`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(empToSendToAPI)
            })
                })
            .then(() => {
                navigate("/employees")
            })
        }





    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.fullName}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.fullName = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={user.email}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.email = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productType">Location:</label>
                    <select className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.locationId = evt.target.value
                                updateEmp(copy)
                            }
                        }>
                        <option value="0">Choose A Location</option>
                        <option value="1">Nashville</option>
                        <option value="2">Memphis</option>
                        <option value="3">Knoxville</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Start Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={employee.startDate}
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.startDate = evt.target.value
                                updateEmp(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Pay Rate:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={employee.payRate}
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.payRate = evt.target.value
                                updateEmp(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Employee
            </button>
        </form>
    )
}








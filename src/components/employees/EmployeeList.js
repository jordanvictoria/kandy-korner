import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"





export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()


   






 

useEffect(
    () => {
        fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
        .then(response => response.json())
        .then((employeesArr) => {
            setEmployees(employeesArr)
        })
    },
    [] // When this array is empty, you are observing initial component state
)






return <> {
            <>
            <button onClick={() => navigate("/employee/create")}>Add Employee</button>
            </>
           
}

<h2>List of Employees</h2>

<article className="employees">
    {
        employees.map(
            (employee) => {
                return <section className="employee">
                    <header>{employee.user.fullName}</header>
                    <footer>
                        <div>Location: {employee.location.name}</div>
                        <div>Start Date: {employee.startDate}</div>
                        <div>Pay Rate: {employee.payRate}</div>
                    </footer>    
                </section>
            }
        )
    }
</article>

</>

}
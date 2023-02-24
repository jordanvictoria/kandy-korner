import { Link } from "react-router-dom"

export const Customer = ({ id, fullName, email, numofCandies }) => {
    return <section className="customer">
                        <Link to={`/customers/${id}`}>Name: {fullName}</Link>
                    <div>Email: {email}</div>
                    <div>Candies bought: {numofCandies}</div>
                </section>
}
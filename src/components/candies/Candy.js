import { Link } from "react-router-dom"

export const CandyLocation = ({ id }) => {
    return <section className="candyLocation">
                    <div>
                        <Link to={`/locations/${id}`}> Show Me Where</Link>
                    </div>
                </section>
}
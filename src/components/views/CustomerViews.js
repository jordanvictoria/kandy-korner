import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList"
import { CandyContainer } from "../candies/CandyContainer"
import { CandyLocationDetails } from "../candies/CandyLocationDetails"



export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <h2>Get your yum yum on</h2>
                    

                    <Outlet />
                </>
            }>

            <Route path="locations" element={ <LocationList /> } />
            <Route path="candySearch" element={ <CandyContainer /> } />
            <Route path="locations/:locationId" element={ <CandyLocationDetails/> } />
            </Route>
        </Routes>
    )
}
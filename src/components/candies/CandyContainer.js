import { useState } from "react"
import { CandyList } from "./CandyList"
import { CandySearch } from "./CandySearch"

export const CandyContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    return <>
        <CandySearch setterFunction={setSearchTerms} />
        <CandyList searchTermState={searchTerms} />
    </>
}
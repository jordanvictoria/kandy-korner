export const CandySearch = ({ setterFunction }) => {
    return (
        <div>
        <label>What candy are you looking for?</label>
        <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        
        type="text" placeholder="Enter search terms" />
        </div>
    )
}
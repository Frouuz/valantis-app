

const FilterSelect = ({filterOptions, onChangeOptions, filterSelect}) => {
    
    return (
        <select className="filter-select" onChange={onChangeOptions} ref={filterSelect} name="filter-select">
            {filterOptions.map((option, key) => 
                <option value={option} key={key}>

                    {
                        option === "product" ? "По названию" :
                        option === "price" ? "По цене" :
                        option === "brand" ? "По бренду" :
                        option
                        
                    }

                </option>
            )}
        </select>
    )
    
} 


export default FilterSelect;
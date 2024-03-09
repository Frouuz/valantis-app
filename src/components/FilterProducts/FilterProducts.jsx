import { useEffect, useRef, useState } from "react"

import FilterSelect from "./widgets/Select/filterSelect"
import { API } from "../../utils/API/Api"

import "./FilterProducts.css"


const api = new API


const FilterProducts = ({filterIsActive, setFilterIsActive, 
    setCurrentPage, setFilterMethod, setFilterValue,
    setPaginationElements}) => {
    
    const [productFilterValue, setProductFilterValue] = useState("");

    const [filterOptions, setFilterOptions] = useState([]);


    const filterInput = useRef(null)
    const filterSubmitButton = useRef(null)
    const filterResetButton = useRef(null)
    const filterSelect = useRef(null)
    
    useEffect(()=> {

        async function fetchProductsFields() {
            try{

                const productsFields = await api.getProductsFields()
                
                if (productsFields) {
                    console.log(1)
                    setFilterOptions(productsFields.result)
                }



            } catch (err){
                console.log(err)
                if (err.message === "500") {
                    console.log("retry request...")
                    fetchProductsFields()
                }
            }
        }

        fetchProductsFields()

    }, [])


    function onChangeFilterValue() {
        setProductFilterValue(filterInput.current.value)
    }

    function onChangeOptions() {
        switch (filterSelect.current.value) {
            case "price":
                filterInput.type = "number"
                break;

            default:
                filterInput.type = "text"
                break;
        }
    }

    function handleFilter(event) {

        event.preventDefault()

        if (productFilterValue){

            setFilterIsActive(true)
            setFilterMethod(filterSelect.current.value)

            //Если значение в фильтре полностью является числом, то использую parseInt, что-бы передать как тип "Число"
            if (filterSelect.current.value === "price") {
                if (!isNaN(productFilterValue)) {
                    setFilterValue(parseInt(productFilterValue))
                } else {
                    setFilterValue(productFilterValue)
                }
            } else {
                setFilterValue(productFilterValue)
            }

        } else { 

            setFilterIsActive(false)
            setFilterMethod(null)
            setFilterValue(null)

        }

        setCurrentPage(1)
    }

    function resetFilter(event){

        event.preventDefault()

        if (filterIsActive) {
            setFilterIsActive(false)
            setFilterMethod(null)
            setFilterValue(null)
            
            setPaginationElements(0)
            setCurrentPage(1)

            filterInput.current.value = ""
            filterSelect.current.value = filterOptions[0]
        }
        
    }

    
    return(
        <form>
            <div className="filter-container">   
                    <div className="filter-input-items">
                        <FilterSelect
                            filterOptions={filterOptions} 
                            onChangeOptions={onChangeOptions} 
                            filterSelect={filterSelect}
                         />
                        <input ref={filterInput} onChange={onChangeFilterValue} type="text" placeholder="Что будем искать?"/>
                    </div>
                
                    <div className="filter-buttons-items">
                        <button ref={filterSubmitButton} onClick={handleFilter} className="filter-btn-submit">Поиск</button>
                        <button ref={filterResetButton} onClick={resetFilter}  className="filter-btn-reset">Сбросить фильтры</button>
                    </div>
            </div>
        </form>
        
    )
}


export default FilterProducts;



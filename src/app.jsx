import { useEffect, useState } from "react";

import ProductsList   from "./components/ProductsList/ProductsList";
import Pagination     from "./components/Pagination/Pagination";
import FilterProducts from "./components/FilterProducts/FilterProducts";
import ScreenSpinner  from "./components/ScreenSpinner/ScreenSpinner";

import getFetchHeaders  from "./utils/getHeaders";
import { API } from "./utils/API/Api"

import "./style.css"



const api = new API



const App = () => {

    // Filter
    const [filterIsActive, setFilterIsActive] = useState(false)
    const [filterMethod, setFilterMethod] = useState(null); //Как фильтровать? (Название, цена и тд...)
    const [filterValue, setFilterValue]   = useState(null); //Значение фильтра
    const [filterLastValue, setFilterLastValue] = useState(null)

    // App
    const [currentPage, setCurrentPage] = useState(1); //Активная страница у клиента
    const [isLoading, setIsLoading]     = useState(false) ;
    const [productsIds, setProductsIds] = useState([]); //Массив получаемых товаров (id)
    const [filtredProductsIds, setFiltredProductsIds] = useState([]);

    // Pagination
    const [paginationElements, setPaginationElements] = useState(0); //Количество всех элементов (товаров)
    const paginationLimit = 50 //Макс. количетсво товаров на одной стр.


    useEffect(() => {
        
        async function fetchIdsData() {

            const paginationOffset = ((currentPage * paginationLimit) - 50)

            try{

                // Узнаём сколько всего товаров в базе.
                if (paginationElements === 0) {
                    const responseAllIds = await api.getAllProductsIds()
                    const allIds = ((responseAllIds.result).length) //Количество всех товаров в базе
                    setPaginationElements(allIds)
                }
               
                // Получение id товаров на одну страницу
                const responseIds = await api.getProductsIds(paginationOffset, paginationLimit)
                const ids = responseIds.result //ID товаров на одну страницу

                if (ids) {
                    setProductsIds(ids)
                    setIsLoading(true)
                }
                
            } catch(err) {
                console.log(err)
                if (err.message === "500"){
                    console.log("retry request...")
                    fetchIdsData()
                }
            }
        }

        async function fetchIdsFilteredData() {

            const offsetPagination = ((currentPage * paginationLimit) - 50)

            try{
                // Если значение филтрации клиента не поменялось - не делем запрос, а возвращаем те же данные
                // (Сделано для пагинации, что-бы при смене страницы, не шёл запрос "filter")
                if (filterLastValue != filterValue) {
                   
                    const filtredData = await api.getFiltredData(filterMethod, filterValue)                    
                    const data = filtredData.result

                    if (data) {
    
                        setFilterLastValue(filterValue)
    
                        if (data.length > 50) {
                            setFiltredProductsIds(data)
                            setProductsIds(data.slice(offsetPagination, (currentPage * paginationLimit)))
                            setIsLoading(true)
                            setPaginationElements(data.length)
    
                        } else {
    
                            setProductsIds(data)
                            setIsLoading(true)
                            setPaginationElements(1)
                        }
    
                    }
    
                } else {

                    const data = filtredProductsIds

                    if (data.length > 50) {
                        setProductsIds(data.slice(offsetPagination, (currentPage * paginationLimit)))
                        setIsLoading(true)
                        setPaginationElements(data.length)

                    } else {
                        setProductsIds(data)
                        setIsLoading(true)
                        setPaginationElements(1)
                    }
                }
               
            } catch(err){

                console.log(err)

                if(err.message === "500") {

                    console.log("retry request...")
                    fetchIdsFilteredData()

                }
            }



        }

        if (!filterIsActive) {
            fetchIdsData()
        } else {
            fetchIdsFilteredData()
        }
        

    }, [currentPage, filterIsActive, filterValue])


    return(

        <div className="wrapper">

            {isLoading && <ScreenSpinner/>}

            <FilterProducts
            filterIsActive={filterIsActive}
            setFilterIsActive={setFilterIsActive}
            setFilterMethod={setFilterMethod}
            setFilterValue={setFilterValue}
            setCurrentPage={setCurrentPage}
            setPaginationElements={setPaginationElements}
            />
            
            <Pagination 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                paginationElements={paginationElements}
                paginationLimit={paginationLimit}
            />

            <ProductsList
            productsIds={productsIds}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            />

        </div>


    )
}

export default App;
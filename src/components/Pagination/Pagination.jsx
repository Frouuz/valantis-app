import { useEffect, useState } from "react"


import './Pagination.css'
import PaginationButton from "./widgets/Buttons/PaginationButton";


const Pagination = ({currentPage, setCurrentPage, paginationElements, paginationLimit}) => {

    const [paginationMaxPages, setPaginationMaxPages] = useState(0)

    useEffect(() => {

        if (paginationElements != 1) {

            console.log((paginationElements / paginationLimit))
            setPaginationMaxPages(Math.ceil(paginationElements / paginationLimit))

        } else {

            setPaginationMaxPages(1)

        }

    }, [paginationElements])


    function changePage(direction) {

        switch (direction) {

            case "prev":
                if (currentPage != 1) {
                    setCurrentPage( currentPage - 1)
                }
                break;

            case "next":
                if (currentPage != paginationMaxPages) {
                    setCurrentPage( currentPage + 1)
                }
                break;

            case "start":
                if (currentPage != 1) {
                    setCurrentPage(1)
                }
                break;

            case "end":
                if (currentPage != paginationMaxPages) {
                    setCurrentPage(paginationMaxPages)
                }
                break;
        }
    }

    
    return(
        <div className="pagination-container">
            <PaginationButton paginationDirection={"start"} changePage={changePage}/>
            <PaginationButton paginationDirection={"prev"}  changePage={changePage}/>
            <p>{currentPage} / {paginationMaxPages}</p>
            <PaginationButton paginationDirection={"next"}  changePage={changePage}/>
            <PaginationButton paginationDirection={"end"}   changePage={changePage}/>
        </div>
    )
}

export default Pagination;
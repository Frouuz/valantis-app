const PaginationButton = ({paginationDirection, changePage}) => {
    return(

        <button onClick={() => {changePage(paginationDirection)}} className="pagination-item">
            {paginationDirection === "start" ? "|<" :
            paginationDirection === "prev" ? "<<" :
            paginationDirection === "next" ? ">>" : 
            ">|"
             
            }
        </button>

    )
}

export default PaginationButton;
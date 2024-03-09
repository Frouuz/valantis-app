import { useEffect, useState } from 'react';

import ProductItem from './widgets/ProductItem'
import removeDuplicates from '../../utils/removeDuplicates';

import { API } from '../../utils/API/Api';

import './ProductsList.css'


const api = new API


const ProductsList = ({productsIds, isLoading, setIsLoading}) => {
   
    const [productsItems, setProductsItems] = useState([])

    useEffect(()=>{

        async function fetchProductsItems() {

            try{
                
                const getProductsItems = await api.getProductsItems(productsIds)
                const data = removeDuplicates(getProductsItems.result)

                if (data){
                    setProductsItems(data)
                    setIsLoading(false)
                }

            } catch(err) {
                console.log(err)
                if (err.message === "500") {
                    console.log("retry request")
                    fetchProductsItems()
                }
            }
        }

        if (isLoading) {
            fetchProductsItems()
        }
        
    }, [isLoading])


    return(
        <div className="products-container">
               
               {productsItems.map((item, key) => 
                    <ProductItem key={key} item={item} />)}

        </div>
    )
    
}


export default ProductsList;
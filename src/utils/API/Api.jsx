import getFetchHeaders from "../getHeaders"

const headers = getFetchHeaders()
const API_URL = "https://api.valantis.store:41000/"

export class API {


    async getProductsIds(paginationOffset, paginationLimit) {
        const responseIds = await fetch(API_URL, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                "action":"get_ids",
                "params": {"offset": paginationOffset, "limit":paginationLimit}
            })
        })
            .then(responseIds => {
                if (!responseIds.ok) {
                    throw new Error(responseIds.status)
                }
                return responseIds.json()
            })
        return responseIds
    }

    async getAllProductsIds() {
        const responseAllIds = await fetch(API_URL, {
            headers:headers,
            method: "POST",
            body: JSON.stringify({
                "action":"get_ids"
            })
        }) 
            .then(responseAllIds => {
                if (!responseAllIds.ok) {
                    throw new Error(responseAllIds.status)
                }
                return responseAllIds.json()
            })
    
        return responseAllIds
    }


    async getProductsItems(productsIds) {
        
        const responseProudcItems = await fetch(API_URL, {
            headers:headers,
            method:"POST",
            body: JSON.stringify({
                "action":"get_items",
                "params":{"ids":productsIds}
            })
        })

        .then(responseProudcItems=>{
            if (!responseProudcItems.ok) {
                throw new Error(responseProudcItems.status)
            }

            return responseProudcItems.json()
        })
    
        return responseProudcItems
    }


    async getFiltredData(filterMethod, filterValue) {


        const params = {[filterMethod]:filterValue}
        const filtredData = await fetch(API_URL, {
            headers:headers,
            method:"POST",
            body: JSON.stringify({
                "action":"filter",
                "params":params
            })
        })

        .then(filtredData => {
            if(!filtredData.ok) {
                throw new Error(filtredData.status)
            }

            return filtredData.json()
        })

        return filtredData
    }


    async getProductsFields() {
        
        const responseProductsFields = await fetch(API_URL, {
            headers:headers,
            method: "POST",
            body: JSON.stringify({
                "action":"get_fields"
            })
        })
        .then(responseProductsFields => {
            if (!responseProductsFields.ok) {
                throw new Error(responseProductsFields.status)
            }

            return responseProductsFields.json()
        })

        return responseProductsFields
    }
}



function removeDuplicates(array) {

    const products = []
    const productsUnique = []


    array.forEach((item) => {
        if (products.includes(item.id)) {
            return
        } else {
            products.push(item.id)
            productsUnique.push(item)
        }
    })

    return Array.from(productsUnique)
}

export default removeDuplicates;
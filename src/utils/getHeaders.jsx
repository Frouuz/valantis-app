import md5 from "md5";


function getFetchHeaders() {
    const currentDate = new Date()
    const month         = ("0" + (currentDate.getMonth() + 1)).slice(-2); 
    const day           = ("0" + currentDate.getDate()).slice(-2);          
    const year          = currentDate.getFullYear()

    const apiHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json;charset=utf-8",
        "X-Auth": md5(`Valantis_${year}${month}${day}`)
    }

    return apiHeaders
}

export default getFetchHeaders;
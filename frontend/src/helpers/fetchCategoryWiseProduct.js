import summaryApi from "../common"


const fetchCategoryWiseProduct = async( category)=>{
    const response = await fetch(summaryApi.CategoryWiseProduct.url,{
        method : summaryApi.CategoryWiseProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })

    const dataResponse = await response.json()
    

    return dataResponse
}

export default fetchCategoryWiseProduct

const backendDomin = "http://localhost:4000"

const summaryApi={
    SignUP:{
        url:`${backendDomin}/api/signup`,
        method:'POST'
    },
    SignIN:{
        url:`${backendDomin}/api/login`,
        method:'POST'
    },
    userDetails:{
        url:`${backendDomin}/api/user-details`,
        method:'GET'
    },
    logout:{
        url:`${backendDomin}/api/logout`,
        method:'POST'
    },
    allUsers:{
        url:`${backendDomin}/api/all-users`,
        method:'GET'
    },
    updateUser:{
        url:`${backendDomin}/api/update-user`,
        method:'POST'
    },
    uploadProduct:{
        url:`${backendDomin}/api/upload-product`,
        method:'POST'
    },
    allProducts:{
        url:`${backendDomin}/api/all-products`,
        method:'GET'
    },
    updateProduct:{
        url:`${backendDomin}/api/update-product`,
        method:'POST'

    },
    CategoryProduct:{
        url:`${backendDomin}/api/get-category-product`,
        method:'GET'
    }

}


export default summaryApi
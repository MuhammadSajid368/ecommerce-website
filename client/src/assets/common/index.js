const backendApi = "http://localhost:8000"
const SummaryApi = {
    signup:{
        url:`${backendApi}/api/signup`,
        method:"post"
    },
    signin:{
        url:`${backendApi}/api/signin`,
        method:"post"
    },
    currenUser:{
        url:`${backendApi}/api/user-details`,
        method:"get"
    },
    logout_user:{
        url:`${backendApi}/api/userLogout`,
        method:'get'
    }
}

export default SummaryApi;
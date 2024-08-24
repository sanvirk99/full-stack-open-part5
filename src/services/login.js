import axios from "axios"
const baseUrl = "/api/login"

//credentials json object
const login = async (credentials) => {

    console.log('request made')
    const res = await axios.post(baseUrl,credentials)

    console.log(res, "inside login")

    return res.data
}


export default {login}
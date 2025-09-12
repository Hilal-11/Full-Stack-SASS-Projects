import { ApiResponse } from '../utils/api-response'
const healthcheck = async (req , res) => {
    try{
        res.status(200).json(
            new ApiResponse(200 , {message: "Server is running"})
        )
    }catch(error) {
        console.log(error.message)
    }
}

export default healthcheck
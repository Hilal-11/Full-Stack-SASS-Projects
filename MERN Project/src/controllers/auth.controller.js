import { asyncHandler } from '../utils/async-handler'

const registerUser = asyncHandler(async (req , res) => {
    const {email , username, password , role } = req.body;

    // Validations

})
const login = asyncHandler(async (req , res) => {})
const varifyEmail = asyncHandler(async (req , res) => {})

export { registerUser , login , varifyEmail }
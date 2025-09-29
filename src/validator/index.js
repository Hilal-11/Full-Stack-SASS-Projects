import { body } from "express-validator"

const userRegistrationValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage("Email is requuired")
            .isEmail().withMessage("Email is invalid"),
        body('username')
            .trim()
            .notEmpty().withMessage("Username is required")
            .isLength({ min: 3}).withMessage("Username requires minimum 3 charters")
            .isLength({ max: 13}).withMessage("Username can not exceed 13 charters"),
        body('password')
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 6}).withMessage("Password requires minimum 6 charters")
            .isLength({ max: 20}).withMessage("Password can not exceed 20 charters"),
        ,
        body('role')
            .trim()
            .notEmpty().withMessage("role is requuired")
    ]
}
const userLoginValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid"),
        body('password')
            .trim()
            .notEmpty().withMessage("Password is required")
    ]
}

const forgetPasswordValidator= () => {
    return [

    ]
}

const resetPasswordValidator = () => {
    return [

    ]
}

export { 
    userRegistrationValidator,
    userLoginValidator,
    forgetPasswordValidator,
    resetPasswordValidator
}
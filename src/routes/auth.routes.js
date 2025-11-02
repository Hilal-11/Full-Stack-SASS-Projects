import express from 'express'
const router = express.Router();
import { login, logout, registerUser , varifyEmail, resendVarifyEmail, forgetPasswordRequest, resetPassword, changeCurrentPassword, getCurrentUser } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validator.middleware.js';
import { userLoginValidator, userRegistrationValidator, forgetPasswordValidator , userChangeCurrentPasswordValidator , resetPasswordValidator } from '../validator/index.js';



router.route("/register").post(userRegistrationValidator(), validate , registerUser);   // factory pattern
router.route("/login").post(userLoginValidator() , validate , login) // factory pattern
router.route("/logout").post(logout)
router.route("/varify-email").get(varifyEmail)
router.route("/resend-verify-email").get(resendVarifyEmail)
router.route("/forget-password-request").get(forgetPasswordValidator(), validate ,forgetPasswordRequest)
router.route("/reset-password").post(resetPasswordValidator() , validate , resetPassword)
router.route("/change-current-password").post(userChangeCurrentPasswordValidator(), validate, changeCurrentPassword)
router.route("/user-profile").get(getCurrentUser)


export default router; 
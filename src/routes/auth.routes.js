import express from 'express'
const router = express.Router();
import { login, logout, registerUser } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validator.middleware.js';
import { userLoginValidator, userRegistrationValidator } from '../validator/index.js';

router.route("/register").post(userRegistrationValidator(), validate , registerUser);   // factory pattern
router.route("/login").post(userLoginValidator() , validate , login)
router.post("logout", logout)

export default router;
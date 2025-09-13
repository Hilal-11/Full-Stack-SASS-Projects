import express from 'express'
const router = express.Router();
import { registerUser } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validator.middleware.js';
import { userRegistrationValidator } from '../validator/index.js';

router.route("/register").
post(userRegistrationValidator(), validate , registerUser);   // factory pattern

export default router;
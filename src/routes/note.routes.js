import express from 'express'
const router = express.Router();
import { UserRolesEnum } from '../utils/constants'


router.route("/:projectId")

    .get(
        validatePermissions([UserRolesEnum.ADMIN , UserRolesEnum.MEMBER]), getNotes)
    .post(
        validatePermissions([UserRolesEnum.ADMIN, UserRolesEnum.MEMBER]), createNote)


//  ---Middleware--- validation for who can access --- Permissions ---
export default router;
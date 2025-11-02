import express from 'express'
const router = express.Router();
import { UserRolesEnum } from '../utils/constants'
import { getNote , getNoteById, createNote, updateNote, deleteNote } from '../controllers/note.controller';
import { validateProjectPermission } from '../middlewares/auth.middleware';


router.route("/:projectId")
    .get(validatePermissions([UserRolesEnum.ADMIN , UserRolesEnum.MEMBER]), getNote)
    .get(validateProjectPermission([UserRolesEnum.ADMIN , UserRolesEnum.MEMBER]), getNoteById)
    .post(validatePermissions([UserRolesEnum.ADMIN, UserRolesEnum.MEMBER]), createNote)
    .post(validateProjectPermission([UserRolesEnum.ADMIN , UserRolesEnum.MEMBER]), updateNote)
    .get(validateProjectPermission([UserRolesEnum.ADMIN , UserRolesEnum.MEMBER]), deleteNote)


//  ---Middleware--- validation for who can access --- Permissions ---
export default router;
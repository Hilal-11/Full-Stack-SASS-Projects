import express from 'express'
const router = express.Router();
import { UserRolesEnum , AvaliableUserRoles } from '../utils/constants'
import { getNote , getNoteById, createNote, updateNote, deleteNote } from '../controllers/note.controller';
import { validateProjectPermission } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validator.middleware';
import { createNoteValidator, updateNoteValidator , deleteNoteValidator } from '../validator';

router.route("/:projectId")
    .get(validatePermissions([UserRolesEnum.ADMIN , UserRolesEnum.MEMBER]), getNote)
    .post(createNoteValidator(), validate , validatePermissions([UserRolesEnum.ADMIN, UserRolesEnum.MEMBER]), createNote)

router.route("/:projectId/n/:noteId")
    .get(validateProjectPermission([UserRolesEnum.ADMIN , UserRolesEnum.MEMBER]), getNoteById)
    .put(updateNoteValidator(), validate , validateProjectPermission([UserRolesEnum.ADMIN , UserRolesEnum.MEMBER]), updateNote)
    .delete(deleteNoteValidator(), validate , validateProjectPermission([UserRolesEnum.ADMIN , UserRolesEnum.MEMBER]), deleteNote)

//  ---Middleware--- validation for who can access --- Permissions ---
export default router;
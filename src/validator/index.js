import { body, param } from "express-validator"

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
        body("username")
             .optional(),
        body('password')
            .trim()
            .notEmpty().withMessage("Password is required")
    ]
}
const userChangeCurrentPasswordValidator = () => {
    return [
        body("oldPassword")
            .trim(),
            notEmpty().withMessage("Old password is required"),
        body("newPassword")
            .trim()
            .notEmpty().withMessage("New password is required"),
    ]
}
const forgetPasswordValidator = () => {
    return [
        body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
    ]
}

const resetPasswordValidator = () => {
    return [
        body("newPassword")
            .notEmpty().withMessage("Password is required")
    ]
}

const userAssignRoleValidator = () => {
  return [
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};


const createNoteValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .notEmpty()
            .withMessage("Project ID is required")
        ,
        body("content")
            .notEmpty()
            .withMessage("Content is required")
    ]
}

const updateNoteValidator = () => {
    return [
        param("noteId")
            .notEmpty()
            .isMongoId()
            .withMessage("Note ID is required")

        ,
        body("content")
            .notEmpty()
            .withMessage("Content is required")
    ]
}

const deleteNoteValidator = () => {
    return [
        param("noteId")
            .isMongoId()
            .notEmpty()
            .withMessage("Note ID is required")
    ]
}


export { 
    userRegistrationValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
    userAssignRoleValidator,
    forgetPasswordValidator,
    resetPasswordValidator,
    createNoteValidator,
    updateNoteValidator,
    deleteNoteValidator
}
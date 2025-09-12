export const UserRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "",
    MEMBER: "",
}

export const AvaliableUserRoles = Object.values(UserRolesEnum) // provide an array or list roles....better for frontend developers

export const TaskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    DONE: "done",
}
export const AvaliableTasks = Object.values(TaskStatusEnum) // provide an array or list roles....better for frontend developers
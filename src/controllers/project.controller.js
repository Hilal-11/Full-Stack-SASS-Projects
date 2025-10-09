
import { errorMonitor } from "nodemailer/lib/xoauth2";
import Project from "../models/project.models"
import ApiError from "../utils/api-erro"

export const getProjects = asyncHandler(async(req , res) => {
    try{
        const getAllProjects = await Project.find({ });
        if(!getAllProjects) {
            throw new ApiError(
                400,
                `No Existing projects yet, please create projects first`
            )
        }
        return res.status(200).json(
            ApiError(
                200,
                `All projects get successfully`,
                {response: getAllProjects},
            )
        )
    }catch(error) {
        return res.status(500).json(
            new ApiError(
                500,
                "Failed to get the projects, internal server error"
            )
        )
    }
})

export const getProjectsByID = asyncHandler(async(req , res) => {
    const {userId} = req.params;
    if(!userId) {
        throw new ApiError(
            401,
            `User id is missing, can't get the project`
        )
    }
    try{
        const user = await Project.findById(userId);
        if(!user) {
            throw new ApiError(
                401,
                `Failed to get the project, user can't exist`
            )
        }
        return res.status(200).json(
            new ApiError(
                200,
                `Project get successfully`,
                { response: user}
            )
        )
    }catch(error) {
        return res.status(500).json(
            new ApiError(
                500,
                `Failed to get the projects by ${userId}, some internal server error`
            )
        )
    }
})

export const createProject = asyncHandler(async(req , res) => {

    try{

    }catch(error) {
        
    }
})

export const updateProject = asyncHandler(async(req , res) => {})

export const deleteProject = asyncHandler(async(req , res) => {})

export const addMemberToProject = asyncHandler(async(req , res) => {})

export const getProjectMembers = asyncHandler(async(req , res) => {})

export const updateProjectMembers = asyncHandler(async(req , res) => {})

export const updateMemberRole = asyncHandler(async(req , res) => {})

export const deleteMember = asyncHandler(async(req , res) => {})


import { errorMonitor } from "nodemailer/lib/xoauth2";
import Project from "../models/project.models"
import ApiError from "../utils/api-erro"
import { ApiResponse } from "../utils/api-response";

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
            ApiResponse(
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
            new ApiResponse(
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
    const { projectname, projectId, projectDiscription , createdBy} = req.body;
    // validation using middleware in utils ------> express validator
    try{

        const createProject = await Project.create({
            projectname,
            projectId,
            projectDiscription,
            createdBy
        })

        await createProject.save();

        return res.status(200).json(
            new ApiResponse (
                201,
                `Project craeted successfully`,
                {response: createProject}
            )
        )

    }catch(error) {
        return res.status().json(
            new ApiError(
                500,
                `Failed to create a project ${error.message}`
            )
        )
    }
})

export const updateProject = asyncHandler(async(req , res) => {})

export const deleteProject = asyncHandler(async(req , res) => {
    const { projectId } = req.body;
    try{
        const project = await Project.findByIdAndDelete(projectId)
        if(!project) {
            throw new ApiError(
                401,
                `Can't find the project, by ${projectId}`
            )
        } 

        return res.status(200).json(
            new ApiResponse (
                200,
                `${projectId} Project delete successfuly`
                
            )
        )
    }catch(error) {
        return res.status(500).json(
            new ApiError(
                500,
                `Can't delete project, some internal server error, ${error.message}`
            )
        )
    }
})

export const addMemberToProject = asyncHandler(async(req , res) => {})

export const getProjectMembers = asyncHandler(async(req , res) => {})

export const updateProjectMembers = asyncHandler(async(req , res) => {})

export const updateMemberRole = asyncHandler(async(req , res) => {})

export const deleteMember = asyncHandler(async(req , res) => {})

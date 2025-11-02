
import Note from '../models/note.models.js'
import ApiError from "../utils/api-erro"
import { asyncHandler } from '../utils/async-handler.js'
import { ApiResponse } from "../utils/api-response";
import Note from '../models/note.models.js'
import Project from '../models/project.models.js'
import mongoose from 'mongoose';
const getNote = asyncHandler(async (req , res) => {
    // get all notes
    const { projectId } = req.params
    try{
        const project = await Project.findById(projectId)
        if(!project) {
            throw new ApiError(401, "Project does't exists")
        }

        // get notes
        const notes = await Note.find({
            project: new mongoose.Types.ObjectId(projectId)
        }).populate("createdBy", "username fullname avatar email")

        return res.status(200).json(new ApiResponse(200 , notes ,"Notes fetched successfully"))
    }catch(error) {
        throw new ApiError(501, "Failed to get the project")
    }
})

const getNoteById = asyncHandler(async (req , res) => {
    // get note by id
    // const { projectId } = req.params;
    const { noteId } = req.params
    try{
        const note = await Project.findById(noteId)
            .populate("createdBy", "username fullname avatar email");
        if(!note) {
            throw new ApiError(401, "Project does't exists")
        }
 
        return res.status(200).json(new ApiResponse(200 , note ,"Note fetched successfully"))
    }catch(error) {
        throw new ApiError(501, "Failed to get the project")
    }
 
})

const createNote = asyncHandler(async (req , res) => {
    // create note
    const { projectId } = req.params;
    const { content } = req.body;
    try{

        const project = await Project.findById(projectId)
        if(!project) {
            throw new ApiError(401, "Project not found")
        }

        const newNote = await Note.create({
            project: new mongoose.Types.ObjectId(projectId),
            content,
            createdBy: new mongoose.Types.ObjectId(req.user._id)
        })

        const populatedNote = await Note.findById(newNote._id).populate(
            "createdBy",
            "username avatar email",
        )

        return res.status(200).json(new ApiResponse(200 , populatedNote ,"Note Created successfully"))

    }catch(error) {
        throw new ApiError(501, "Failed to create the Note")

    }
})

const updateNote = asyncHandler(async (req , res) => {
    // update note 
    const { noteId } = req.params;
    const { content } = req.body;
    try{
        const note = await Project.findById(noteId)
        if(!note) {
            throw new ApiError(401, "Project not found")
        }

        const updateNote = await Note.create({
            content,
            createdBy: new mongoose.Types.ObjectId(req.user._id)
        })

    }catch(error) {
        throw new ApiError(501, "Failed to update the Note")
    }
})

const deleteNote = asyncHandler(async (req , res) => {
    const { projectId } = req.params;
    const { noteId } = req.body;
    try{
        const note = await Project.findByIdAndDelete(noteId)
        if(!note) {
            throw new ApiError(401, "Project not found")
        }
 
        return res.status(200).json(new ApiResponse(200 ,"Note deleted successfully"))
    }catch(error) {
        return new ApiError(501, "failed to delete the Note")
    }
})
export {
    getNote ,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
}
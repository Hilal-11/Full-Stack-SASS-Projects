
import Note from '../models/note.models.js'
import ApiError from "../utils/api-erro"
import { asyncHandler } from '../utils/async-handler.js'
import { ApiResponse } from "../utils/api-response";
import Note from '../models/note.models.js'

const getNote = asyncHandler(async (req , res) => {
    try{
        const get_notes = await Note.find();
        
    }catch(error) {

    }
})

const getNoteById = asyncHandler(async (req , res) => {

})

const createNote = asyncHandler(async (req , res) => {
    
})

const updateNote = asyncHandler(async (req , res) => {
    
})

const deleteNote = asyncHandler(async (req , res) => {
    
})
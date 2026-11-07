const express = require('express');
const {createNote, getNotes, getNoteById , updateNoteById , deleteNoteById} = require('../Controllers/noteController');
const  validateId  = require('../Middleware/validateId');
const router = express.Router();

router.post('/', createNote);
router.get('/' , getNotes);
router.get('/:id', validateId, getNoteById);
router.put('/:id', validateId, updateNoteById);
router.delete('/:id', validateId, deleteNoteById);


module.exports= router;
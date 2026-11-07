const Note = require('../Models/note');

const createNote = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const note = await Note.create({ title, content });
        res.status(201).json(note);
    }
    catch (err) {
        next(err);
    }
};

const getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        next(err);
    }
};

const getNoteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json(note)
    }
    catch (err) {
        next(err);
    }
};

const updateNoteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
       
        const updatedNote = await Note.findByIdAndUpdate(id,
            { title: title, content: content },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.send(updatedNote)
    }
    catch (err) {
        next(err);
    }
};


const deleteNoteById = async (req, res,next) => {
    try {
        const { id } = req.params;
        

        const deletedNote = await Note.findByIdAndDelete(id)
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
       res.json({ message: "Note deleted" });

    }
    catch (err) {
        next(err);
    }
};

module.exports = { createNote, getNotes, getNoteById, updateNoteById , deleteNoteById};